import ApiService, {
  getAuthorizationHeader,
} from 'services/RedeemApi/baseConfig'
import {
  AddMerchantsToCampaignRequest,
  AddMerchantsToCampaignResponse,
} from '../types'
import { MERCHANT_NO_TYPE } from '../constants/operations'

export const addMerchantsToCampaign = async (
  params: AddMerchantsToCampaignRequest
): Promise<AddMerchantsToCampaignResponse> => {
  const headers = getAuthorizationHeader()
  return ApiService.post(
    `/campaigns/${params.campaignId}/merchants`,
    {
      merchant_ids: params.merchantIds,
      // Only if there is a specified type apart from merchant_no_type, then we attach merchant type to request
      ...(params.campaignMerchantType !== MERCHANT_NO_TYPE && {
        campaign_merchant_type: params.campaignMerchantType,
      }),
    },
    { headers }
  ).then((response) => response.data)
}
