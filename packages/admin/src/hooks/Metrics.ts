import { useQuery } from 'react-query'
import { fetchCampaignMetrics } from 'services/RedeemApi'

export default function useCampaignMetrics(campaignId: string) {
  const {
    data: campaignMetrics,
    isLoading,
    isError,
  } = useQuery(
    [campaignId, 'campaignMetrics'],
    () => fetchCampaignMetrics(campaignId),
    { refetchOnWindowFocus: false }
  )

  return {
    campaignMetrics,
    isLoadingCampaignMetrics: isLoading,
    isError,
  }
}
