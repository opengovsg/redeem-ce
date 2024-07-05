import React from 'react'
import { Text } from '@chakra-ui/react'

interface VoucherTablePlainText {
  message: string
}

const VoucherTablePlainText = ({ message }: VoucherTablePlainText) => {
  return (
    <Text
      textStyle="subhead1"
      alignSelf="center"
      margin="28px"
      color="neutral.800"
      id="voucher-table-plain-text"
    >
      {message}
    </Text>
  )
}

export default VoucherTablePlainText
