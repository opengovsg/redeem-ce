import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import WelcomeGraphic from './WelcomeGraphic'

export default function WelcomeCard() {
  return (
    <Box
      as="section"
      paddingTop="48px"
      paddingBottom="88px"
      color="white"
      background="primary.500"
      paddingX="124px"
    >
      <HStack justify="space-between" marginRight="64px">
        <Text textStyle="h1">My Campaigns</Text>
        <WelcomeGraphic />
      </HStack>
    </Box>
  )
}
