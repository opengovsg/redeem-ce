import { useCampaignQuery, useCampaignStatsQuery } from 'hooks/Campaign'
import React, { useContext, createContext } from 'react'
import { useParams } from 'react-router-dom'
import {
  Campaign,
  CampaignEligibility,
  CampaignVisibility,
  VoucherValue,
} from 'services/RedeemApi/types'
import { CAMPAIGN_ELIGIBILITY } from '../constants'

const CampaignContext = createContext<
  | {
      campaign: Campaign | undefined
      campaignAdvisoryUrl: string
      campaignDefaultVouchers: VoucherValue[] | null
      campaignDescription: string
      campaignEligibility: CampaignEligibility
      campaignExpiresAt: string
      campaignId: string
      campaignLogoUrl: string
      campaignMerchantListUrl: string
      campaignMetadata: Record<any, any>
      campaignName: string
      campaignOrganiserEmail: string
      campaignOrganiserFeedbackUrl: string
      campaignOrganiserLocation: string
      campaignOrganiserName: string
      campaignTncUrl: string
      campaignValidityEnd: string
      campaignVisibility: CampaignVisibility
      extraQrPrefix: string | null
      hasWhitelist: boolean
      isBulkCreateCampaign: boolean
      isCustomTwilioCredentialsEnabled: boolean
      totalNumberOfMerchants: number
      totalGroupedVouchersCount: number
    }
  | undefined
>(undefined)

type CampaignProviderProps = { children: React.ReactNode }

function CampaignProvider({ children }: CampaignProviderProps) {
  const { campaignId } = useParams<{ campaignId: string }>()
  const { campaign } = useCampaignQuery(campaignId)
  const { campaignStats } = useCampaignStatsQuery(campaignId)

  const campaignName = campaign?.name || '' // This is a weird typing from lodash
  const campaignMetadata = campaign?.metadata || ({} as Record<any, any>)
  // Default in backend is signup_conditions_address
  const campaignEligibility =
    campaign?.eligibility || CampaignEligibility.signup_conditions_address
  const isBulkCreateCampaign =
    campaignEligibility === CAMPAIGN_ELIGIBILITY.NO_SIGNUP
  const hasWhitelist =
    campaignEligibility === CAMPAIGN_ELIGIBILITY.SIGNUP_WHITELIST
  const campaignVisibility = campaign?.visibility || 'private' // this is the default even from our backend
  const campaignAdvisoryUrl = campaign?.advisoryUrl || ''
  const campaignOrganiserFeedbackUrl = campaign?.organiserFeedbackUrl || ''
  const campaignDefaultVouchers = campaign?.defaultVouchers || null
  const campaignDescription = campaign?.description || ''
  const campaignOrganiserName = campaign?.organiserName || ''
  const campaignOrganiserEmail = campaign?.organiserEmail || ''
  const campaignLogoUrl = campaign?.logoUrl || ''
  const campaignMerchantListUrl = campaign?.merchantListUrl || ''
  const campaignOrganiserLocation = campaign?.organiserLocation || ''
  const campaignValidityEnd = campaign?.validityEnd || ''
  // Renaming it to keep it consistent with the legacy codebase
  const campaignExpiresAt = campaignValidityEnd
  const isCustomTwilioCredentialsEnabled =
    campaign?.customCredentialsEnabled || false // default to false always
  const totalNumberOfMerchants = campaignStats?.totalNumberOfMerchantsCount || 0
  const totalGroupedVouchersCount =
    campaignStats?.totalGroupedVouchersCount || 0
  const extraQrPrefix = campaign?.extraQrPrefix || null
  const campaignTncUrl = campaign?.tncUrl || ''

  const value = {
    campaign,
    campaignAdvisoryUrl,
    campaignDefaultVouchers,
    campaignDescription,
    campaignEligibility,
    campaignExpiresAt,
    campaignId,
    campaignLogoUrl,
    campaignMerchantListUrl,
    campaignMetadata,
    campaignName,
    campaignOrganiserEmail,
    campaignOrganiserFeedbackUrl,
    campaignOrganiserLocation,
    campaignOrganiserName,
    campaignTncUrl,
    campaignValidityEnd,
    campaignVisibility,
    extraQrPrefix,
    hasWhitelist,
    isBulkCreateCampaign,
    isCustomTwilioCredentialsEnabled,
    totalNumberOfMerchants,
    totalGroupedVouchersCount,
  }

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  )
}

function useCampaignContext() {
  const context = useContext(CampaignContext)
  if (context === undefined) {
    throw new Error('useCampaignContext must be used inside a CampaignProvider')
  }
  return context
}

export { useCampaignContext, CampaignProvider }
