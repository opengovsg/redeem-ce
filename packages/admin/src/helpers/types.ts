import type { JsonObject } from 'type-fest'

export type ValidationResult =
  | { valid: true }
  | { valid: false; reason: string }

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
}

export type VouchersStatsByTypeAndDenomination = {
  [type: string]: {
    totalValueRedeemed: number
    totalValueVoided: number
    totalValueUnused: number
    denominations: {
      denomination: number
      numVoided: number
      numUnused: number
      numRedeemed: number
    }[]
  }
}
