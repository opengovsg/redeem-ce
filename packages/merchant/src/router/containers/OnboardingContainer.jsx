import React, { useEffect } from 'react'
import { Image, VStack } from '@chakra-ui/react'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'
import CardFrame from 'components/shared/CardFrame'

import RedeemLogo from 'images/redeem-logo.svg'
import { ROUTES } from 'router/routes'

import BREAKPOINTS from 'constants/breakpoints'

const OnboardingContainer = () => {
  const navigate = useNavigate()
  const isRoot = useMatch(ROUTES.ONBOARDING.ROOT)

  // redirect the user to language selection if they hit root
  // TODO: implement onboarding
  useEffect(() => {
    if (isRoot) navigate(ROUTES.ONBOARDING.PATHS.CHOOSE_LANG, { replace: true })
  })

  return (
    <VStack
      h='100vh'
      w='100vw'
      paddingY={6}
      paddingX={BREAKPOINTS.HORIZONTAL_RESPONSIVE.PADDING_X}
      justifyContent='center'
      gap={4}
      backgroundColor='brand.primary.50'
    >
      <CardFrame
        style={{
          w: '100%',
          maxW: '360px',
          h: 'fit-content',
          marginX: 'auto',
          shadow: 'sm',
          overflow: 'scroll',
        }}
      >
        <Outlet />
      </CardFrame>
      <Image
        h={4}
        src={RedeemLogo}
      />
    </VStack>
  )
}

export default OnboardingContainer
