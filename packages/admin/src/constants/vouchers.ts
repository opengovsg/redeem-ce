import React from 'react'
import { ReactComponent as regularLogo } from '../img/regular-logo.svg'
import { ReactComponent as supermarketLogo } from '../img/supermarket-logo.svg'

export const VOUCHER_QR_PREFIX = 'rsg'

export const VOUCHER_STATE = {
  REDEEMED: 'redeemed',
  VOIDED: 'voided',
  UNUSED: 'unused',
}

export const PRINTABLE_VOUCHERS_PER_PAGE = 8
// Have to be accounted for in children so that we can place the supermarket
// logo in the bottom right corner
export const PRINTABLE_VOUCHERS_CONTENT_PADDING_X = '20px'
export const PRINTABLE_VOUCHERS_CONTENT_PADDING_Y = '14px'

const VOUCHER_TYPE_SUPERMARKET = 'supermarket'
const VOUCHER_TYPE_REGULAR = 'regular'
export const VOUCHER_TYPES: Record<
  string,
  { isLargeLogoVisible: boolean; logo: React.FunctionComponent; label: string }
> = {
  [VOUCHER_TYPE_SUPERMARKET]: {
    isLargeLogoVisible: true,
    logo: supermarketLogo,
    label: 'Supermarket Vouchers',
  },
  [VOUCHER_TYPE_REGULAR]: {
    isLargeLogoVisible: false,
    logo: regularLogo,
    label: 'Vouchers',
  },
}
