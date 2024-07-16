import { getErrorMessage, getHttpAppErrorCode } from 'helpers/utils'
import { TimeoutError } from 'bluebird'

import * as RedemptionErrors from './redemption'

function isAlreadyRedeemedVoucherError(error) {
  return (
    getHttpAppErrorCode(error) ===
    RedemptionErrors.ALREADY_REDEEMED_VOUCHER_ERROR.ERROR_CODE
  )
}

function isVoidVoucherError(error) {
  return (
    getHttpAppErrorCode(error) ===
    RedemptionErrors.VOID_VOUCHER_ERROR.ERROR_CODE
  )
}

function isInvalidVoucherError(error) {
  return (
    getHttpAppErrorCode(error) ===
    RedemptionErrors.INVALID_VOUCHER_ERROR.ERROR_CODE
  )
}

function isExpiredVoucherError(error) {
  return (
    getHttpAppErrorCode(error) ===
    RedemptionErrors.EXPIRED_VOUCHER_ERROR.ERROR_CODE
  )
}

function isVoucherCannotBeUsedAtMerchantError(error) {
  return (
    getHttpAppErrorCode(error) ===
    RedemptionErrors.VOUCHER_CANNOT_BE_USED_AT_MERCHANT_ERROR.ERROR_CODE
  )
}

// Used to check for retries
export function isRequestTimeoutError(error) {
  return error instanceof TimeoutError
}

// Used to check for retries
export function isIdempotentRequestInProgressError(error) {
  return (
    getHttpAppErrorCode(error) ===
    RedemptionErrors.IDEMPOTENT_REQUEST_IN_PROGRESS_ERROR.ERROR_CODE
  )
}

export function getFailedRedemptionHeaderAndMessage(error) {
  let headerText
  let message
  // Customize the headerText and message accordingly to the different error types
  // that we recognise.
  // For all else, only set the message which is given from the server
  if (isRequestTimeoutError(error)) {
    headerText = RedemptionErrors.REQUEST_TIMEOUT_ERROR.HEADER
    message = RedemptionErrors.REQUEST_TIMEOUT_ERROR.MESSAGE
  } else if (isInvalidVoucherError(error)) {
    headerText = RedemptionErrors.INVALID_VOUCHER_ERROR.HEADER
    message = RedemptionErrors.INVALID_VOUCHER_ERROR.MESSAGE
  } else if (isVoucherCannotBeUsedAtMerchantError(error)) {
    headerText =
      RedemptionErrors.VOUCHER_CANNOT_BE_USED_AT_MERCHANT_ERROR.HEADER
    message = RedemptionErrors.VOUCHER_CANNOT_BE_USED_AT_MERCHANT_ERROR.MESSAGE
  } else if (isAlreadyRedeemedVoucherError(error)) {
    headerText = RedemptionErrors.ALREADY_REDEEMED_VOUCHER_ERROR.HEADER
    message = RedemptionErrors.ALREADY_REDEEMED_VOUCHER_ERROR.MESSAGE
  } else if (isVoidVoucherError(error)) {
    headerText = RedemptionErrors.VOID_VOUCHER_ERROR.HEADER
    message = RedemptionErrors.VOID_VOUCHER_ERROR.MESSAGE
  } else if (isIdempotentRequestInProgressError(error)) {
    headerText = RedemptionErrors.IDEMPOTENT_REQUEST_IN_PROGRESS_ERROR.HEADER
    message = RedemptionErrors.IDEMPOTENT_REQUEST_IN_PROGRESS_ERROR.MESSAGE
  } else if (isExpiredVoucherError(error)) {
    headerText = RedemptionErrors.EXPIRED_VOUCHER_ERROR.HEADER
    message = RedemptionErrors.EXPIRED_VOUCHER_ERROR.MESSAGE
  } else {
    message = getErrorMessage(error)
  }
  return { headerText, message }
}
