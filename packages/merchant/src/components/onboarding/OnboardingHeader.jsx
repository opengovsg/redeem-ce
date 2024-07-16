import React from 'react'
import PropTypes from 'prop-types'
import { Image, Text, VStack } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'
import { BiArrowBack, BiLogOutCircle } from 'react-icons/bi'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useLogout from 'hooks/Logout'
import I18N_KEYS from 'constants/i18n-keys'

const OnboardingHeader = ({ logoSrc, title, backlink, logout }) => {
  const logoutHook = useLogout()
  const { KEY, TEXT } = I18N_KEYS.COMMON
  const { t } = useTranslation(KEY)

  return (
    <VStack
      marginX={6}
      alignItems='start'
    >
      {backlink && !logout && (
        <Button
          as={ReactRouterLink}
          relative='path'
          to={`../${backlink.link}`}
          replace
          marginTop={6}
          marginBottom={-2}
          variant='link'
          leftIcon={<BiArrowBack fontSize={20} />}
        >
          <Text textStyle='subhead-1'>{backlink.title}</Text>
        </Button>
      )}
      {logout && (
        <Button
          marginTop={6}
          marginBottom={-2}
          variant='link'
          leftIcon={<BiLogOutCircle fontSize={20} />}
          onClick={logoutHook.logout}
        >
          <Text textStyle='subhead-1'>{t(TEXT.LOGOUT)}</Text>
        </Button>
      )}
      <VStack
        marginTop={12}
        marginBottom={4}
        alignItems='start'
        spacing={4}
      >
        <Image
          h={16}
          w={16}
          objectFit='contain'
          objectPosition='left'
          src={logoSrc}
        />
        <Text textStyle='h4'>{title}</Text>
      </VStack>
    </VStack>
  )
}

OnboardingHeader.propTypes = {
  logoSrc: PropTypes.string,
  title: PropTypes.string,
  backlink: PropTypes.shape({
    link: PropTypes.string,
    title: PropTypes.string,
  }),
  logout: PropTypes.bool,
}

export default OnboardingHeader
