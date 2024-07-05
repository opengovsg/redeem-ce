import ApiService, {
  getAuthorizationHeader,
} from 'services/RedeemApi/baseConfig'
import {
  CreateAndAddMerchantRequest,
  CreateAndAddMerchantsResponse,
} from '../types'

export const createAndAddMerchantsToCampaign = async (
  params: CreateAndAddMerchantRequest
): Promise<CreateAndAddMerchantsResponse> => {
  const headers = getAuthorizationHeader()
  return ApiService.post(
    `/campaigns/${params.campaignId}/merchants/create-and-add`,
    {
      merchants: params.merchants,
    },
    { headers }
  ).then((response) => response.data)
}
