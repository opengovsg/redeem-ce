import React, { useState } from 'react'

import { useAuthenticationState } from 'data/Authentication'
import {
  useRequestOtpByEmail,
  useVerifyOtpAndEmailForCredentials,
} from 'hooks/Otp'

import Input from 'components/Input'

import { getErrorMessage } from 'services/utils'
import Request from 'constants/request'

import { useToast } from 'data/Toasts'
import Login from './Login'

// Login has 2 phases
const PHASES = {
  ENTER_EMAIL: 'enter_email',
  ENTER_OTP: 'enter_otp',
}

const EMAIL_MAX_LENGTH = 50
const EMAIL_INPUT_PLACEHOLDER = 'Email Address'
const OTP_MAX_LENGTH = 8
const OTP_PLACEHOLDER = '8 Digit OTP'

export default function LoginContainer() {
  const { toastError } = useToast()
  const { setAuthStateWithUser } = useAuthenticationState()
  const { requestOtpByEmail, requestOtpByEmailStatus } = useRequestOtpByEmail()
  const {
    verifyOtpAndEmailForCredentials,
    verifyOtpAndEmailForCredentialsStatus,
    verifyOtpAndEmailForCredentialsError,
  } = useVerifyOtpAndEmailForCredentials()
  const [phase, setPhase] = useState(PHASES.ENTER_EMAIL)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

  const onEmailSubmit = async () => {
    try {
      await requestOtpByEmail({ email })
      setPhase(PHASES.ENTER_OTP)
    } catch (error) {
      toastError(error)
    }
  }

  const onOtpSubmit = async () => {
    try {
      const credentials = await verifyOtpAndEmailForCredentials({ otp, email })
      setAuthStateWithUser({ ...credentials.user, token: credentials.token })
    } catch (error) {
      // TODO: Reconsider this part as the error message is already shown under the otp input box
    }
  }

  const onPrimaryButtonClick = () => {
    if (phase === PHASES.ENTER_EMAIL) {
      onEmailSubmit()
    } else if (phase === PHASES.ENTER_OTP) {
      onOtpSubmit()
    }
  }

  const onBackClick = () => {
    setPhase(PHASES.ENTER_EMAIL)
  }

  const EmailLabelAndInput = (
    <>
      <label htmlFor="email-input">
        Register or login with an official email address.
      </label>
      <Input
        id="email-input"
        type="email"
        required
        placeholder={EMAIL_INPUT_PLACEHOLDER}
        maxLength={EMAIL_MAX_LENGTH}
        value={email}
        onChange={(input) => setEmail(input?.toLowerCase())}
      />
    </>
  )

  const OtpLabelAndInput = (
    <>
      <label htmlFor="otp-input">
        Please enter the {OTP_MAX_LENGTH} digit OTP sent to <b>{email}</b>
      </label>
      <Input
        id="otp-input"
        type="text"
        required
        placeholder={OTP_PLACEHOLDER}
        maxLength={OTP_MAX_LENGTH}
        value={otp}
        onChange={setOtp}
      />
    </>
  )

  const LOADING =
    requestOtpByEmailStatus === Request.LOADING ||
    verifyOtpAndEmailForCredentialsStatus === Request.LOADING

  return (
    <Login
      LabelAndInput={
        phase === PHASES.ENTER_EMAIL ? EmailLabelAndInput : OtpLabelAndInput
      }
      onPrimaryButtonClick={onPrimaryButtonClick}
      primaryButtonText={phase === PHASES.ENTER_EMAIL ? 'Login' : 'Submit'}
      isBackButtonShown={phase === PHASES.ENTER_OTP}
      onBackClick={onBackClick}
      isLoading={LOADING}
      errorMessage={getErrorMessage(verifyOtpAndEmailForCredentialsError)}
    />
  )
}
