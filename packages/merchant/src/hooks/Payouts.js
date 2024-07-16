import { useMemo } from 'react'
import { useQuery } from 'react-query'
import _ from 'lodash'
import moment from 'moment-timezone'

import RedeemApi from 'services/redeem-api'

const PAYOUTS_QUERY_KEY = ['payouts']

export const PAYOUT_STATUS = {
  TO_BE_TRANSFERRED: 'created',
  TRANSFERRING: 'transferring',
  TRANSFERRED: 'transferred',
}

export const MONTH_FORMAT = 'MMMM YYYY'

// This function takes individual payouts and consolidates them into their month representation,
// where each payout is now a summary of the month's payouts
// i.e
// amountInCents - is now the sum of the payouts that are in the same month instead of per payout
// status - PAYOUT_STATUS.TRANSFERRING is added to indicate on the UI that
// it is still subject to change
function groupMonthlyPayouts(payouts) {
  const currentMonth = moment().format(MONTH_FORMAT)
  /**
   * 1. Sorts payouts by descending date
   * 2. Groups payouts by month
   * 3. Formats data to be represented each month
   */
  return _(payouts)
    .orderBy('createdAt', ['desc'])
    .groupBy((payout) => moment(payout.createdAt).format(MONTH_FORMAT))
    .map((payoutGroup, payoutMonth) => {
      // If the payoutMonth is the current month,
      // or at least one payout in the month is not in transferred state,
      // set status as TRANSFERRING, else TRANSFERRED
      const status =
        currentMonth === payoutMonth ||
        !!_.find(
          payoutGroup,
          (payout) => payout.status !== PAYOUT_STATUS.TRANSFERRED,
        )
          ? PAYOUT_STATUS.TRANSFERRING
          : PAYOUT_STATUS.TRANSFERRED
      return {
        date: payoutMonth,
        amountInCents: _.sumBy(payoutGroup, (payout) =>
          _.get(payout, 'amountInCents', 0),
        ),
        status,
      }
    })
    .value()
}

function getTransferredPayouts(payouts) {
  /**
   * 1. Sorts payouts by descending date
   * 2. Filters to only return payouts that are transferred
   */
  return _(payouts)
    .orderBy('createdAt', ['desc'])
    .filter((payout) => payout.status === PAYOUT_STATUS.TRANSFERRED)
    .value()
}

function sumNotTransferredPayouts(payouts) {
  return _(payouts)
    .filter((payout) => payout.status !== PAYOUT_STATUS.TRANSFERRED)
    .sumBy((payout) => _.get(payout, 'amountInCents', 0) / 100)
}

export default function usePayouts() {
  const {
    data: response,
    refetch,
    status,
    isFetching,
    error,
  } = useQuery(PAYOUTS_QUERY_KEY, RedeemApi.fetchPayouts)

  const payouts = _.get(response, 'data', [])

  const transferredPayouts = useMemo(
    () => getTransferredPayouts(payouts),
    [payouts],
  )
  const notTransferredPayoutsSum = useMemo(
    () => sumNotTransferredPayouts(payouts),
    [payouts],
  )
  const monthlyPayouts = useMemo(() => groupMonthlyPayouts(payouts), [payouts])

  return {
    transferredPayouts,
    notTransferredPayoutsSum,
    monthlyPayouts,
    fetchPayouts: refetch,
    fetchPayoutsStatus: status,
    isFetchingPayouts: isFetching,
    fetchPayoutsError: error,
  }
}
