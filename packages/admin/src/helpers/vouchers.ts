import { capitalCase } from 'capital-case'
import { VOUCHER_STATE, VOUCHER_TYPES } from 'constants/vouchers'
import _ from 'lodash'
import { Voucher, VouchersStatsByTypeAndDenomination } from './types'

export function getLabelForVoucherType(voucherType: string) {
  return _.get(VOUCHER_TYPES, voucherType)?.label || capitalCase(voucherType)
}

export function getVouchersStatsByTypeAndDenomination(
  vouchers: Voucher[]
): VouchersStatsByTypeAndDenomination {
  return (
    _(vouchers)
      // Vouchers with no type are grouped under the empty string key
      .groupBy((voucher) => voucher.type || '')
      .mapValues((vouchersOfSameType) => ({
        denominations: _(vouchersOfSameType)
          .groupBy((voucher) => voucher.voucherValue)
          .mapValues((vouchersInDenomination) => ({
            numRedeemed: vouchersInDenomination.filter(
              (voucher) => voucher.state === VOUCHER_STATE.REDEEMED
            ).length,
            numUnused: vouchersInDenomination.filter(
              (voucher) => voucher.state === VOUCHER_STATE.UNUSED
            ).length,
            numVoided: vouchersInDenomination.filter(
              (voucher) => voucher.state === VOUCHER_STATE.VOIDED
            ).length,
          }))
          .toPairs()
          .map(([denomination, stats]) => ({
            denomination: Number(denomination),
            ...stats,
          }))
          .sortBy(({ denomination }) => denomination)
          .value(),
        totalValueUnused: _(vouchersOfSameType)
          .filter((voucher) => voucher.state === VOUCHER_STATE.UNUSED)
          .sumBy((voucher) => voucher.voucherValue),
        totalValueRedeemed: _(vouchersOfSameType)
          .filter((voucher) => voucher.state === VOUCHER_STATE.REDEEMED)
          .sumBy((voucher) => voucher.voucherValue),
        totalValueVoided: _(vouchersOfSameType)
          .filter((voucher) => voucher.state === VOUCHER_STATE.VOIDED)
          .sumBy((voucher) => voucher.voucherValue),
      }))
      .value()
  )
}
