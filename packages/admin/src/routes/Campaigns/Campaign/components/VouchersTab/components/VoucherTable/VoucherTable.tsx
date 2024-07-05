/* eslint-disable react/jsx-props-no-spreading */
// react-table utilizes prop spreading

import React from 'react'
import _ from 'lodash'

import { Box, Flex, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import NextPrevPagination from 'components/NextPrevPagination'
import VoucherRow from './components/VoucherRow'
import VoucherTableEmptyState from './components/VoucherTableEmptyState'
import VoucherTableLoadingRows from './components/VoucherTableLoadingRows'
import VoucherTablePlainText from './components/VoucherTablePlainText'
import { useVouchersTabContext } from '../../VouchersTabContext'
import { TABLE_CONFIG } from './constants'

function VoucherTable() {
  const {
    vouchers,
    isLoading,
    getNextPageOfVouchers,
    getPreviousPageOfVouchers,
    isLoadingNextPage,
    isLoadingPreviousPage,
    currentSearchQuery,
  } = useVouchersTabContext()

  const currentSearchQueryLength = currentSearchQuery.length
  // At length 0, there is a query fired but not for length 1 and 2 but we take all as having empty query string
  const hasSufficientCharsForSearchQuery = !_.inRange(
    currentSearchQueryLength,
    0,
    5
  )
  const isEmptyVoucherReceiptForCampaign =
    currentSearchQueryLength === 0 &&
    vouchers &&
    !vouchers.length &&
    !hasSufficientCharsForSearchQuery
  const isInvalidSearchParams =
    _.inRange(currentSearchQueryLength, 1, 5) &&
    !hasSufficientCharsForSearchQuery
  const isEmptySearchResult =
    currentSearchQueryLength > 2 &&
    vouchers &&
    !vouchers.length &&
    hasSufficientCharsForSearchQuery
  return (
    <>
      <Flex flexDirection="column" minHeight="912px">
        <Table>
          <Thead>
            <Tr>
              {_.map(TABLE_CONFIG, (col, i) => (
                // Disallow last column from expanding
                <Th
                  key={col.key}
                  // TODO fix this optional-chaining
                  // eslint-disable-next-line no-unsafe-optional-chaining
                  width={i === TABLE_CONFIG?.length - 1 ? col.width : 'auto'}
                >
                  <Box width={col.width}>{col.display}</Box>
                </Th>
              ))}
              <Th key="actions" width="4rem">
                <Box width="4rem" />
              </Th>
            </Tr>
          </Thead>
          <Tbody id="vouchers-table-body">
            {!isEmptyVoucherReceiptForCampaign &&
              !isInvalidSearchParams &&
              !isEmptySearchResult &&
              _.map(vouchers, (groupedVoucher) => (
                <VoucherRow
                  key={groupedVoucher.id}
                  groupedVoucher={groupedVoucher}
                  config={TABLE_CONFIG}
                />
              ))}
            {/* Loading state */}
            {isLoading && !vouchers && <VoucherTableLoadingRows />}
          </Tbody>
        </Table>
        {isEmptyVoucherReceiptForCampaign && (
          <VoucherTablePlainText message="No voucher recipient has been added to this campaign" />
        )}
        {isInvalidSearchParams && (
          <VoucherTablePlainText message="Please enter at least 5 characters" />
        )}
        {isEmptySearchResult && <VoucherTableEmptyState />}
      </Flex>
      {!!vouchers?.length && (
        <NextPrevPagination
          onClickNext={getNextPageOfVouchers}
          onClickPrevious={getPreviousPageOfVouchers}
          isLoadingNextPage={isLoadingNextPage}
          isLoadingPreviousPage={isLoadingPreviousPage}
        />
      )}
    </>
  )
}

export default React.memo(VoucherTable)
