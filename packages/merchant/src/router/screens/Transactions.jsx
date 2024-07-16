import React, { useState, useMemo, useEffect } from 'react'
import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import { Tab, Tabs, Button } from '@opengovsg/design-system-react'
import { BiDownload } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'

import TitleValueCard from 'components/shared/TitleValueCard'
import MainHeader from 'components/shared/MainHeader'
import DayTransactionCard from 'components/transactions/DayTransactionCard'

import useSession from 'hooks/Session'
import useLatestTransactions, {
  useSectionalizeTransactions,
  useTransactionsTotal,
} from 'hooks/Transactions'

import { TRANSACTIONS } from 'constants/api'
import BREAKPOINTS from 'constants/breakpoints'
import I18N_KEYS from 'constants/i18n-keys'

const Transactions = () => {
  const navigate = useNavigate()
  if (false) navigate()

  // ui states
  const { KEY, TEXT } = I18N_KEYS.TRANSACTIONS
  const { t } = useTranslation(KEY)

  const [tabIndex, setTabIndex] = useState(0)
  const isShopView = tabIndex === 0

  // transactions api logic
  const {
    session: { user, userName },
  } = useSession()
  const {
    merchantTotalForCurrentDate: shopTransactionsValueToday,
    verifierTotalForCurrentDate: userTransactionsValueToday,
    fetchTransactionsTotal,
  } = useTransactionsTotal()

  // Transactions returned from useTransactions are fetched per session merchantId (i.e. shop)
  const { transactions: shopTransactions, fetchTransactions } =
    useLatestTransactions()

  // get data every initial render for now
  // TODO: optimise
  useEffect(() => {
    fetchTransactions()
    fetchTransactionsTotal()
  }, [])

  const userTransactions = useMemo(
    () =>
      _.filter(
        shopTransactions,
        (transaction) => user.id === transaction.verifierId,
      ),
    [shopTransactions],
  )

  // const transactionsInView = isShopView ? shopTransactions : userTransactions
  // const hasNoTransactions = _.isEmpty(transactionsInView)

  const shopSectionalizedTransactions =
    useSectionalizeTransactions(shopTransactions)
  const userSectionalizedTransactions =
    useSectionalizeTransactions(userTransactions)
  const sectionsToRender = isShopView
    ? shopSectionalizedTransactions
    : userSectionalizedTransactions

  return (
    <Box
      flexGrow={1}
      overflow='scroll'
    >
      <MainHeader
        headerText={t(TEXT.HEADER_LABEL)}
        bgOverlapSize={12}
        userName={userName}
        bgShouldOverlap
      >
        <Flex
          marginTop={4}
          marginBottom={2}
          justifyContent='space-between'
          alignItems='center'
        >
          <Tabs
            display='flex'
            gap={6}
            colorScheme='white'
            onChange={(index) => setTabIndex(index)}
          >
            <Tab>{t(TEXT.SHOP_TAB)}</Tab>
            <Tab>{t(TEXT.USER_TAB)}</Tab>
          </Tabs>
          <IconButton
            fontSize={24}
            boxSize={12}
            icon={<BiDownload />}
          />
        </Flex>
      </MainHeader>
      <Flex
        paddingX={BREAKPOINTS.HORIZONTAL_RESPONSIVE.PADDING_X}
        paddingBottom={4}
        flexDir='column'
        gap={4}
      >
        <TitleValueCard
          title={
            isShopView ? t(TEXT.HEADER_SHOP_CARD) : t(TEXT.HEADER_USER_CARD)
          }
          value={
            isShopView ? shopTransactionsValueToday : userTransactionsValueToday
          }
        />
        {sectionsToRender.map(({ key, totalValue, data }) => (
          <DayTransactionCard
            key={key}
            title={key}
            voucherTotal={totalValue}
            transactions={data}
          />
        ))}
        <Flex
          flexDir='column'
          textAlign='center'
          padding={2}
          gap={4}
        >
          <Text textStyle='caption-1'>
            {t(TEXT.FOOTER_START)}
            {` ${TRANSACTIONS.DEFAULT_FETCH_LIMIT} `}
            {t(TEXT.FOOTER_END)}
          </Text>
          <Text textStyle='caption-2'>
            {t(TEXT.FOOTER_EXPLANATION)}
            <Button
              variant='link'
              textDecoration='underline'
              color='neutral.500'
              fontSize={12}
            >
              {t(TEXT.DOWNLOAD_PROMPT)}
            </Button>
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Transactions
