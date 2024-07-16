import bluebird from 'bluebird'
import baseConfig, { getAuthorizationHeader } from './baseConfig'

const REDEEM_REQUEST_TIMEOUT_IN_MS = 7000 // Set a timeout for each redemption API call

// OTP =====================================================
// For logging in
function requestOtpByContactNumber(contactNumber) {
  console.log('[INFO] requestOtpByContactNumber')
  return baseConfig
    .post('/otp/phone/register', {
      contactNumber,
    })
    .then((res) => res.data)
}

function verifyOtpAndContactNumberForCredentials(contactNumber, otp) {
  console.log('[INFO] verifyOtpAndContactNumberForCredentials')
  return baseConfig
    .post('/otp/phone/verify', {
      otp,
      contactNumber,
    })
    .then((res) => res.data)
}

// Merchant joining and leaving
async function requestJoinMerchantWithCode(code) {
  console.log(`[INFO] requestJoinMerchantWithCode: ${code}`)
  const headers = await getAuthorizationHeader()
  return baseConfig
    .post(
      '/sessions/join-merchant',
      {
        code,
      },
      { headers },
    )
    .then((res) => res.data)
}

async function requestLeaveMerchant() {
  console.log('[INFO] requestLeaveMerchant')
  const headers = await getAuthorizationHeader()
  return baseConfig
    .post('/sessions/leave-merchant', {}, { headers })
    .then((res) => res.data)
}

async function fetchSession() {
  console.log('[INFO] fetchSession')
  const headers = await getAuthorizationHeader()
  return baseConfig.get('/sessions', { headers }).then((res) => res.data)
}

async function requestUpdateUserName(name) {
  console.log('[INFO] requestUpdateUserName')
  const headers = getAuthorizationHeader()
  return baseConfig.put('/users', { name }, { headers }).then((res) => res.data)
}

// Transactions ==============================================
async function fetchAllTransactions({ start, end, after }) {
  console.log(
    `[INFO] fetchAllTransactions start:${start} end:${end} after:${after}`,
  )
  const headers = await getAuthorizationHeader()
  return baseConfig
    .get('/transactions', {
      headers,
      params: { start, end, after },
    })
    .then((res) => res.data)
}

async function fetchLatestTransactions(upToSize) {
  console.log(`[INFO] fetchLatestTransactions of up to: ${upToSize}`)
  const headers = await getAuthorizationHeader()
  return baseConfig
    .get('/transactions/latest', {
      headers,
      params: {
        size: upToSize,
      },
    })
    .then((res) => res.data)
}

// Payouts
async function fetchPayouts() {
  console.log('[INFO] fetchPayouts')
  const headers = await getAuthorizationHeader()
  return baseConfig
    .get('/payouts', {
      headers,
    })
    .then((res) => res.data)
}

// Stats
async function fetchTransactionsTotal() {
  console.log('[INFO] fetchTransactionsTotal')
  const headers = await getAuthorizationHeader()
  return baseConfig
    .get('/transactions/total', {
      headers,
    })
    .then((res) => res.data)
}

// Voucher Redeem ============================================
// Redeem vouchers by sending the QR code scanned to the api
// All validation logic will be handled by backend
async function requestRedemptionWithQr(qr, idempotencyKey) {
  console.log('[INFO] requestRedemptionWithQr')

  const headers = await getAuthorizationHeader()

  // Attach idempotency key header
  headers['Idempotency-Key'] = idempotencyKey

  const redemptionPromise = baseConfig
    .post(
      '/vouchers/redeem',
      {
        qr,
      },
      { headers },
    )
    .then((res) => res.data)

  // Add timeout to redemption request
  const redemptionPromiseWithTimeout = bluebird
    .resolve(redemptionPromise)
    .timeout(REDEEM_REQUEST_TIMEOUT_IN_MS)

  return redemptionPromiseWithTimeout
}

export default {
  requestOtpByContactNumber,
  verifyOtpAndContactNumberForCredentials,
  fetchAllTransactions,
  fetchLatestTransactions,
  requestRedemptionWithQr,
  fetchSession,
  fetchPayouts,
  fetchTransactionsTotal,
  requestUpdateUserName,
  requestJoinMerchantWithCode,
  requestLeaveMerchant,
}
