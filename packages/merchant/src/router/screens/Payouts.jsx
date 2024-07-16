import React, { useEffect, useState } from 'react'
import { Box, Flex, Tab } from '@chakra-ui/react'
import { Tabs } from '@opengovsg/design-system-react'
import moment from 'moment-timezone'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'

import MainHeader from 'components/shared/MainHeader'
import PendingTransferCard from 'components/payouts/PendingTransferCard'
import PayoutInfoCard from 'components/payouts/PayoutInfoCard'
import PayoutTransactionCard, {
  PAYOUT_STATE,
} from 'components/payouts/PayoutTransactionCard'

import usePayouts from 'hooks/Payouts'
import { useTransactionsTotal } from 'hooks/Transactions'
import useSession from 'hooks/Session'

import FORMAT from 'constants/format'
import I18N_KEYS from 'constants/i18n-keys'

const Payouts = () => {
  // ui states
  const { KEY, TEXT } = I18N_KEYS.PAYOUTS
  const { t } = useTranslation(KEY)

  const [tabIndex, setTabIndex] = useState(0)
  const isMonthlyView = tabIndex === 1

  // logic
  const {
    session: { merchantName, merchantBankDetails },
  } = useSession()
  const {
    transferredPayouts,
    notTransferredPayoutsSum,
    monthlyPayouts,
    fetchPayouts,
  } = usePayouts()
  const { noPayoutTotal: transactionsValueToBeTransferred } =
    useTransactionsTotal()
  const payoutsToRender = isMonthlyView ? monthlyPayouts : transferredPayouts
  const valueToBeTransferred =
    transactionsValueToBeTransferred + notTransferredPayoutsSum

  // TODO: improve fetching
  useEffect(() => {
    fetchPayouts()
  }, [])

  return (
    <Box
      flexGrow={1}
      overflow='scroll'
    >
      <MainHeader
        headerText={t(TEXT.HEADER)}
        merchantName={merchantName}
        bankDetails={merchantBankDetails}
        bgOverlapSize={0}
      >
        <Flex
          marginY={4}
          flexDir='column'
          gap={4}
        >
          <PendingTransferCard amountPendingTransfer={valueToBeTransferred} />
          <PayoutInfoCard />
          <Tabs
            display='flex'
            gap={6}
            colorScheme='white'
            onChange={(index) => setTabIndex(index)}
          >
            <Tab>{t(TEXT.DAILY_TAB)}</Tab>
            <Tab>{t(TEXT.MONTHLY_TAB)}</Tab>
          </Tabs>
        </Flex>
      </MainHeader>
      <Flex
        h='100%'
        flexDir='column'
      >
        {payoutsToRender.map((item) => {
          const { id, date, amountInCents, status } = item

          // Monthly payout is consolidated on-device to the month and an additional date
          // property attached, representing the payout month instead of individual payout
          // timestamps.
          // Hence, use date if monthly view, else individual timestamps
          const displayDate = isMonthlyView
            ? date
            : moment(_.get(item, 'transferredTimestamp')).format(
                FORMAT.TIMESTAMP.DAY_FORMAT,
              )

          // Do not pass id for monthly payout view since it's consolidated and not
          // individual payouts
          const displayId = isMonthlyView ? undefined : id

          return (
            <PayoutTransactionCard
              key={id}
              date={displayDate}
              amount={amountInCents}
              id={displayId}
              state={_.get(PAYOUT_STATE, status.toUpperCase())}
            />
          )
        })}
      </Flex>
    </Box>
  )
}

export default Payouts
