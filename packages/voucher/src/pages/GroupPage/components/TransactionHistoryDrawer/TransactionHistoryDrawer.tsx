import React from 'react'
import _ from 'lodash'
import {useTranslation} from 'react-i18next'
import {Drawer, DrawerOverlay, DrawerContent, Text} from '@chakra-ui/react'

// Constants
import {ERROR, LOADING, PENDING, SUCCESS} from 'constants/requests'
import {REFETCH_GROUP_INTERVAL} from 'constants/intervals'

// Hooks
import useFetchTransactionHistoryWithGroupId from 'hooks/useFetchTransactionHistoryWithGroupId'
import TransactionHistoryDrawerContent from './components/TransactionHistoryDrawerContent'
import TransactionHistoryDrawerEmptyContent from './components/TransactionHistoryDrawerEmptyContent'

type TransactionHistoryDrawerProps = {
  isOpen: boolean
  onCloseClick: () => void
  groupId: string
}

function TransactionHistoryDrawer({
  onCloseClick,
  isOpen,
  groupId,
}: TransactionHistoryDrawerProps) {
  const {groupedVoucherEvents, fetchGroupByIdStatus} =
    useFetchTransactionHistoryWithGroupId({
      groupId,
      refetchInterval: REFETCH_GROUP_INTERVAL,
      enabled: isOpen,
    })

  const totalSpent = _.sumBy(groupedVoucherEvents, (event) => {
    return event.data.totalVoucherValue
  })
  const isEmptyTransactionHistory = groupedVoucherEvents?.length === 0

  const {t} = useTranslation('transactionHistory')
  return (
    <Drawer isOpen={isOpen} onClose={onCloseClick} placement='bottom'>
      <DrawerOverlay />
      <DrawerContent overflow='auto' height='90%' background='primary.100'>
        {/* TODO: Proper error screen for fetching transaction history. */}
        {fetchGroupByIdStatus === ERROR && <Text> Placeholder error</Text>}
        {(fetchGroupByIdStatus === LOADING ||
          fetchGroupByIdStatus === PENDING) && (
          <div className='loading-container'>
            <p className='loading-text'>loading...</p>
            <div className='loader' />
          </div>
        )}
        {fetchGroupByIdStatus === SUCCESS &&
          (isEmptyTransactionHistory ? (
            <TransactionHistoryDrawerEmptyContent
              backToHomeText={t('empty.back_to_home')}
              contentText={t('empty.info')}
              headerTitle={t('title')}
              onCloseClick={onCloseClick}
            />
          ) : (
            <TransactionHistoryDrawerContent
              groupedVoucherEvents={groupedVoucherEvents}
              headerTitle={t('title')}
              onCloseClick={onCloseClick}
              totalSpentText={t('content.total_spent')}
              totalSpentAmount={totalSpent}
            />
          ))}
      </DrawerContent>
    </Drawer>
  )
}

export default React.memo(TransactionHistoryDrawer)
