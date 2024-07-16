export const REQUEST_STATE = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

export const OTP = {
  LENGTH: 4,
  VERIFY_MINIMUM_DELAY_IN_MS: 1500,
  RESEND_INTERVAL_IN_SECONDS: 50,
  REQUEST_STATES: {
    INVALID: {
      CODE: 'otp_invalid',
      MESSAGE: 'Invalid OTP. Please try again.',
    },
  },
}

export const TRANSACTIONS = {
  DEFAULT_FETCH_LIMIT: 500,
  PAGINATE_LIMIT: 5,
}

export default {
  REQUEST_STATE,
  OTP,
}
