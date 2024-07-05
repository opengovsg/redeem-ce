import React from 'react'
import { Text } from '@chakra-ui/react'
import { getLabelForVoucherType } from 'helpers/vouchers'
import _ from 'lodash'

type VoucherEventLabelProps = {
  // TODO: Refactor use of any
  event: any
  group: any
}

type EventDisplay = {
  subject: string
  verb?: string
  object?: string
}

function getRecipientName(group: any) {
  return group.name || 'Recipient'
}

function getEventDisplay(event: any, group: any): EventDisplay {
  switch (event.event) {
    case 'grouped_voucher_send':
      return {
        subject: 'Admin',
        verb: 'sent',
        object: 'digital vouchers via SMS',
      }
    case 'grouped_voucher_create':
      return {
        subject: getRecipientName(group || 'Recipient'),
        verb: 'claimed',
        object: 'vouchers via admin',
      }
    case 'grouped_voucher_bulk_create':
      return {
        subject: getRecipientName(group || 'Recipient'),
        verb: 'created',
        object: 'via admin bulk create',
      }
    case 'grouped_voucher_print': {
      // Default info to display
      const voucherDisplay = {
        subject: 'Admin',
        verb: 'printed',
        object: 'paper vouchers',
      }

      const voucherInfo = event.data?.voucherInfoByType
      // Add printed voucher value only when available (backwards compatibility)
      if (voucherInfo) {
        const totalValue = _.sumBy(voucherInfo, 'totalValue')
        voucherDisplay.object = `$${totalValue} paper vouchers`
      }

      return voucherDisplay
    }
    case 'grouped_voucher_edit':
      return {
        subject: 'Admin',
        verb: `edited ${getRecipientName(group)}'s`,
        object: 'voucher recipient details',
      }
    case 'grouped_voucher_redemption':
      return {
        subject: getRecipientName(group),
        verb: 'redeemed',
        object: `$${event.data.totalVoucherValue}${
          event.data.voucherType
            ? ` (${getLabelForVoucherType(event.data.voucherType)})`
            : ' vouchers'
        }`,
      }
    case 'grouped_voucher_void':
      return {
        subject: 'Admin',
        verb: 'void',
        object: `$${event.data.voidedAmount} vouchers`,
      }
    default:
      return {
        subject: 'User',
      }
  }
}

const VoucherEventLabel: React.FC<VoucherEventLabelProps> = ({
  event,
  group,
}) => {
  const display = getEventDisplay(event, group)
  return (
    <>
      <Text
        as="span"
        textStyle="subhead1"
        display="inline"
        color="neutral.800"
        whiteSpace="pre-wrap"
      >
        {`${display.subject} `}
      </Text>
      <Text as="span" textStyle="body1" display="inline" color="neutral.800">
        {`${display.verb} `}
        <Text as="span" textStyle="subhead1" color="primary.500">
          {display.object}
        </Text>
      </Text>
    </>
  )
}

export default VoucherEventLabel
