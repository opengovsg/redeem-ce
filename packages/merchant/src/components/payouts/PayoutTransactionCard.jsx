import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text } from '@chakra-ui/react'
import { Badge, BadgeRightIcon } from '@opengovsg/design-system-react'
import { BiTime, BiCheck } from 'react-icons/bi'
import _ from 'lodash'

import CurrencyDisplay from 'components/shared/CurrencyDisplay'

import BREAKPOINTS from 'constants/breakpoints'
import FORMAT from 'constants/format'
import I18N_KEYS from 'constants/i18n-keys'
import { useTranslation } from 'react-i18next'

export const PAYOUT_STATE = {
  TRANSFERRED: {
    name: I18N_KEYS.COMMON.TEXT.TRANSFERRED,
    icon: BiCheck,
    badge: {
      variant: 'solid',
      color: 'green',
    },
  },
  TRANSFERRING: {
    name: I18N_KEYS.COMMON.TEXT.TRANSFERRING,
    icon: BiTime,
    badge: {
      variant: 'subtle',
      color: 'blue',
    },
  },
  TO_BE_TRANSFERRED: {
    name: I18N_KEYS.COMMON.TEXT.TO_BE_TRANSFERRED,
    icon: BiTime,
    badge: {
      variant: 'subtle',
      color: 'blue',
    },
  },
}

const formatCentsToDollars = (amount) => {
  // Amount will always be in cents
  const amountInDollars = amount / 100
  return _.isInteger(amountInDollars)
    ? amountInDollars
    : amountInDollars.toFixed(FORMAT.CURRENCY.AMOUNT_DIGITS)
}

const PayoutTransactionCard = ({ state, date, id, amount, hideDivider }) => {
  const { t } = useTranslation(I18N_KEYS.COMMON.KEY)

  return (
    <Flex
      justifyContent='space-between'
      alignItems='center'
      borderTop={hideDivider ? '' : '1px solid #EEEEEE'}
      paddingX={BREAKPOINTS.HORIZONTAL_RESPONSIVE.PADDING_X}
    >
      <Flex
        flexDir='column'
        paddingY={4}
        gap={2}
      >
        <Badge
          variant={state.badge.variant}
          colorScheme={state.badge.color}
        >
          {t(state.name)} <BadgeRightIcon as={state.icon} />
        </Badge>

        <Flex flexDir='column'>
          {date && <Text textStyle='subhead-1'>{date}</Text>}
          {id && <Text textStyle='caption-2'> {id}</Text>}
        </Flex>
      </Flex>
      <CurrencyDisplay value={formatCentsToDollars(amount)} />
    </Flex>
  )
}

PayoutTransactionCard.propTypes = {
  state: PropTypes.oneOf(_.values(PAYOUT_STATE)),
  date: PropTypes.string,
  id: PropTypes.string,
  amount: PropTypes.number,
  hideDivider: PropTypes.bool,
}

export default PayoutTransactionCard
