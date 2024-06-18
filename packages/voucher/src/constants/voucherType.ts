import vouchersLogo from 'images/vouchers.svg'
import supermarketVouchersLogo from 'images/supermarket-vouchers.svg'

export type VoucherTypeConfigObject = {
  id: string
  src: string
  text: string
}

type VoucherTypeConfig = {
  [key: string]: VoucherTypeConfigObject
}

export const VOUCHER_TYPE_CONFIG: VoucherTypeConfig = {
  regular: {
    id: 'vouchers-button',
    src: vouchersLogo,
    text: 'Vouchers',
  },
  supermarket: {
    id: 'supermarket-vouchers-button',
    src: supermarketVouchersLogo,
    text: 'Supermarket Vouchers',
  },
}
