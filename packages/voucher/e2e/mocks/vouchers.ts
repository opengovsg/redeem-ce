/* 
This file exists to help us generate voucher objects for different tests.
Default voucher object shape:
{
    id: 'v_enT791mQRuqgi03OhaNQB',
    label: 'v_enT791mQRuqgi03OhaNQB',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: null,
    type: null,
}

Modifiable properties include:
1. state (unused, redeemed, voided)
2. last_redeemed_timestamp (if redeemed) 
3. merchant_name (if redeemed) 
4. type (regular, supermarket)
*/

import {
  DEFAULT_LAST_REDEEMED_TIMESTAMP,
  MERCHANT_NAMES,
} from '../constants/merchant'

// TODO: Implement function to redeem vouchers provided an array of voucher ids.
// TODO: Implement function to modify voucher types.

export const unusedNoTypesVouchers = [
  {
    id: 'v_enT791mQRuqgi03OhaNQB',
    label: 'v_enT791mQRuqgi03OhaNQB',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_BZpRLJBLfaCpqAvM6nmVU',
    label: 'v_BZpRLJBLfaCpqAvM6nmVU',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_yQMFlMU7t0IpPLYOQq0Nt',
    label: 'v_yQMFlMU7t0IpPLYOQq0Nt',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_HNGL3uAIV8yrZn45i0Jlt',
    label: 'v_HNGL3uAIV8yrZn45i0Jlt',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_lqkDXjrTOUoVP4OoKfVVa',
    label: 'v_lqkDXjrTOUoVP4OoKfVVa',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_GP5gjEBzvXp1MAbR76Wxd',
    label: 'v_GP5gjEBzvXp1MAbR76Wxd',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_r6ZqQJh5NF4U3YUrJKP4i',
    label: 'v_r6ZqQJh5NF4U3YUrJKP4i',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_hhGzyoe55IpOgNKbpin40',
    label: 'v_hhGzyoe55IpOgNKbpin40',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_2mON1wEXJ1qpUWAv5FnHG',
    label: 'v_2mON1wEXJ1qpUWAv5FnHG',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_zRGU0YX498auGS1ZMdhql',
    label: 'v_zRGU0YX498auGS1ZMdhql',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_aFT01diuiYlIxqTqwmWUi',
    label: 'v_aFT01diuiYlIxqTqwmWUi',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_cZHhI11R8Wep42wGVyzuN',
    label: 'v_cZHhI11R8Wep42wGVyzuN',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
]

export const redeemedNoTypesVouchers = [
  {
    id: 'v_enT791mQRuqgi03OhaNQB',
    label: 'v_enT791mQRuqgi03OhaNQB',
    state: 'redeemed',
    metadata: {},
    last_redeemed_timestamp: DEFAULT_LAST_REDEEMED_TIMESTAMP,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: MERCHANT_NAMES.NO_TYPES,
    type: null,
    transaction_id: 'transaction_ae522479-1d8e-4790-b93a-17ae9bbf00cc',
  },
  {
    id: 'v_BZpRLJBLfaCpqAvM6nmVU',
    label: 'v_BZpRLJBLfaCpqAvM6nmVU',
    state: 'redeemed',
    metadata: {},
    last_redeemed_timestamp: DEFAULT_LAST_REDEEMED_TIMESTAMP,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: MERCHANT_NAMES.NO_TYPES,
    type: null,
    transaction_id: 'transaction_ae522479-1d8e-4790-b93a-17ae9bbf00cc',
  },
  {
    id: 'v_yQMFlMU7t0IpPLYOQq0Nt',
    label: 'v_yQMFlMU7t0IpPLYOQq0Nt',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_HNGL3uAIV8yrZn45i0Jlt',
    label: 'v_HNGL3uAIV8yrZn45i0Jlt',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_lqkDXjrTOUoVP4OoKfVVa',
    label: 'v_lqkDXjrTOUoVP4OoKfVVa',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_GP5gjEBzvXp1MAbR76Wxd',
    label: 'v_GP5gjEBzvXp1MAbR76Wxd',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_r6ZqQJh5NF4U3YUrJKP4i',
    label: 'v_r6ZqQJh5NF4U3YUrJKP4i',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_hhGzyoe55IpOgNKbpin40',
    label: 'v_hhGzyoe55IpOgNKbpin40',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_2mON1wEXJ1qpUWAv5FnHG',
    label: 'v_2mON1wEXJ1qpUWAv5FnHG',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_zRGU0YX498auGS1ZMdhql',
    label: 'v_zRGU0YX498auGS1ZMdhql',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_aFT01diuiYlIxqTqwmWUi',
    label: 'v_aFT01diuiYlIxqTqwmWUi',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_cZHhI11R8Wep42wGVyzuN',
    label: 'v_cZHhI11R8Wep42wGVyzuN',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
]

export const redeemedAndVoidedNoTypesVouchers = [
  {
    id: 'v_enT791mQRuqgi03OhaNQB',
    label: 'v_enT791mQRuqgi03OhaNQB',
    state: 'redeemed',
    metadata: {},
    last_redeemed_timestamp: DEFAULT_LAST_REDEEMED_TIMESTAMP,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: MERCHANT_NAMES.NO_TYPES,
    type: null,
    transaction_id: 'transaction_ae522479-1d8e-4790-b93a-17ae9bbf00cc',
  },
  {
    id: 'v_BZpRLJBLfaCpqAvM6nmVU',
    label: 'v_BZpRLJBLfaCpqAvM6nmVU',
    state: 'redeemed',
    metadata: {},
    last_redeemed_timestamp: DEFAULT_LAST_REDEEMED_TIMESTAMP,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: MERCHANT_NAMES.NO_TYPES,
    type: null,
    transaction_id: 'transaction_ae522479-1d8e-4790-b93a-17ae9bbf00cc',
  },
  {
    id: 'v_yQMFlMU7t0IpPLYOQq0Nt',
    label: 'v_yQMFlMU7t0IpPLYOQq0Nt',
    state: 'voided',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_HNGL3uAIV8yrZn45i0Jlt',
    label: 'v_HNGL3uAIV8yrZn45i0Jlt',
    state: 'voided',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_lqkDXjrTOUoVP4OoKfVVa',
    label: 'v_lqkDXjrTOUoVP4OoKfVVa',
    state: 'voided',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_GP5gjEBzvXp1MAbR76Wxd',
    label: 'v_GP5gjEBzvXp1MAbR76Wxd',
    state: 'voided',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_r6ZqQJh5NF4U3YUrJKP4i',
    label: 'v_r6ZqQJh5NF4U3YUrJKP4i',
    state: 'voided',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_hhGzyoe55IpOgNKbpin40',
    label: 'v_hhGzyoe55IpOgNKbpin40',
    state: 'voided',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_2mON1wEXJ1qpUWAv5FnHG',
    label: 'v_2mON1wEXJ1qpUWAv5FnHG',
    state: 'voided',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_zRGU0YX498auGS1ZMdhql',
    label: 'v_zRGU0YX498auGS1ZMdhql',
    state: 'voided',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_aFT01diuiYlIxqTqwmWUi',
    label: 'v_aFT01diuiYlIxqTqwmWUi',
    state: 'voided',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_cZHhI11R8Wep42wGVyzuN',
    label: 'v_cZHhI11R8Wep42wGVyzuN',
    state: 'voided',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
]

export const unusedTypesVouchers = [
  {
    id: 'v_enT791mQRuqgi03OhaNQB',
    label: 'v_enT791mQRuqgi03OhaNQB',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: null,
    type: 'regular',
  },
  {
    id: 'v_BZpRLJBLfaCpqAvM6nmVU',
    label: 'v_BZpRLJBLfaCpqAvM6nmVU',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: null,
    type: 'supermarket',
  },
  {
    id: 'v_yQMFlMU7t0IpPLYOQq0Nt',
    label: 'v_yQMFlMU7t0IpPLYOQq0Nt',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: 'regular',
  },
  {
    id: 'v_HNGL3uAIV8yrZn45i0Jlt',
    label: 'v_HNGL3uAIV8yrZn45i0Jlt',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: 'regular',
  },
  {
    id: 'v_lqkDXjrTOUoVP4OoKfVVa',
    label: 'v_lqkDXjrTOUoVP4OoKfVVa',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: 'regular',
  },
  {
    id: 'v_GP5gjEBzvXp1MAbR76Wxd',
    label: 'v_GP5gjEBzvXp1MAbR76Wxd',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: 'regular',
  },
  {
    id: 'v_r6ZqQJh5NF4U3YUrJKP4i',
    label: 'v_r6ZqQJh5NF4U3YUrJKP4i',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: 'regular',
  },
  {
    id: 'v_hhGzyoe55IpOgNKbpin40',
    label: 'v_hhGzyoe55IpOgNKbpin40',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: 'supermarket',
  },
  {
    id: 'v_2mON1wEXJ1qpUWAv5FnHG',
    label: 'v_2mON1wEXJ1qpUWAv5FnHG',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: 'supermarket',
  },
  {
    id: 'v_zRGU0YX498auGS1ZMdhql',
    label: 'v_zRGU0YX498auGS1ZMdhql',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: 'supermarket',
  },
  {
    id: 'v_aFT01diuiYlIxqTqwmWUi',
    label: 'v_aFT01diuiYlIxqTqwmWUi',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: 'supermarket',
  },
  {
    id: 'v_cZHhI11R8Wep42wGVyzuN',
    label: 'v_cZHhI11R8Wep42wGVyzuN',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: 'supermarket',
  },
]

export const redeemedRegularTypesVouchers = [
  {
    id: 'v_enT791mQRuqgi03OhaNQB',
    label: 'v_enT791mQRuqgi03OhaNQB',
    state: 'redeemed',
    metadata: {},
    last_redeemed_timestamp: DEFAULT_LAST_REDEEMED_TIMESTAMP,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: MERCHANT_NAMES.REGULAR,
    type: 'regular',
    transaction_id: 'transaction_ae522479-1d8e-4790-b93a-17ae9bbf00cc',
  },
  {
    id: 'v_BZpRLJBLfaCpqAvM6nmVU',
    label: 'v_BZpRLJBLfaCpqAvM6nmVU',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: null,
    type: 'supermarket',
  },
  {
    id: 'v_yQMFlMU7t0IpPLYOQq0Nt',
    label: 'v_yQMFlMU7t0IpPLYOQq0Nt',
    state: 'redeemed',
    metadata: {},
    last_redeemed_timestamp: DEFAULT_LAST_REDEEMED_TIMESTAMP,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: MERCHANT_NAMES.REGULAR,
    type: 'regular',
    transaction_id: 'transaction_ae522479-1d8e-4790-b93a-17ae9bbf00cc',
  },
  {
    id: 'v_HNGL3uAIV8yrZn45i0Jlt',
    label: 'v_HNGL3uAIV8yrZn45i0Jlt',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: 'regular',
  },
  {
    id: 'v_lqkDXjrTOUoVP4OoKfVVa',
    label: 'v_lqkDXjrTOUoVP4OoKfVVa',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: 'regular',
  },
  {
    id: 'v_GP5gjEBzvXp1MAbR76Wxd',
    label: 'v_GP5gjEBzvXp1MAbR76Wxd',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: 'regular',
  },
  {
    id: 'v_r6ZqQJh5NF4U3YUrJKP4i',
    label: 'v_r6ZqQJh5NF4U3YUrJKP4i',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: 'regular',
  },
  {
    id: 'v_hhGzyoe55IpOgNKbpin40',
    label: 'v_hhGzyoe55IpOgNKbpin40',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: 'supermarket',
  },
  {
    id: 'v_2mON1wEXJ1qpUWAv5FnHG',
    label: 'v_2mON1wEXJ1qpUWAv5FnHG',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: 'supermarket',
  },
  {
    id: 'v_zRGU0YX498auGS1ZMdhql',
    label: 'v_zRGU0YX498auGS1ZMdhql',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: 'supermarket',
  },
  {
    id: 'v_aFT01diuiYlIxqTqwmWUi',
    label: 'v_aFT01diuiYlIxqTqwmWUi',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: 'supermarket',
  },
  {
    id: 'v_cZHhI11R8Wep42wGVyzuN',
    label: 'v_cZHhI11R8Wep42wGVyzuN',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: 'supermarket',
  },
]

export const redeemedSupermarketTypesVouchers = [
  {
    id: 'v_enT791mQRuqgi03OhaNQB',
    label: 'v_enT791mQRuqgi03OhaNQB',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: null,
    type: 'regular',
  },
  {
    id: 'v_BZpRLJBLfaCpqAvM6nmVU',
    label: 'v_BZpRLJBLfaCpqAvM6nmVU',
    state: 'redeemed',
    metadata: {},
    last_redeemed_timestamp: DEFAULT_LAST_REDEEMED_TIMESTAMP,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: MERCHANT_NAMES.SUPERMARKET,
    type: 'supermarket',
    transaction_id: 'transaction_ae522479-1d8e-4790-b93a-17ae9bbf00cc',
  },
  {
    id: 'v_yQMFlMU7t0IpPLYOQq0Nt',
    label: 'v_yQMFlMU7t0IpPLYOQq0Nt',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: 'regular',
  },
  {
    id: 'v_HNGL3uAIV8yrZn45i0Jlt',
    label: 'v_HNGL3uAIV8yrZn45i0Jlt',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: 'regular',
  },
  {
    id: 'v_lqkDXjrTOUoVP4OoKfVVa',
    label: 'v_lqkDXjrTOUoVP4OoKfVVa',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: 'regular',
  },
  {
    id: 'v_GP5gjEBzvXp1MAbR76Wxd',
    label: 'v_GP5gjEBzvXp1MAbR76Wxd',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: 'regular',
  },
  {
    id: 'v_r6ZqQJh5NF4U3YUrJKP4i',
    label: 'v_r6ZqQJh5NF4U3YUrJKP4i',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: 'regular',
  },
  {
    id: 'v_hhGzyoe55IpOgNKbpin40',
    label: 'v_hhGzyoe55IpOgNKbpin40',
    state: 'redeemed',
    metadata: {},
    last_redeemed_timestamp: DEFAULT_LAST_REDEEMED_TIMESTAMP,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: MERCHANT_NAMES.SUPERMARKET,
    type: 'supermarket',
    transaction_id: 'transaction_ae522479-1d8e-4790-b93a-17ae9bbf00cc',
  },
  {
    id: 'v_2mON1wEXJ1qpUWAv5FnHG',
    label: 'v_2mON1wEXJ1qpUWAv5FnHG',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: 'supermarket',
  },
  {
    id: 'v_zRGU0YX498auGS1ZMdhql',
    label: 'v_zRGU0YX498auGS1ZMdhql',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: 'supermarket',
  },
  {
    id: 'v_aFT01diuiYlIxqTqwmWUi',
    label: 'v_aFT01diuiYlIxqTqwmWUi',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: 'supermarket',
  },
  {
    id: 'v_cZHhI11R8Wep42wGVyzuN',
    label: 'v_cZHhI11R8Wep42wGVyzuN',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: 'supermarket',
  },
]

export const moreThanMaximumVouchers = [
  {
    id: 'v_enT791mQRuqgi03OhaNQB',
    label: 'v_enT791mQRuqgi03OhaNQB',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_BZpRLJBLfaCpqAvM6nmVU',
    label: 'v_BZpRLJBLfaCpqAvM6nmVU',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_DWTHXIEOqjapBuNmcBDy7',
    label: 'v_DWTHXIEOqjapBuNmcBDy7',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_AJ9EGvNfdrn0WM39eePwo',
    label: 'v_AJ9EGvNfdrn0WM39eePwo',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_gaaBVnHZ4laJqZx8TKyj9',
    label: 'v_gaaBVnHZ4laJqZx8TKyj9',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_fMFMgRnrqhoHCrCRgjENE',
    label: 'v_fMFMgRnrqhoHCrCRgjENE',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 10,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_yQMFlMU7t0IpPLYOQq0Nt',
    label: 'v_yQMFlMU7t0IpPLYOQq0Nt',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_HNGL3uAIV8yrZn45i0Jlt',
    label: 'v_HNGL3uAIV8yrZn45i0Jlt',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_lqkDXjrTOUoVP4OoKfVVa',
    label: 'v_lqkDXjrTOUoVP4OoKfVVa',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_GP5gjEBzvXp1MAbR76Wxd',
    label: 'v_GP5gjEBzvXp1MAbR76Wxd',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_r6ZqQJh5NF4U3YUrJKP4i',
    label: 'v_r6ZqQJh5NF4U3YUrJKP4i',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 5,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_hhGzyoe55IpOgNKbpin40',
    label: 'v_hhGzyoe55IpOgNKbpin40',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_2mON1wEXJ1qpUWAv5FnHG',
    label: 'v_2mON1wEXJ1qpUWAv5FnHG',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_zRGU0YX498auGS1ZMdhql',
    label: 'v_zRGU0YX498auGS1ZMdhql',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_aFT01diuiYlIxqTqwmWUi',
    label: 'v_aFT01diuiYlIxqTqwmWUi',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
  {
    id: 'v_cZHhI11R8Wep42wGVyzuN',
    label: 'v_cZHhI11R8Wep42wGVyzuN',
    state: 'unused',
    metadata: {},
    last_redeemed_timestamp: null,
    created_at: '2022-09-08T14:46:52.305+08:00',
    updated_at: '2022-09-08T14:46:52.305+08:00',
    voucher_value: 2,
    merchant_name: null,
    type: null,
  },
]
