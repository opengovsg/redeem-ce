import {
  useCampaignGetTwilioCredentials,
  useCampaignSmsUsageQuery,
} from 'hooks/Campaign'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import { getUserRoleForResource, hasAdminRole } from 'helpers/permissions'
import { useAuthenticationState } from 'data/Authentication'

const useTwilio = () => {
  const { campaignId, isCustomTwilioCredentialsEnabled } = useCampaignContext()
  const { smsUsed, isFetchingCampaignSmsUsage } =
    useCampaignSmsUsageQuery(campaignId)
  const { twilioCredentials } = useCampaignGetTwilioCredentials({
    campaignId,
    enabled: isCustomTwilioCredentialsEnabled,
  })
  const { permissions } = useAuthenticationState()

  // 2400 is based on 80% of 3000 of the free usage. Upon usage of 80% of sms usage, we should show the info box to the user to notify them
  const isSmsUsageAtLeast80Percent = smsUsed >= 2400

  const userRoles = getUserRoleForResource({ permissions, campaignId })
  const hasAdminRoleForCampaign = hasAdminRole(userRoles)

  const showShouldSmsInfoBox =
    hasAdminRoleForCampaign &&
    !isCustomTwilioCredentialsEnabled &&
    isSmsUsageAtLeast80Percent

  return {
    isFetchingCampaignSmsUsage,
    showShouldSmsInfoBox,
    smsUsed,
    isCustomTwilioCredentialsEnabled,
    isSmsUsageAtLeast80Percent,
    twilioCredentials,
  }
}

export default useTwilio
