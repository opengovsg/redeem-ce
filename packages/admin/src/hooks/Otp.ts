import { useMutation } from 'react-query'
import {
  requestOtpByEmail,
  verifyOtpAndEmailForCredentials,
} from 'services/RedeemApi'

// Refer to useMutation here
// https://react-query.tanstack.com/docs/guides/mutations#basic-mutations

export function useRequestOtpByEmail() {
  const { mutateAsync, status, data, error, reset } =
    useMutation(requestOtpByEmail)

  return {
    requestOtpByEmail: mutateAsync,
    requestOtpByEmailStatus: status,
    requestOtpByEmailResponse: data,
    requestOtpByEmailError: error,
    resetRequestOtpByEmail: reset,
  }
}

export function useVerifyOtpAndEmailForCredentials() {
  const { mutateAsync, status, data, error, reset } = useMutation(
    verifyOtpAndEmailForCredentials
  )

  return {
    verifyOtpAndEmailForCredentials: mutateAsync,
    verifyOtpAndEmailForCredentialsStatus: status,
    verifyOtpAndEmailForCredentialsResponse: data,
    verifyOtpAndEmailForCredentialsError: error,
    resetVerifyOtpAndEmailForCredentials: reset,
  }
}
