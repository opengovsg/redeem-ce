import {Button, HStack, Icon, Text} from '@chakra-ui/react'
import {DDAction} from 'constants/datadog'
import {useTranslation} from 'react-i18next'
import {BiHistory} from 'react-icons/bi'

type TransactionHistoryListingProps = {
  onClickHistoryButton: () => void
}

const TransactionHistoryDrawerButton = ({
  onClickHistoryButton,
}: TransactionHistoryListingProps) => {
  const {t} = useTranslation('transactionHistory')
  return (
    <Button
      padding='8px'
      background='transparent'
      _hover={{bg: 'neutral.200'}}
      _active={{bg: 'neutral.200'}}
      data-dd-action-name={DDAction.TRANSACTION_HISTORY_BUTTON}
      id='transaction-history-button'
      onClick={onClickHistoryButton}
    >
      <HStack spacing='4px'>
        <Icon as={BiHistory} width='20px' height='20px' color='neutral.700' />
        <Text
          textStyle='subhead2'
          color='neutral.700'
          textDecoration='underline'
          whiteSpace='break-spaces'
        >
          {t('title')}
        </Text>
      </HStack>
    </Button>
  )
}

export default TransactionHistoryDrawerButton
