/* eslint-disable no-bitwise */
import { VOUCHER_QR_PREFIX } from 'constants/vouchers'
import _ from 'lodash'
import moment from 'moment'
import QRCode from 'qrcode'

// This file is for small named pure functions that could be used in multiple places

export function isClientError(error) {
  const errorCode = _.get(error, 'response.status')
  return errorCode && errorCode >= 400 && errorCode < 500
}

// Get the most specific message first, then default to the base error message
export function getErrorMessage(error) {
  return _.get(error, 'response.data.error.message') || _.get(error, 'message')
}

// Returns a formatted timestamp from a timestamp string or moment obj if the input is valid.
// Else, returns '-'
export function formatTime(timestamp) {
  if (!timestamp) {
    return '-'
  }
  const momentified = moment(timestamp)
  return momentified.isValid() ? momentified.format('D MMM YYYY h:mm A') : '-'
}

// TODO: Might not want to put a very specific search filter here although it is a pure function
function escapeRegExp(str) {
  // eslint-disable-next-line
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
}
export function searchFilter(data, filterKey, filterValue) {
  // filter = 'CHANGI BEACH CARPARK'
  // Regex will look like this: /(?=.*CHANGI)(?=.*BEACH)(?=.*CARPARK)/
  // Only returns true when all 3 words are in string
  const myFilter = new RegExp(
    `(?=.*${escapeRegExp(_.toUpper(filterValue))})`.replace(/\s+/g, ')(?=.*')
  )
  return data.filter((each) => {
    const property = each[filterKey]
    return myFilter.test(_.toUpper(property))
  })
}

// A weak uuid used in Toast to generate ids for them
export function weakUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

async function generateQrCodeSvg(code) {
  // Generate QR code
  // errorCorrectionLevel defaults to M without specifying.
  // L, M, Q, H - 7%, 15%, 25%, 30%
  // The downside is it reduces the symbol's capacity
  return QRCode.toString(code, {
    scale: 100,
    margin: 0,
    color: {
      dark: '#000000ff',
      light: '#0000',
    },
    // Error correction is set to high so that they can still be scanned
    // with the logo overlaid in the middle. If the qr code becomes too
    // dense, voucher id generation logic can be changed to make them
    // shorter.
    errorCorrectionLevel: 'H',
    type: 'svg',
  })
}

export function generateVoucherQrCodeSvg(voucherId, extraQrPrefix) {
  const prefix = `${VOUCHER_QR_PREFIX}${
    extraQrPrefix ? `-${extraQrPrefix}` : ''
  }`
  return generateQrCodeSvg(`${prefix}:${voucherId}`)
}
