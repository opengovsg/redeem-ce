import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  fetchCampaignById,
  fetchCampaignSmsUsage,
  fetchCampaignStatsByCampaignId,
  addTwilioCredentials,
  getTwilioCredentials,
} from 'services/RedeemApi'
import { FETCH_ONLY_IF_CACHE_DATA_IS_MISSING_CONFIG } from 'helpers/query'
import { TwilioCredentials } from 'routes/Campaigns/Campaign/components/SettingsTab/components/Settings/machine/TwilioCredentialsModalMachine'
import { useToast } from 'data/Toasts'
// Refer to useQuery here
// https://react-query.tanstack.com/docs/guides/queries#displaying-background-fetching-loading-states

export function useCampaignQuery(campaignId: string) {
  const { data: response } = useQuery(
    campaignId,
    () => fetchCampaignById(campaignId),
    FETCH_ONLY_IF_CACHE_DATA_IS_MISSING_CONFIG
  )

  return {
    campaign: response,
  }
}

export function useCampaignStatsQuery(campaignId: string) {
  const {
    data: response,
    refetch,
    status,
    isFetching,
  } = useQuery(
    [campaignId, 'stats'],
    () => fetchCampaignStatsByCampaignId(campaignId),
    FETCH_ONLY_IF_CACHE_DATA_IS_MISSING_CONFIG
  )

  return {
    campaignStats: response,
    fetchCampaignStatsByCampaignId: refetch,
    fetchCampaignStatsByCampaignIdStatus: status,
    isFetchingCampaignStatsByCampaignId: isFetching,
  }
}

export function useCampaignSmsUsageQuery(campaignId: string) {
  const { data: response, isFetching } = useQuery(
    [campaignId, 'smsUsage'],
    () => fetchCampaignSmsUsage(campaignId),
    FETCH_ONLY_IF_CACHE_DATA_IS_MISSING_CONFIG
  )

  return {
    smsUsed: response?.smsUsage ?? 0,
    isFetchingCampaignSmsUsage: isFetching,
  }
}

export function useCampaignAddTwilioCredentials(campaignId: string) {
  const { toastError, toastSuccessWithoutTitle } = useToast()
  const queryCache = useQueryClient()
  const { mutateAsync } = useMutation(
    (credentials: TwilioCredentials) =>
      addTwilioCredentials({ campaignId, credentials }),
    {
      onError: (err: unknown) => toastError(err),
      // Refetch our campaign object since we dont fetch the credentials directly.
      onSuccess: () => {
        queryCache.invalidateQueries(campaignId)
        toastSuccessWithoutTitle({
          primaryText: 'Success! ',
          secondaryText: 'Changes have been saved',
        })
      },
    }
  )

  return {
    addTwilioCredentialsToCampaign: mutateAsync,
  }
}

export function useCampaignGetTwilioCredentials({
  campaignId,
  enabled,
}: {
  campaignId: string
  enabled: boolean
}) {
  const { data: response } = useQuery(
    [campaignId, 'getTwilioCredentials'],
    () => getTwilioCredentials(campaignId),
    {
      ...FETCH_ONLY_IF_CACHE_DATA_IS_MISSING_CONFIG,
      enabled,
    }
  )

  return {
    twilioCredentials: response,
  }
}
