import { HStack, Image } from '@chakra-ui/react'
import React from 'react'
import welcomeGraphicLeft from 'img/welcome-graphic-left.svg'
import welcomeGraphicRight from 'img/welcome-graphic-right.svg'

const WelcomeGraphic = () => {
  return (
    <HStack align="start" spacing="28px">
      <Image src={welcomeGraphicLeft} />
      <Image marginTop="32px" src={welcomeGraphicRight} />
    </HStack>
  )
}

export default WelcomeGraphic
