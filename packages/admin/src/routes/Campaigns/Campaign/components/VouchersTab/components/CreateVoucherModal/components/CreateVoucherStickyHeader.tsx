import React from 'react'
import { Box, Text, CloseButton, Icon } from '@chakra-ui/react'
import { BiX } from 'react-icons/bi'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'

type CreateVoucherStickyHeader = {
  handleCloseCreateVoucherModal: () => void
}

const CreateVoucherStickyHeader = ({
  handleCloseCreateVoucherModal,
}: CreateVoucherStickyHeader) => {
  const { campaignName } = useCampaignContext()

  return (
    <Box
      position="fixed"
      // this has to be lesser than chakra's drop down menu zindex of 1000
      zIndex={500}
      top="0px"
      left="0"
      justifyContent="flex-end"
      display="flex"
      width="100%"
      height="64px"
      padding="8px 10px"
      background="white"
      borderBottom="1px solid"
      borderBottomColor="neutral.300"
    >
      <Text
        textStyle="subhead3"
        position="absolute"
        top="50%"
        left="50%"
        color="primary.500"
        textTransform="uppercase"
        transform="translate(-50%, -50%)"
      >
        {campaignName}
      </Text>
      <CloseButton
        width="48px"
        height="48px"
        padding="12px"
        onClick={handleCloseCreateVoucherModal}
      >
        <Icon as={BiX} width="100%" height="100%" color="primary.500" />
      </CloseButton>
    </Box>
  )
}

export default CreateVoucherStickyHeader
