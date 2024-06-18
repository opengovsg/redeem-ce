import {
  VoucherTypeConfigObject,
  VOUCHER_TYPE_CONFIG,
} from 'constants/voucherType'
import {capitalCase} from 'capital-case'
import vouchersLogo from 'images/vouchers.svg'
import _ from 'lodash'
import moment from 'moment-timezone'
import {Voucher, VoucherColorScheme, VouchersState} from 'types/voucher'

export const getVouchersTotalValue = (vouchers: Voucher[]): number => {
  return _(vouchers).sumBy((voucher) => voucher.voucherValue)
}

export const getVouchersAmountLeft = (vouchers: Voucher[]): number => {
  return getVouchersTotalValue(
    vouchers.filter((voucher) => voucher.state === 'unused'),
  )
}

export const getHasVoidedVoucher = (vouchers: Voucher[]): boolean => {
  return _.some(vouchers, (voucher) => voucher.state === 'voided')
}

export const getLastRedeemedTimestamp = (
  vouchers: Voucher[],
): moment.Moment | undefined => {
  const timestamps = _(vouchers)
    .map((voucher) => voucher.lastRedeemedTimestamp)
    .compact()
    .map((vouchers) => moment(vouchers))
    .value()
  const ascTimestamps = timestamps.sort((a, b) => a.diff(b))

  return _.head(ascTimestamps)
}

export const getTransactionId = (vouchers: Voucher[]): string | undefined => {
  const transactionId = _(vouchers)
    .map((voucher) => voucher.transactionId)
    .compact()
    .uniq()
    .value()

  if (transactionId.length > 1) {
    return 'Multiple Transaction Ids'
  }

  return _.head(transactionId)
}

export const getRedeemedMerchantName = (
  vouchers: Voucher[],
): string | undefined => {
  const merchantNames = _(vouchers)
    .map((voucher) => voucher.merchantName)
    .compact()
    .uniq()
    .value()

  if (merchantNames.length > 1) {
    return 'Multiple Merchants'
  }

  return _.head(merchantNames)
}

export const getVouchersState = (vouchers: Voucher[]): VouchersState => {
  const states = _(vouchers)
    .map((voucher) => voucher.state)
    .uniq()
    .value()

  if (states.length !== 1) {
    // Invalid represents multiple different states or no state
    return 'invalid'
  }

  return states[0]
}

export const getTextColorForColorScheme = (
  colorScheme?: VoucherColorScheme,
): string => {
  switch (colorScheme) {
    case 'yellow':
      return 'primary.900'
    default:
      return 'white'
  }
}

export const getColorSchemeForVoucherType = (
  voucherType: string | undefined,
): VoucherColorScheme => {
  if (_.isUndefined(voucherType)) {
    return 'primary'
  }

  switch (voucherType) {
    case 'regular':
      return 'teal'
    case 'supermarket':
      return 'yellow'
    default:
      return 'primary'
  }
}

export const getConfigForVoucherType = (
  voucherType: string,
): VoucherTypeConfigObject => {
  const existingConfig = VOUCHER_TYPE_CONFIG[voucherType]
  if (!existingConfig) {
    // Type is unhandled, use default values
    return {
      id: 'default-voucher-type-button',
      src: vouchersLogo,
      text: capitalCase(voucherType),
    }
  }

  return existingConfig
}
