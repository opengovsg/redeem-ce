import ApiService, {
  getAuthorizationHeader,
} from 'services/RedeemApi/baseConfig'
import {
  SendMerchantsAccessCodeRequest,
  SendMerchantsAccessCodeResponse,
} from '../types'

export const sendMerchantsAccessCode = async (
  params: SendMerchantsAccessCodeRequest
): Promise<SendMerchantsAccessCodeResponse> => {
  const headers = getAuthorizationHeader()
  return ApiService.post(
    `/merchants/send-access-code`,
    {
      merchant_ids: params.merchantIds,
    },
    { headers }
  ).then((response) => response.data)
}
