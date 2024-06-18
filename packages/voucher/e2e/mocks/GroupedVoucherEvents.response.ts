import {MERCHANT_ID, MERCHANT_NAMES} from '../constants/merchant'

const defaultPageInfo = {
  has_next_page: false,
  has_previous_page: false,
  start_cursor: 'WyIyOSJd',
  end_cursor: 'WyIxMSJd',
}

export const noRedemptionEventsResponse = {
  data: [],
  page_info: {
    ...defaultPageInfo,
  },
}

export const redemptionEventsResponse = {
  data: [
    {
      created_at: '2022-09-29T17:19:51.899+08:00',
      updated_at: '2022-09-29T17:19:51.899+08:00',
      id: '1',
      event: 'grouped_voucher_redemption',
      data: {
        merchant_id: MERCHANT_ID,
        voucher_ids: ['v_enT791mQRuqgi03OhaNQB', 'v_BZpRLJBLfaCpqAvM6nmVU'],
        merchant_shop_name: MERCHANT_NAMES.NO_TYPES,
        total_voucher_value: 20,
        transaction_id: 'transaction_ae522479-1d8e-4790-b93a-17ae9bbf00cc',
      },
    },
  ],
  page_info: {
    ...defaultPageInfo,
  },
}
