import React, { useRef, useState } from 'react'
import { Flex, FormControl, Text } from '@chakra-ui/react'
import { Button, FormErrorMessage, Input } from '@opengovsg/design-system-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import OnboardingHeader from 'components/onboarding/OnboardingHeader'
import ShopLogo from 'images/shop.svg'

import { useRequestJoinMerchantWithCode } from 'hooks/Session'
import useErrorToast from 'hooks/useErrorToast'
import { isClientError, openInNewTab } from 'helpers/utils'
import { validateShopCode } from 'helpers/validators'

import { FLOWS } from 'router/routes'
import { REQUEST_STATE } from 'constants/api'
import I18N_KEYS from 'constants/i18n-keys'
import LINKS from 'constants/links'

const ChooseShop = () => {
  // navhooks
  const navigate = useNavigate()

  // ui
  const { KEY, TEXT } = I18N_KEYS.CHOOSE_SHOP
  const { t } = useTranslation(KEY)

  const [invalidInputText, setInvalidInputText] = useState('')
  const inputRef = useRef()
  const errorToast = useErrorToast()

  // logic
  const { requestJoinMerchantWithCode, requestJoinMerchantWithCodeStatus } =
    useRequestJoinMerchantWithCode()

  const onSubmit = async () => {
    // guard validate input length
    const { code, isValid, error } = validateShopCode(inputRef.current.value)
    if (!isValid) {
      setInvalidInputText(error)
      return
    }

    try {
      await requestJoinMerchantWithCode(code)
      navigate(`${FLOWS.ONBOARDING.CHOOSE_SHOP.NEXT}`, {
        replace: true,
        state: {
          justOnboardedMerchant: true,
        },
      })
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
        logoSrc={ShopLogo}
        title={t(TEXT.HEADER)}
        logout
      />
      <Flex
        flexDir='column'
        gap={4}
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
            />
            <FormErrorMessage>{t(invalidInputText)}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Button
          h={14}
          isLoading={
            requestJoinMerchantWithCodeStatus === REQUEST_STATE.LOADING
          }
          onClick={onSubmit}
        >
          {t(TEXT.PRIMARY_BTN_TEXT)}
        </Button>
        <Button
          marginX='auto'
          variant='link'
          fontSize={14}
          onClick={() => openInNewTab(LINKS.CONTACT)}
        >
          {/* TODO: implement link */}
          {t(TEXT.NO_SHOP_CODE_TEXT)}
        </Button>
      </Flex>
    </>
  )
}

export default ChooseShop
