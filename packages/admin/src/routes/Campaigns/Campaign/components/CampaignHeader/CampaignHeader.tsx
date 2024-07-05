import React from 'react'
import { HStack, Text } from '@chakra-ui/react'

import { useAuthenticationState } from 'data/Authentication'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import LogoutButton from 'components/LogoutButton'

const CampaignHeader = () => {
  const { campaignName } = useCampaignContext()
  const { user } = useAuthenticationState()
  const email = user?.email || ''

  return (
    <HStack
      position="sticky"
      zIndex="sticky"
      top={0}
      align="center"
      justify="space-between"
      padding="32px"
      background="white"
      borderStyle="solid"
      borderColor="neutral.300"
      borderBottomWidth="1px"
    >
      <Text textStyle="campaignHeader" color="primary.500">
        {campaignName}
      </Text>

      <HStack align="center" paddingRight="16px" spacing="16px">
        <Text textStyle="subhead1" color="neutral.700">
          {email}
        </Text>
        <LogoutButton />
      </HStack>
    </HStack>
  )
}

export default CampaignHeader
