import {HStack, Text} from '@chakra-ui/react'

type TransactionHistorySubHeaderProps = {
  totalSpentText: string
  totalSpentAmount: number
}

const TransactionHistorySubHeader = ({
  totalSpentText,
  totalSpentAmount,
}: TransactionHistorySubHeaderProps) => {
  return (
    <HStack
      justify='space-between'
      width='100%'
      backgroundColor='primary.200'
      paddingX='24px'
      paddingY='8px'
    >
      <Text textStyle='subhead1' color='primary.700'>
        {totalSpentText}
      </Text>
      <HStack spacing='2px'>
        <Text textStyle='caption1' color='primary.700'>
          $
        </Text>
        <Text textStyle='h2' color='primary.700'>
          {totalSpentAmount}
        </Text>
      </HStack>
    </HStack>
  )
}

export default TransactionHistorySubHeader
