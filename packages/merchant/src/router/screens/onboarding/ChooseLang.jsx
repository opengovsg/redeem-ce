import React, { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'
import { useNavigate } from 'react-router-dom'

import LanguageLogo from 'images/language-logo.svg'
import OnboardingHeader from 'components/onboarding/OnboardingHeader'
import LanguageList from 'components/shared/LanguageList'

import i18n, { changeLanguage } from 'services/localisation/i18n'
import { useTranslation } from 'react-i18next'

import I18N_KEYS from 'constants/i18n-keys'
import { FLOWS } from 'router/routes'

const ChooseLang = () => {
  const navigate = useNavigate()

  // ui
  const { KEY, TEXT } = I18N_KEYS.CHOOSE_LANG_SCREEN
  const { t } = useTranslation(KEY)
  const [selectedLang, setSelectedLang] = useState(i18n.language)

  // logic
  const handleSubmit = () => {
    try {
      changeLanguage(selectedLang)
      navigate(`../${FLOWS.ONBOARDING.CHOOSE_LANG.NEXT}`, { replace: true })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <OnboardingHeader
        logoSrc={LanguageLogo}
        title={t(TEXT.HEADER)}
      />
      <Flex
        flexDir='column'
        gap={4}
        paddingBottom={8}
      >
        <LanguageList
          selectedLang={selectedLang}
          setSelectedLang={(key) => {
            setSelectedLang(key)
            changeLanguage(key)
          }}
        />
        <Button
          h={14}
          marginTop={2}
          marginX={8}
          onClick={handleSubmit}
        >
          {t(TEXT.CONFIRM_BUTTON)}
        </Button>
      </Flex>
    </>
  )
}

export default ChooseLang
