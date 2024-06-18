import baseConfig from './baseConfig'
import {GroupedVoucher, GroupedVoucherEvent} from '../../types/voucher'

export function fetchGroupById(id: string): Promise<GroupedVoucher> {
  return baseConfig.get(`/vouchers/groups/${id}`).then((res) => res.data)
}

export function fetchTransactionHistoryByGroupId(
  id: string,
): Promise<GroupedVoucherEvent[]> {
  return baseConfig.get(`/events/vouchers/${id}`).then((res) => res.data)
}
