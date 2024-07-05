import { AUTH_TOKEN, TEST_USER_ID } from '../constants'

export const API_VERIFY_OTP_SUCCESS_RESPONSE = {
  status: 'succeeded',
  user: {
    id: TEST_USER_ID,
    contact_number: null,
    email: 'team@redeem.gov.sg',
    name: null,
    metadata: {},
    created_at: '2021-12-13T18:04:15.098+08:00',
    updated_at: '2021-12-13T18:04:15.098+08:00',
  },
  token: AUTH_TOKEN,
}

export const API_REGISTER_OTP_SUCCESS_RESPONSE = {
  message: 'OTP sent!',
  status: 'succeeded',
}
