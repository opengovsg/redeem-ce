import React, { useEffect, useRef, useState } from 'react'
import { Flex, FormControl, Text } from '@chakra-ui/react'
import { Button, FormErrorMessage, Input } from '@opengovsg/design-system-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import OnboardingHeader from 'components/onboarding/OnboardingHeader'
import AccountLogo from 'images/account.svg'

import { useAuthenticationState } from 'data/Authentication'
import { useRequestUpdateUserName } from 'hooks/Session'
import useErrorToast from 'hooks/useErrorToast'
import { isClientError } from 'helpers/utils'
import { validateName } from 'helpers/validators'

import { FLOWS } from 'router/routes'
import { REQUEST_STATE } from 'constants/api'
import I18N_KEYS from 'constants/i18n-keys'

const ChooseName = () => {
  // navhooks
  const navigate = useNavigate()
  const continueOnboarding = () =>
    navigate(`../${FLOWS.ONBOARDING.CHOOSE_NAME.NEXT}`, {
      replace: true,
    })

  // auth data
  const { user } = useAuthenticationState().user ?? { user: null }

  // skips this element if username already exists
  useEffect(() => {
    if (user?.name) continueOnboarding()
  }, [user])

  // ui
  const { KEY, TEXT } = I18N_KEYS.CHOOSE_NAME
  const { t } = useTranslation(KEY)

  const [invalidInputText, setInvalidInputText] = useState('')
  const inputRef = useRef()
  const errorToast = useErrorToast()

  // logic
  const { requestUpdateUserName, requestUpdateUserNameStatus } =
    useRequestUpdateUserName()

  const onSubmit = async () => {
    // validate name before submission
    const { name, isValid } = validateName(inputRef.current.value)

    if (!isValid) {
      // swallow the error for now
      // TODO: add translation for name length error
      return
    }

    try {
      await requestUpdateUserName(name)
      continueOnboarding()
    } catch (apiError) {
      if (isClientError(apiError)) {
        setInvalidInputText(apiError)
      } else {
        errorToast(apiError)
      }
    }
  }

  return (
    <>
      <OnboardingHeader
        logoSrc={AccountLogo}
        title={t(TEXT.HEADER)}
        logout
      />
      <Flex
        flexDir='column'
        gap={3}
        paddingBottom={24}
        paddingX={6}
      >
        <Flex
          flexDir='column'
          gap={3}
        >
          <FormControl isInvalid={invalidInputText !== ''}>
            <Text
              marginBottom={2}
              textStyle='subhead-2'
            >
              {t(TEXT.INSTRUCTION)}
            </Text>
            <Input
              placeholder={t(TEXT.PLACEHOLDER)}
              ref={inputRef}
              onChange={() => {
                if (invalidInputText !== '') setInvalidInputText('')
              }}
            />
            <FormErrorMessage>{t(invalidInputText)}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Button
          marginY={1}
          h={14}
          isLoading={requestUpdateUserNameStatus === REQUEST_STATE.LOADING}
          onClick={onSubmit}
        >
          {t(TEXT.PRIMARY_BTN_TEXT)}
        </Button>
      </Flex>
    </>
  )
}

export default ChooseName
