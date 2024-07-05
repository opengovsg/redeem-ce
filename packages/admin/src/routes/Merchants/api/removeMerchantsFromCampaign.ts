import ApiService, {
  getAuthorizationHeader,
} from 'services/RedeemApi/baseConfig'
import {
  RemoveMerchantsFromCampaignRequest,
  RemoveMerchantsFromCampaignResponse,
} from '../types'

export const removeMerchantsFromCampaign = async (
  params: RemoveMerchantsFromCampaignRequest
): Promise<RemoveMerchantsFromCampaignResponse> => {
  const headers = getAuthorizationHeader()
  return ApiService({
    // Method ApiService.delete does not allow request body
    method: 'DELETE',
    url: `/campaigns/${params.campaignId}/merchants`,
    headers,
    data: {
      merchant_ids: params.merchantIds,
    },
  }).then((response) => response.data)
}
