import React from 'react'
import _ from 'lodash'
import {DrawerBody, StackDivider, VStack} from '@chakra-ui/react'

// General Components
import DrawerHeaderWithCloseButton from '../../DrawerHeaderWithCloseButton'
import TransactionHistorySubHeader from './TransactionHistorySubHeader'
import TransactionHistoryListing from './TransactionHistoryListing'

// Utility
import moment from 'moment-timezone'
import {GroupedVoucherEvent} from 'types/voucher'
moment.tz.setDefault('Asia/Singapore')
function makeTimestampReadable(timestamp: string): string {
  return moment(timestamp).format('Do MMM YYYY, LT')
}

type TransactionHistoryDrawerContentProps = {
  groupedVoucherEvents: GroupedVoucherEvent[] | undefined
  headerTitle: string
  onCloseClick: () => void
  totalSpentText: string
  totalSpentAmount: number
}

const TransactionHistoryDrawerContent = ({
  groupedVoucherEvents,
  headerTitle,
  onCloseClick,
  totalSpentText,
  totalSpentAmount,
}: TransactionHistoryDrawerContentProps) => {
  return (
    <>
      {/* We want this drawer header to be sticky, so we have it ontop of DrawerBody. */}
      <DrawerHeaderWithCloseButton
        title={headerTitle}
        backgroundColor='neutral.100'
        closeActiveColor='neutral.200'
        onCloseClick={onCloseClick}
        closeButtonId='transaction-history-close-button'
      />
      {/* DrawerBody comes with auto padding of 24px on top and bottom which we don't want. */}
      <DrawerBody paddingTop='0' paddingBottom='0'>
        <VStack align='stretch' maxWidth='512px' margin='0 auto' spacing='0'>
          <TransactionHistorySubHeader
            totalSpentText={totalSpentText}
            totalSpentAmount={totalSpentAmount}
          />
          <VStack
            align='stretch'
            maxWidth='512px'
            margin='0 auto'
            divider={<StackDivider borderColor='neutral.200' />}
            id='content-transaction-history-container'
            spacing='0'
          >
            {_.map(groupedVoucherEvents, (event) => (
              <TransactionHistoryListing
                key={event.id}
                merchantShopName={event.data.merchantShopName}
                timestamp={makeTimestampReadable(event.createdAt)}
                amountSpent={event.data.totalVoucherValue}
                transactionId={event.data.transactionId}
              />
            ))}
          </VStack>
        </VStack>
      </DrawerBody>
    </>
  )
}

export default React.memo(TransactionHistoryDrawerContent)
