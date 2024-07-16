import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Flex, Text } from '@chakra-ui/react'
import CurrencyDisplay from 'components/shared/CurrencyDisplay'
import IconTextRow, { ICON_TYPE } from 'components/shared/IconTextRow'
import { Button } from '@opengovsg/design-system-react'
import { BiChevronDown } from 'react-icons/bi'
import moment from 'moment-timezone'
import { useTranslation } from 'react-i18next'

import FORMAT from 'constants/format'
import { TRANSACTIONS } from 'constants/api'
import I18N_KEYS from 'constants/i18n-keys'

const TransactionFragment = ({ time, voucherId, amount, hideDivider }) => (
  <Flex
    h='64px'
    paddingX={4}
    alignItems='center'
    justifyContent='space-between'
    borderTop={hideDivider ? '' : '1px solid #EEEEEE'}
    color='gray'
  >
    <Flex flexDir='column'>
      <Text textStyle='subhead-2'>
        {moment(time).format(FORMAT.TIMESTAMP.TRANSACTION)}
      </Text>
      <IconTextRow
        iconType={ICON_TYPE.VOUCHER}
        text={voucherId.replace('transaction_', '')}
        fontSize={10}
        style={{
          gap: '4px',
        }}
      />
    </Flex>
    <CurrencyDisplay
      signSize={12}
      valueSize={20}
      value={amount}
    />
  </Flex>
)

TransactionFragment.propTypes = {
  time: PropTypes.string,
  voucherId: PropTypes.string,
  amount: PropTypes.number,
  hideDivider: PropTypes.bool,
}

const DayTransactionCard = ({ title, voucherTotal, transactions }) => {
  const { KEY, TEXT } = I18N_KEYS.TRANSACTIONS
  const { t } = useTranslation(KEY)

  const shouldFold = transactions.length > TRANSACTIONS.PAGINATE_LIMIT
  const [folded, setFolded] = useState(shouldFold)
  const foldedTransactions = useMemo(
    () => transactions.slice(0, TRANSACTIONS.PAGINATE_LIMIT),
    [transactions],
  )

  return (
    <Flex
      flexDir='column'
      paddingTop={4}
      backgroundColor='white'
      shadow='sm'
      overflow='hidden'
    >
      <Flex
        h='50px'
        marginX={4}
        alignItems='center'
        justifyContent='space-between'
        borderBottom='1px dashed #BCBFE3'
      >
        <Text textStyle='subhead-1'>{title}</Text>
        <CurrencyDisplay
          signSize={14}
          valueSize={28}
          value={voucherTotal}
        />
      </Flex>
      {transactions &&
        (folded ? foldedTransactions : transactions).map(
          ({ updatedAt, id, value }, i) => (
            <TransactionFragment
              time={updatedAt}
              voucherId={id}
              amount={value}
              hideDivider={i === 0}
              key={id}
            />
          ),
        )}
      {shouldFold && (
        <Button
          display='flex'
          justifyContent='left'
          borderRadius={0}
          paddingY={6}
          variant='clear'
          colorScheme='neutral'
          color='#505798'
          fontSize={14}
          fontWeight='500'
          textStyle='subhead-2'
          borderTop='1px solid #EEEEEE'
          rightIcon={<BiChevronDown size={12} />}
          iconSpacing={1}
          onClick={() => {
            setFolded((s) => !s)
          }}
        >
          {folded
            ? `${t(TEXT.SHOW_ALL_TRANSACTIONS)} (${
                transactions.length - TRANSACTIONS.PAGINATE_LIMIT
              })`
            : t(TEXT.SHOW_LESS_TRANSACTIONS)}
        </Button>
      )}
    </Flex>
  )
}

DayTransactionCard.propTypes = {
  title: PropTypes.string,
  voucherTotal: PropTypes.number,
  transactions: PropTypes.arrayOf(
    PropTypes.shape(TransactionFragment.propTypes),
  ),
}

export default DayTransactionCard
