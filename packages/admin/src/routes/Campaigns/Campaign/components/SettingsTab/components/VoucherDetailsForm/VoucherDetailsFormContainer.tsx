import React from 'react'
import { Text, HStack } from '@chakra-ui/react'
import VoucherDetailsForm from './VoucherDetailsForm'

const VoucherDetailsFormContainer = () => {
  return (
    <HStack align="start" padding={8}>
      <Text textStyle="h4" width="30%" color="neutral.800">
        Voucher Details
      </Text>
      <VoucherDetailsForm />
    </HStack>
  )
}

export default VoucherDetailsFormContainer
