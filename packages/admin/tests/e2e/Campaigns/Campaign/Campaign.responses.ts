import { CAMPAIGN1_ID, TEST_USER_ID } from '../../constants'

export const API_GET_CAMPAIGN_RESPONSE = {
  object: 'campaign',
  advisory_url: 'https://cdc.gov.sg',
  colour: 'green',
  created_at: '2021-07-05T15:03:25.459+08:00',
  description: '$999 CDC Vouchers',
  eligibility: 'signup_conditions_address',
  id: CAMPAIGN1_ID,
  validity: 'campaign_valid',
  logo_url: 'https://v-staging.redeem.gov.sg/images/fridge_logo.png',
  metadata: {},
  name: '6 July CDC Trial',
  organiser_email: 'cdc@fake-email.gov.sg',
  organiser_name: 'Community Development Council',
  owner: TEST_USER_ID,
  updated_at: '2021-08-04T19:05:02.114+08:00',
  default_vouchers: [
    { value: 1, quantity: 1 },
    { value: 4, quantity: 1 },
  ],
  voucher_colours: [{ value: 'default', colour: 'blue' }],
  validity_end: '2024-03-22T22:26:31.040+08:00',
  validity_start: '2021-03-22T22:26:31.040+08:00',
  visibility: 'public',
}

export const API_GET_CAMPAIGN_STATS_RESPONSE = {
  total_grouped_vouchers_count: 11,
}

// These is not a true response but this is just prevent playwright from erroring out
export const API_GET_TWILIO_CREDENTIALS_EMPTY_RESPONSE = {
  account_sid: '',
  auth_token: '',
  messaging_service_sid: '',
}

export const API_GET_TWILIO_SMS_USAGE = {
  sms_usage: 0,
}

export const API_GET_CAMPAIGN_WITH_WHITELIST_RESPONSE = {
  object: 'campaign',
  advisory_url: 'https://cdc.gov.sg',
  colour: 'green',
  created_at: '2021-07-05T15:03:25.459+08:00',
  description: '$999 CDC Vouchers',
  eligibility: 'signup_allowlist',
  id: CAMPAIGN1_ID,
  is_active: true,
  logo_url: 'https://v-staging.redeem.gov.sg/images/fridge_logo.png',
  metadata: {},
  name: '8 July CDC Trial',
  organiser_email: 'cdc@fake-email.gov.sg',
  organiser_name: 'Community Development Council',
  owner: TEST_USER_ID,
  updated_at: '2021-08-04T19:05:02.114+08:00',
  default_vouchers: [
    { value: 1, quantity: 1 },
    { value: 4, quantity: 1 },
  ],
  voucher_colours: [{ value: 'default', colour: 'blue' }],
  validity: 'campaign_valid',
  validity_end: '2024-03-22T22:26:31.040+08:00',
  validity_start: '2021-03-22T22:26:31.040+08:00',
  visibility: 'public',
}
