import { useMutation } from 'react-query'

import RedeemApi from 'services/redeem-api'
import {
  isRequestTimeoutError,
  isIdempotentRequestInProgressError,
} from 'helpers/errors'

const MAX_RETRIES = 1 // This excludes the first attempt

// Retry only if error is request timeout or 409 in progress
// 500/401/402/403/404 errors do not need to be retried
function isRetryableError(error) {
  return (
    isRequestTimeoutError(error) || isIdempotentRequestInProgressError(error)
  )
}

export default function useRedeemVouchers() {
  const { mutateAsync, status, data, error, reset } = useMutation(
    ({ qr, idempotencyKey }) =>
      RedeemApi.requestRedemptionWithQr(qr, idempotencyKey),
    {
      // Note: failureCount will be 0 on first failed attempt
      retry: (failureCount, receivedError) =>
        isRetryableError(receivedError) && failureCount < MAX_RETRIES,
    },
  )

  return {
    redeemVouchers: mutateAsync,
    redeemVouchersStatus: status,
    redeemVouchersResponse: data,
    redeemVouchersError: error,
    resetRedeemVouchers: reset,
  }
}
