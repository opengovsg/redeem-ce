import {HStack, Text, VStack} from '@chakra-ui/react'

type TransactionHistoryListingProps = {
  merchantShopName: string
  timestamp: string
  amountSpent: number
  transactionId?: string
}

const TransactionHistoryListing = ({
  merchantShopName,
  timestamp,
  amountSpent,
  transactionId,
}: TransactionHistoryListingProps) => {
  return (
    <HStack
      justify='space-between'
      backgroundColor='white'
      paddingX='24px'
      paddingY='16px'
    >
      <VStack align='flex-start' spacing='4px'>
        <Text textStyle='subhead2' color='neutral.800'>
          {merchantShopName}
        </Text>
        <Text textStyle='body2' color='neutral.700'>
          {timestamp}
        </Text>
        <Text textStyle='legal' color='neutral.600'>
          {transactionId}
        </Text>
      </VStack>
      <HStack spacing='2px'>
        <Text textStyle='subhead2' color='neutral.800'>
          $
        </Text>
        <Text textStyle='h2' color='neutral.800'>
          {amountSpent}
        </Text>
      </HStack>
    </HStack>
  )
}

export default TransactionHistoryListing
