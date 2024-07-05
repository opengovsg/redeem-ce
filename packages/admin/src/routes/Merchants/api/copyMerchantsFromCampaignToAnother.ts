import ApiService, {
  getAuthorizationHeader,
} from 'services/RedeemApi/baseConfig'
import {
  CopyMerchantsFromCampaignToAnotherRequest,
  CopyMerchantsFromCampaignToAnotherResponse,
} from '../types'

export const copyMerchantsFromCampaignToAnother = async (
  params: CopyMerchantsFromCampaignToAnotherRequest
): Promise<CopyMerchantsFromCampaignToAnotherResponse> => {
  const headers = getAuthorizationHeader()
  return ApiService.post(
    `/campaigns/merchants/copy`,
    {
      campaign_to_copy_from: params.campaignToCopyFrom,
      campaign_to_copy_to: params.campaignToCopyTo,
    },
    { headers }
  ).then((response) => response.data)
}
