import React, { useState, useEffect } from 'react'
import { Flex, FormControl } from '@chakra-ui/react'
import {
  Button,
  FormErrorMessage,
  Spinner,
} from '@opengovsg/design-system-react'
import { useNavigate, useLocation } from 'react-router-dom'
import moment from 'moment-timezone'
import { useTranslation } from 'react-i18next'

import OnboardingHeader from 'components/onboarding/OnboardingHeader'
import MobileOTPLogo from 'images/mobile-otp.svg'
import OTPInput from 'components/onboarding/OTPInput'

import { OTP, REQUEST_STATE } from 'constants/api'
import { FLOWS } from 'router/routes'

import { getHttpAppErrorCode } from 'helpers/utils'
import { validateOTP } from 'helpers/validators'
import { useAuthenticationState } from 'data/Authentication'
import useTime from 'hooks/Time'
import {
  useRequestOtpByContactNumber,
  useVerifyOtpAndContactNumberForCredentials,
} from 'hooks/Login'
import useErrorToast from 'hooks/useErrorToast'
import I18N_KEYS from 'constants/i18n-keys'
import TemplatedText from 'components/shared/TemplatedText'

const OTPCode = () => {
  // navhooks
  const navigate = useNavigate()
  const location = useLocation()

  // ui states
  const { KEY, TEXT } = I18N_KEYS.OTP_CODE
  const { t } = useTranslation(KEY)

  const [otpContactNumber, setOtpContactNumber] = useState('')
  const [otpDisplayNumber, setOtpDisplayNumber] = useState('')
  const [invalidInputText, setInvalidInputText] = useState('')
  const [otpValue, setOtpValue] = useState('')
  const resetOtpValue = () => setOtpValue('')
  const errorToast = useErrorToast()

  // initialise contact number on first render
  useEffect(() => {
    // guard that user has filled out the contact number on the prev page before getting here
    if (!location.state)
      navigate(`../${FLOWS.ONBOARDING.OTP_CODE.BACKLINK.ROUTE}`, {
        replace: true,
      })

    setOtpContactNumber(location.state.contactNumber)
    setOtpDisplayNumber(location.state.displayNumber)
  }, [])

  // otp states / hooks
  // use state hook for timestamp as it directly powers the timer
  const [requestOtpTimestamp, setRequestOtpTimestamp] = useState(moment())

  const now = useTime()
  const { requestOtpByContactNumber, requestOtpByContactNumberStatus } =
    useRequestOtpByContactNumber()
  const {
    verifyOtpAndContactNumberForCredentials,
    verifyOtpAndContactNumberForCredentialsStatus,
  } = useVerifyOtpAndContactNumberForCredentials()
  const { setAuthStateWithUser } = useAuthenticationState()

  const onOTPUpdate = (val) => {
    setOtpValue(val)

    // clear error message
    setInvalidInputText('')
  }

  const onOTPFilled = async (text) => {
    // Guard against double submit. This function will always trigger when the
    // OTP filled in is of the correct length
    if (
      verifyOtpAndContactNumberForCredentialsStatus === REQUEST_STATE.LOADING
    ) {
      return
    }

    try {
      // ensure OTP entered is valid, else reset the value and return.
      const { otp, isValid, error } = validateOTP(text)
      if (!isValid) {
        resetOtpValue()
        setInvalidInputText(error)
        return
      }

      const user = await verifyOtpAndContactNumberForCredentials({
        contactNumber: otpContactNumber,
        otp,
      })

      // Set the user
      await setAuthStateWithUser(user)

      // if successful, proceed with onboarding
      navigate(`../${FLOWS.ONBOARDING.OTP_CODE.NEXT}`, {
        replace: true,
      })
    } catch (error) {
      // If error 401, it means wrong/expired OTP.
      // Set the invalid input text to show and clear the user entered input
      // Else, for all other error, show sys dialog with error
      if (getHttpAppErrorCode(error) === OTP.REQUEST_STATES.INVALID.CODE) {
        setInvalidInputText(OTP.REQUEST_STATES.INVALID.MESSAGE)
        resetOtpValue()
      } else {
        errorToast(error)
      }
    }
  }

  const resendOtp = async () => {
    // Guard against double submit
    if (requestOtpByContactNumberStatus === REQUEST_STATE.LOADING) {
      return
    }
    try {
      await requestOtpByContactNumber(otpContactNumber)
      setRequestOtpTimestamp(moment())
    } catch (error) {
      // eat errors and fail silently for now
      // TODO: prettify this
    }
  }

  // otp timer logic
  const remainingSecondsToResendOtp = moment(requestOtpTimestamp)
    .add(OTP.RESEND_INTERVAL_IN_SECONDS, 's')
    .diff(now, 's')
  const canResendOtp = remainingSecondsToResendOtp <= 0
  const isVerifyingOtp =
    verifyOtpAndContactNumberForCredentialsStatus === REQUEST_STATE.LOADING

  return (
    <>
      <OnboardingHeader
        logoSrc={MobileOTPLogo}
        title={t(TEXT.HEADER)}
        backlink={{
          link: FLOWS.ONBOARDING.OTP_CODE.BACKLINK.ROUTE,
          title: t(FLOWS.ONBOARDING.OTP_CODE.BACKLINK.TITLE),
        }}
      />
      <Flex
        flexDir='column'
        gap={6}
        paddingBottom={24}
        paddingX={6}
      >
        <Flex
          flexDir='column'
          gap={3}
        >
          <FormControl isInvalid={invalidInputText !== ''}>
            <TemplatedText
              style={{ marginBottom: 2, textStyle: 'subhead-1' }}
              variables={{ number: otpDisplayNumber }}
            >
              {t(TEXT.INSTRUCTION)}
            </TemplatedText>
            <OTPInput
              value={otpValue}
              onChange={onOTPUpdate}
              onComplete={onOTPFilled}
            />
            <FormErrorMessage>{t(invalidInputText)}</FormErrorMessage>
          </FormControl>
          <Button
            marginX='auto'
            variant='link'
            fontSize={14}
            marginY={3}
            onClick={resendOtp}
            isLoading={
              requestOtpByContactNumberStatus === REQUEST_STATE.LOADING
            }
            isDisabled={!canResendOtp}
          >
            {canResendOtp
              ? t(TEXT.RESEND_OTP_TEXT)
              : `${t(TEXT.RESEND_OTP_TEXT)} 0:${
                  remainingSecondsToResendOtp < 10 ? '0' : ''
                }${remainingSecondsToResendOtp}`}
          </Button>
          {isVerifyingOtp && (
            <Spinner
              marginX='auto'
              size='large'
            />
          )}
        </Flex>
      </Flex>
    </>
  )
}

export default OTPCode
