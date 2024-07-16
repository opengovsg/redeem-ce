import React, { useRef, useState } from 'react'
import { Flex, FormControl, Text } from '@chakra-ui/react'
import {
  Button,
  FormErrorMessage,
  Link,
  PhoneNumberInput,
} from '@opengovsg/design-system-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import OnboardingHeader from 'components/onboarding/OnboardingHeader'
import MobileLogo from 'images/mobile.svg'

import { isClientError } from 'helpers/utils'
import { validatePhoneNumber } from 'helpers/validators'
import { useRequestOtpByContactNumber } from 'hooks/Login'
import useErrorToast from 'hooks/useErrorToast'

import { FLOWS } from 'router/routes'
import { REQUEST_STATE } from 'constants/api'
import LINKS from 'constants/links'
import FORMAT from 'constants/format'
import I18N_KEYS from 'constants/i18n-keys'

const OTPMobile = () => {
  // navhooks
  const navigate = useNavigate()

  // ui data
  const { KEY, TEXT } = I18N_KEYS.OTP_MOBILE
  const { t } = useTranslation(KEY)

  const [inputText, setInputText] = useState('')
  const [invalidInputText, setInvalidInputText] = useState('')
  const errorToast = useErrorToast()

  // login states
  const extensionLength = useRef(0)
  const { requestOtpByContactNumber, requestOtpByContactNumberStatus } =
    useRequestOtpByContactNumber()

  // logic
  const onInputChange = (inputValue) => {
    // tracks extension length, set on first number entry

    // NOTE: the default behaviour of PhoneNumberInput will reset
    // the inputText, so this works even if the user changes country
    // codes midway
    if (inputValue.length === 0) extensionLength.current = 0
    else if (extensionLength.current === 0)
      extensionLength.current = inputValue.length - 1

    // if there was an error before, reset it
    setInvalidInputText('')

    // update inputText to mirror input value
    setInputText(inputValue)
  }

  const onConfirmEntry = async () => {
    // guard against double submissions and invalid phone numbers
    const { phoneNumber, isValid, error } = validatePhoneNumber(
      inputText,
      extensionLength.current,
    )
    if (requestOtpByContactNumberStatus === REQUEST_STATE.LOADING || !isValid) {
      setInvalidInputText(error)
      return
    }

    // remove the + before sending the number for authentication
    const contactNumber = phoneNumber.replace(/\+/g, '')
    try {
      await requestOtpByContactNumber(contactNumber)

      // display pure number without extension code
      const displayNumber = inputText.substring(extensionLength.current)

      // On request success, navigate and pass the contact number to the next screen
      navigate(`../${FLOWS.ONBOARDING.OTP_MOBILE.NEXT}`, {
        state: { contactNumber, displayNumber },
        replace: true,
      })
    } catch (apiError) {
      // If error is 4XX (client error) means it is an invalid Singapore number.
      // Set the invalid input text to show error
      // Else, for all other error, show sys dialog with error
      if (isClientError(apiError)) {
        setInvalidInputText(TEXT.INVALID_MOBILE_NUM_TEXT)
      } else {
        errorToast(apiError)
      }
    }
  }

  return (
    <>
      <OnboardingHeader
        logoSrc={MobileLogo}
        title={t(TEXT.HEADER)}
        backlink={{
          link: FLOWS.ONBOARDING.OTP_MOBILE.BACKLINK.ROUTE,
          title: t(FLOWS.ONBOARDING.OTP_MOBILE.BACKLINK.TITLE),
        }}
      />
      <Flex
        flexDir='column'
        gap={6}
        paddingBottom={24}
      >
        <Flex
          flexDir='column'
          paddingX={6}
          gap={3}
        >
          <FormControl isInvalid={invalidInputText !== ''}>
            <Text
              marginBottom={2}
              textStyle='subhead-2'
            >
              {t(TEXT.INSTRUCTION)}
            </Text>
            <PhoneNumberInput
              onChange={onInputChange}
              defaultCountry={FORMAT.PHONE_NUMBER.COUNTRY}
              placeholder={t(TEXT.PLACEHOLDER)}
            />
            <FormErrorMessage>{t(invalidInputText)}</FormErrorMessage>
          </FormControl>
          <Button
            marginY={1}
            h={14}
            isDisabled={validatePhoneNumber(inputText).isValid}
            isLoading={
              requestOtpByContactNumberStatus === REQUEST_STATE.LOADING
            }
            onClick={onConfirmEntry}
          >
            {t(TEXT.PRIMARY_BTN_TEXT)}
          </Button>
          <Text
            textStyle='subhead-2'
            textAlign='center'
          >
            {t(TEXT.NO_SHOP_CODE_EXPLANATION)}{' '}
            <Link href={LINKS.FAQ}>{t(TEXT.NO_SHOP_CODE_BUTTON)}</Link>
          </Text>
        </Flex>
      </Flex>
    </>
  )
}

export default OTPMobile
