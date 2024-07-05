import React from 'react'
import { VStack } from '@chakra-ui/react'
import { withTwilio } from './context/TwilioContext'

import TwilioAccount from './TwilioAccount'

const Settings = () => {
  return (
    <VStack alignItems="stretch" width="100%" padding={8} spacing={6}>
      <TwilioAccount />
    </VStack>
  )
}

export default withTwilio(Settings)
