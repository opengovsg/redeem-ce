/* eslint-disable no-bitwise */
import _ from 'lodash'

const DEFAULT_CLIENT_ERROR_MESSAGE =
  'Sorry, we encountered an error. Please contact us if the issue persists.'

// This file is for small named pure functions that could be used in multiple places
export function isClientError(error) {
  const errorCode = _.get(error, 'response.status')
  return errorCode && errorCode >= 400 && errorCode < 500
}

export function getErrorMessage(error) {
  // This is the application specific error message provided by server
  const applicationErrorMessage = _.get(error, 'response.data.error.message')
  // This is just a basic error message
  const defaultErrorMessage = _.get(error, 'message')

  // Return the application specific error message, else the defaultErrorMessage, else empty string.
  return (
    applicationErrorMessage ||
    defaultErrorMessage ||
    DEFAULT_CLIENT_ERROR_MESSAGE
  )
}

export function getHttpAppErrorCode(error) {
  return _.get(error, 'response.data.error.code')
}

// Replaces all non-alphanumeric characters to empty string and all lower
// case to upper case.
const ALPHA_NUMERIC_PATTERN = /[^a-z0-9+]+/gi
export const alphaNumericToUpperReplacer = (str) =>
  _.toUpper(str.replace(ALPHA_NUMERIC_PATTERN, ''))

export function weakUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// opens a url in a new tab
export const openInNewTab = (url) => {
  window.open(url, '_blank', 'rel noopener noreferrer')
}
