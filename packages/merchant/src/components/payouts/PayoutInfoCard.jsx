import React from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Icon,
  Text,
} from '@chakra-ui/react'
import { AiFillQuestionCircle } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'

import I18N_KEYS from 'constants/i18n-keys'

const PayoutInfoCard = () => {
  const { KEY, TEXT } = I18N_KEYS.PAYOUTS
  const { t } = useTranslation(KEY)

  return (
    <Accordion allowToggle>
      <AccordionItem border='none'>
        <AccordionButton
          padding={0}
          gap={2}
        >
          <Icon as={AiFillQuestionCircle} />{' '}
          <Text textStyle='subhead-2'>{t(TEXT.INFO_DRAWER_PROMPT)}</Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel
          marginTop={4}
          padding={4}
          backgroundColor='#1B1E44'
          paddingX={0}
        >
          <Text textStyle='body-2'>{t(TEXT.INFO_DRAWER_TEXT)}</Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default PayoutInfoCard
