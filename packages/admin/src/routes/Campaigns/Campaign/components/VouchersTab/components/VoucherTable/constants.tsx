import React from 'react'
import _ from 'lodash'
import { VOUCHER_STATE } from 'constants/vouchers'
import { getAddressFromGroup } from 'helpers/utils'
import { VoucherType } from 'services/RedeemApi/types'
import GroupContactCellBody from './components/GroupContactCellBody'
import GroupRecipientIdCellBody from './components/GroupRecipientIdCellBody'

const getVoucherValueLeft = (group: VoucherType) => {
  return _(group.vouchers)
    .filter((voucher) => voucher.state === VOUCHER_STATE.UNUSED)
    .sumBy((voucher) => voucher.voucherValue)
}

export const TABLE_CONFIG = [
  {
    display: 'Name',
    key: 'name',
    headerFn: (group: VoucherType) => group.name || '-',
    // eslint-disable-next-line react/display-name
    bodyFn: (group: VoucherType) => <GroupRecipientIdCellBody group={group} />,
    width: '10rem',
    hideOnHover: false,
  },
  {
    display: 'Contact details',
    key: 'contact',
    width: '25rem',
    headerFn: (group: VoucherType) => getAddressFromGroup(group) || '-',
    bodyFn: (group: VoucherType) => <GroupContactCellBody group={group} />,
    hideOnHover: false,
  },
  // {
  //   display: 'Last activity',
  //   key: 'lastAction',
  //   width: '9.25rem',
  //   headerFn: () => '',
  //   bodyFn: () => '',
  // },
  {
    display: 'Value left',
    key: 'remaining value',
    width: '6rem',
    headerFn: (group: VoucherType) =>
      `$${getVoucherValueLeft(group) || '0'} left`,
    bodyFn: () => '',
    hideOnHover: true,
  },
] as const
