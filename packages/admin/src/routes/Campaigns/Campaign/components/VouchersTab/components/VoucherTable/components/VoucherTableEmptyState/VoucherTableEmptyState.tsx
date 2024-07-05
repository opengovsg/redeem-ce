import { Text, VStack, Image } from '@chakra-ui/react'
import React from 'react'
import searchNotFound from 'img/search-not-found.svg'

type VoucherTableEmptyStateProps = Record<string, never>

const VoucherTableEmptyState: React.FC<VoucherTableEmptyStateProps> = () => {
  return (
    <VStack
      align="start"
      width="512px"
      marginLeft="248px"
      marginY="48px"
      spacing="16px"
    >
      <Image alt="not found" src={searchNotFound} />
      <Text textStyle="h3" color="neutral.900">
        No results found
      </Text>
      <Text textStyle="subhead1" color="neutral.800">
        Check if you have keyed in the recipient’s details correctly.
        <br />
        <br />
        If everything looks right but you are still unable to find the
        recipient, it might mean that the recipient has not claimed the voucher.
      </Text>
    </VStack>
  )
}

export default VoucherTableEmptyState
