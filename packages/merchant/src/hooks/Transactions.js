import bluebird from 'bluebird'
import { useMemo } from 'react'
import _ from 'lodash'
import moment from 'moment-timezone'
import { useQuery } from 'react-query'

import RedeemApi from 'services/redeem-api'

import { TRANSACTIONS } from 'constants/api'

export const TRANSACTIONS_QUERY_KEY = ['transactions']

const ALL_TRANSACTIONS_QUERY_KEY = 'all_transactions'
const TRANSACTIONS_TOTAL_QUERY_KEY = ['transactions_total']

export default function useLatestTransactions() {
  const {
    data: response,
    refetch,
    status,
    isFetching,
    error,
  } = useQuery(TRANSACTIONS_QUERY_KEY, () =>
    RedeemApi.fetchLatestTransactions(TRANSACTIONS.DEFAULT_FETCH_LIMIT),
  )

  const transactions = _.get(response, 'data', [])

  return {
    transactions,
    fetchTransactions: refetch,
    fetchTransactionsStatus: status,
    isFetchingTransactions: isFetching,
    fetchTransactionsError: error,
  }
}

// Groups the transactions by date, returning an array of grouped transactions,
// sorted in descending order, which means most recent transaction comes first:
// [
//   {
//     title: timestampB,
//     data: [transaction1, transaction2]
//   },
//   {
//     title: timestampA,
//     data: [transaction3, transaction4]
//   }
// ]
// const TRANSACTION_SECTION_DATE_FORMAT = {
//   sameDay: `[Today], ${FULL_DATE_FORMAT}`,
//   nextDay: '[Tomorrow]',
//   nextWeek: FULL_DATE_FORMAT,
//   lastDay: `[Yesterday], ${FULL_DATE_FORMAT}`,
//   lastWeek: `[Last] dddd, ${FULL_DATE_FORMAT}`,
//   sameElse: FULL_DATE_FORMAT,
// }

// This full date format displays eg. 9 August 2021
const FULL_DATE_FORMAT = 'D MMMM YYYY'

function sectionaliseTransactions(transactions) {
  // 1. Sort all transactions by descending order
  // 2. Group them by their dates
  // 3. Map each group to format their date grouping into formatted date strings
  //    with their respective data
  return _(transactions)
    .orderBy('createdAt', ['desc'])
    .groupBy((transaction) =>
      moment(transaction.createdAt).format('YYYY-MM-DD'),
    )
    .map((transactionGroup, transactionGroupDate) => ({
      key: moment(transactionGroupDate).format(FULL_DATE_FORMAT),
      totalValue: _.reduce(
        transactionGroup,
        (sum, transaction) => sum + transaction.value,
        0,
      ),
      data: transactionGroup,
    }))
    .value()
}

export function useSectionalizeTransactions(transactions) {
  return useMemo(() => sectionaliseTransactions(transactions), [transactions])
}

// Unlike fetchLatestTransactions which fetches only the latest x number, this one fetches
// all in multiple paginated api calls, with query strings start and end to filter the data down.
// It starts out in an enabled false which means no auto refetches
// This min delay for promise resolve is added otherwise the UI for downloading can be too jarring
const MINIMUM_DELAY_FOR_FETCH = 1000
// This retry config is below the default of 3 as it seems too long before an error is thrown,
// coupled with exponential backoff behavior
const FETCH_ALL_TRANSACTIONS_RETRIES = 2
export function useAllTransactions({ start, end, ...options }) {
  const {
    data: transactions,
    refetch,
    status,
    isFetching,
    error,
  } = useQuery(
    [ALL_TRANSACTIONS_QUERY_KEY, start, end],
    () =>
      bluebird.delay(MINIMUM_DELAY_FOR_FETCH).then(async () => {
        // Repeatedly call paginated endpoint /transactions until all transactions are fetched
        let allTransactions = []
        let hasNextPage
        let after

        do {
          // eslint-disable-next-line no-await-in-loop
          const { data, pageInfo } = await RedeemApi.fetchAllTransactions({
            start,
            end,
            after,
          })

          // Accumulate transaction data
          allTransactions = allTransactions.concat(data)

          // Update hasNextPage and after param with endCursor
          hasNextPage = pageInfo.hasNextPage
          after = pageInfo.endCursor
        } while (hasNextPage)

        return allTransactions
      }),
    {
      enabled: false,
      retry: FETCH_ALL_TRANSACTIONS_RETRIES,
      ...options,
    },
  )

  return {
    transactions,
    fetchTransactions: () =>
      refetch({ throwOnError: true, cancelRefetch: true }),
    fetchTransactionsStatus: status,
    isFetchingTransactions: isFetching,
    fetchTransactionsError: error,
  }
}

export function useTransactionsTotal() {
  const {
    data: response,
    refetch,
    status,
    isFetching,
    error,
  } = useQuery(TRANSACTIONS_TOTAL_QUERY_KEY, RedeemApi.fetchTransactionsTotal)

  const {
    merchantTotalForCurrentDate,
    verifierTotalForCurrentDate,
    noPayoutTotal,
  } = response || {}

  return {
    transactionsTotal: response,
    merchantTotalForCurrentDate,
    verifierTotalForCurrentDate,
    noPayoutTotal,
    fetchTransactionsTotal: refetch,
    fetchTransactionsTotalStatus: status,
    isFetchingTransactionsTotal: isFetching,
    fetchTransactionsTotalError: error,
  }
}
