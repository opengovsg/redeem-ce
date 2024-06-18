import React, {ReactNode} from 'react'
import {Center, HStack, Image, Link, Text, VStack} from '@chakra-ui/react'

// Components
import redeemLogo from 'images/redeem-logo.svg'
import errorPageGraphic from 'images/error-page-graphic.svg'
import LanguageSelector from 'components/LanguageSelector'
import {Trans, useTranslation} from 'react-i18next'
import Header from '../basic/Header'
import {REDEEM_CONSTANTS} from 'constants/config'

interface ErrorTemplateProps {
  errorObj: {
    title: string
    content: ReactNode
  }
}

// Presentational component for error states
const ErrorTemplate = ({errorObj}: ErrorTemplateProps) => {
  const {t} = useTranslation('errors', {keyPrefix: 'common'})
  return (
    <>
      <Header
        campaignDescription={errorObj.title}
        campaignTitle={errorObj.title}
      />
      <Center flexGrow={1} width='100%' background='white' id='error-template'>
        <VStack
          align='stretch'
          justify='space-between'
          width='100%'
          maxWidth='512px'
          height='100%'
          paddingTop='32px'
          paddingBottom='0'
          paddingX='24px'
          spacing='52px'
        >
          <VStack align='stretch' spacing='20px'>
            <HStack align='center' justify='space-between' paddingX='8px'>
              <Image width='8rem' height='1.5rem' src={redeemLogo} />
              <LanguageSelector color='light' />
            </HStack>
            <VStack align='stretch' spacing='12px'>
              <Text as='header' textStyle='h4' color='neutral.900'>
                {errorObj.title}
              </Text>
              <Text textStyle='body1' color='neutral.800'>
                {errorObj.content}
              </Text>
              <Text textStyle='body1' color='neutral.800'>
                <Trans t={t} i18nKey='contact'>
                  For more information, please write to
                  <Link
                    textStyle='subhead1'
                    color='primary.500'
                    href={`mailto:${REDEEM_CONSTANTS.supportEmail}`}
                    isExternal
                  >
                    {REDEEM_CONSTANTS.supportEmail}
                  </Link>
                </Trans>
              </Text>
            </VStack>
          </VStack>
          <Image alt='error page graphic' src={errorPageGraphic} />
        </VStack>
      </Center>
    </>
  )
}

export default ErrorTemplate
