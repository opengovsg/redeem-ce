import React from 'react'
import { Text, HStack } from '@chakra-ui/react'
import CampaignDetailsForm from './CampaignDetailsForm'

const CampaignDetailsFormContainer = () => {
  return (
    <HStack align="start" padding={8}>
      <Text textStyle="h4" width="30%" color="neutral.800">
        Campaign Details
      </Text>
      <CampaignDetailsForm />
    </HStack>
  )
}

export default CampaignDetailsFormContainer
