import { useMutation } from 'react-query'
import RedeemApi from 'services/redeem-api'

import promiseMinDelay from 'helpers/promiseMinDelay'

import { OTP } from 'constants/api'

// Wraps the RedeemApi.verifyOtpAndContactNumberForCredentials to resolve/reject
// with a minimum delay.
// The purpose is for better clarity in UI as a loading spinner will hence be seen
// after submitting OTP.
const verifyOtpAndContactNumberForCredentialsWithDelay = (
  contactNumber,
  otp,
) => {
  const verificationPromise = RedeemApi.verifyOtpAndContactNumberForCredentials(
    contactNumber,
    otp,
  )
  return promiseMinDelay(verificationPromise, OTP.VERIFY_MINIMUM_DELAY_IN_MS)
}

export function useRequestOtpByContactNumber() {
  const { mutateAsync, status, data, error, reset } = useMutation(
    (contactNumber) => RedeemApi.requestOtpByContactNumber(contactNumber),
  )

  return {
    requestOtpByContactNumber: mutateAsync,
    requestOtpByContactNumberStatus: status,
    requestOtpByContactNumberResponse: data,
    requestOtpByContactNumberError: error,
    resetRequestOtpByContactNumber: reset,
  }
}

export function useVerifyOtpAndContactNumberForCredentials() {
  const { mutateAsync, status, data, error, reset } = useMutation(
    ({ contactNumber, otp }) =>
      verifyOtpAndContactNumberForCredentialsWithDelay(contactNumber, otp),
  )

  return {
    verifyOtpAndContactNumberForCredentials: mutateAsync,
    verifyOtpAndContactNumberForCredentialsStatus: status,
    verifyOtpAndContactNumberForCredentialsResponse: data,
    verifyOtpAndContactNumberForCredentialsError: error,
    resetVerifyOtpAndContactNumberForCredentials: reset,
  }
}
