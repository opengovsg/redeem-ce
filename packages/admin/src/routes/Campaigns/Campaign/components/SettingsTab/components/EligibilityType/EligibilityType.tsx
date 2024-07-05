import React from 'react'
import { VStack } from '@chakra-ui/react'
import WhitelistContainer from './components/WhitelistContainer'
import CampaignSignUpLink from './components/CampaignSignUpLink'

const EligibilityType = () => {
  return (
    <VStack alignItems="stretch" width="100%" padding={8} spacing={6}>
      <WhitelistContainer />
      <CampaignSignUpLink />
    </VStack>
  )
}

export default EligibilityType
