// This file contains custom errors that the app will handle, providing data to
// both recognise the error and the custom text to show in the UI

export const REQUEST_TIMEOUT_ERROR = {
  HEADER: 'Something went wrong',
  MESSAGE: 'An unknown error occured. Please try again.',
}

// TODO: Header/Message is currently generic - can be changed to specific messaging when applicable
export const IDEMPOTENT_REQUEST_IN_PROGRESS_ERROR = {
  ERROR_CODE: 'idempotent_request_in_progress',
  HEADER: 'Something went wrong',
  MESSAGE: 'An unknown error occured. Please try again.',
}

export const ALREADY_REDEEMED_VOUCHER_ERROR = {
  ERROR_CODE: 'redemption_vouchers_used',
  HEADER: 'Already redeemed',
  MESSAGE:
    'These vouchers have already been redeemed. Please ask the customer to select other vouchers.',
}

export const VOID_VOUCHER_ERROR = {
  ERROR_CODE: 'redemption_vouchers_voided',
  HEADER: 'Void Voucher',
  MESSAGE: 'These vouchers are void. Please ask the customer to present the right vouchers.',
}

// TODO: This should be updated to straight away call GET /sessions again
export const VOUCHER_CANNOT_BE_USED_AT_MERCHANT_ERROR = {
  ERROR_CODE: 'redemption_vouchers_merchant_forbidden',
  HEADER: 'Vouchers cannot be used here',
  MESSAGE:
    'These vouchers cannot be redeemed at your shop. Please ask the customer to check the list of participating merchants.',
}

export const INVALID_VOUCHER_ERROR = {
  ERROR_CODE: 'redemption_vouchers_not_found',
  HEADER: 'QR code not valid',
  MESSAGE:
    'Please ask the customer to check if they are using the correct link to select vouchers.',
}

export const EXPIRED_VOUCHER_ERROR = {
  ERROR_CODE: 'redemption_vouchers_period_ended',
  HEADER: 'Vouchers expired',
  MESSAGE:
    'These vouchers are past their expiry date. Please ask the customer to check the validity of their vouchers.',
}
