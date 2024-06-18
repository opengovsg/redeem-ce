import _ from 'lodash'

export function getVoucherBaseUrl() {
  return process.env.REACT_APP_API_BASE_URL
}

export function getLaunchDarklySdkClientId() {
  return process.env.REACT_APP_LAUNCHDARKLY_SDK_CLIENT ?? ''
}

export function getIsLaunchDarklySdkClientAvailable() {
  const launchDarklySdkClient = getLaunchDarklySdkClientId()
  return !_.isEmpty(launchDarklySdkClient) && launchDarklySdkClient !== 'null'
}

export const REDEEM_CONSTANTS = {
  landingPage: process.env.REACT_APP_LANDING_PAGE ?? '',
  supportEmail: process.env.REACT_APP_SUPPORT_EMAIL ?? '',
  termsOfUse: process.env.REACT_APP_TERMS_OF_USE ?? '',
  privacy: process.env.REACT_APP_PRIVACY ?? '',
  reportVulnerability: process.env.REACT_APP_REPORT_VULNERABILITY ?? '',
  feedbackPage: process.env.REACT_APP_FEEDBACK_PAGE ?? '',
}
