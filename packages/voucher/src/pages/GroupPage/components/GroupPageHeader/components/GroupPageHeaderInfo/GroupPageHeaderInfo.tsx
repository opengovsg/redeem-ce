import React from 'react'
import {VStack, Text, HStack, Icon, CSSObject} from '@chakra-ui/react'
import {BiTimeFive, BiBuildingHouse} from 'react-icons/bi'

type GroupPageHeaderInfoProps = {
  campaignName?: string | null
  formattedCampaignExpiresAt: string
  address: string | null
  contentContainerStyle: CSSObject
}

function GroupPageHeaderInfo({
  campaignName,
  formattedCampaignExpiresAt,
  address,
  contentContainerStyle,
}: GroupPageHeaderInfoProps) {
  return (
    <VStack
      sx={contentContainerStyle}
      align='flex-start'
      paddingTop='27px'
      spacing='4px'
    >
      <Text textStyle='h3'>{campaignName}</Text>
      <HStack align='flex-start' id='group-page-expires-at' spacing='8px'>
        <Icon as={BiTimeFive} boxSize='16px' />
        <Text textStyle='body2'>{formattedCampaignExpiresAt}</Text>
      </HStack>
      {address ? (
        <HStack align='flex-start' id='group-page-address' spacing='8px'>
          <Icon as={BiBuildingHouse} boxSize='16px' marginTop='2px' />
          <Text textStyle='body2'>{address}</Text>
        </HStack>
      ) : null}
    </VStack>
  )
}

export default GroupPageHeaderInfo
