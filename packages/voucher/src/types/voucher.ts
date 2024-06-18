import type {JsonObject} from 'type-fest'

export type GroupedVoucher = {
  id: string
  postalCode: string | null
  block: string | null
  floor: string | null
  unit: string | null
  street: string | null
  campaignId: string
  metadata: JsonObject
  isDeleted: boolean | null
  isViewed: boolean
  isSent: boolean
  createdAt: string
  updatedAt: string
  vouchers: Voucher[]
}

type GroupedVoucherEventMerchantData = {
  merchantId: string
  voucherIds: string[]
  merchantShopName: string
  totalVoucherValue: number
  transactionId?: string
}

export type GroupedVoucherEvent = {
  createdAt: string
  updatedAt: string
  id: number
  event: string
  data: GroupedVoucherEventMerchantData
}

export type Voucher = {
  id: string
  label: string | null
  state: 'voided' | 'unused' | 'redeemed'
  metadata: JsonObject
  lastRedeemedTimestamp: string | null
  merchantName: string | null
  voucherValue: number
  createdAt: string
  updatedAt: string
  type: string | null
  transactionId: string | null
}

export type VoucherColorScheme = 'primary' | 'yellow' | 'teal'

// Consolidated state of multiple vouchers
export type VouchersState = Voucher['state'] | 'invalid'
