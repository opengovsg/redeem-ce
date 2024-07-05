import React from 'react'
import { IoMdInformationCircle } from 'react-icons/io'
import { Alert, Box, HStack, Icon, Text } from '@chakra-ui/react'

function NonProdWarningBanner(): JSX.Element {
  return (
    <Alert backgroundColor="#FADF52">
      <HStack align="start" flex="1">
        <Box>
          <Icon as={IoMdInformationCircle} color="standard.black" />
        </Box>
        <Text color="standard.black" variant="body1">
          <b>This is a test site used for training.</b> Vouchers created are not
          valid and cannot be used.
        </Text>
      </HStack>
    </Alert>
  )
}

export default NonProdWarningBanner
