import React from 'react'
import {BiRightArrowAlt} from 'react-icons/bi'
import {
  DrawerBody,
  Image,
  VStack,
  Text,
  Icon,
  HStack,
  Button,
  Center,
} from '@chakra-ui/react'
import emptyTransactionHistory from 'images/empty-transaction-history.svg'

// General Components
import DrawerHeaderWithCloseButton from '../../DrawerHeaderWithCloseButton'

type TransactionHistoryDrawerEmptyContentProps = {
  backToHomeText: string
  contentText: string
  headerTitle: string
  onCloseClick: () => void
}

const TransactionHistoryDrawerEmptyContent = ({
  backToHomeText,
  contentText,
  headerTitle,
  onCloseClick,
}: TransactionHistoryDrawerEmptyContentProps) => {
  return (
    <>
      <DrawerHeaderWithCloseButton
        title={headerTitle}
        backgroundColor='neutral.100'
        closeButtonId='transaction-history-close-button'
      />
      <DrawerBody
        paddingTop='0'
        paddingBottom='0'
        backgroundColor='neutral.100'
      >
        <VStack
          align='stretch'
          justify='space-between'
          maxWidth='512px'
          height='100%'
          margin='0 auto'
          paddingBottom='24px'
          id='empty-transaction-history-container'
          paddingX='24px'
          spacing='0'
        >
          <Center flexGrow={1}>
            <VStack spacing='24px'>
              <Image
                alt='Empty Transaction History'
                src={emptyTransactionHistory}
              />
              <Text textStyle='h5' color='primary.500' textAlign='center'>
                {contentText}
              </Text>
            </VStack>
          </Center>
          <Button padding='16px' onClick={onCloseClick}>
            <HStack spacing='14px'>
              <Text>{backToHomeText}</Text>
              <Icon as={BiRightArrowAlt} boxSize='16px' />
            </HStack>
          </Button>
        </VStack>
      </DrawerBody>
    </>
  )
}

export default React.memo(TransactionHistoryDrawerEmptyContent)
