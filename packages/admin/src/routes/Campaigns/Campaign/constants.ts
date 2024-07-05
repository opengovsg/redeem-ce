export const CAMPAIGN_NAV_TABS_KEYS = {
  DASHBOARD: 'dashboard',
  VOUCHERS: 'vouchers',
  MERCHANTS: 'merchants',
  SETTINGS: 'settings',
  HISTORY: 'history',
  METRICS: 'metrics',
}

// TODO: This have to be manually extended to match what is in the backend: campaigns -> eligiblity
export const CAMPAIGN_ELIGIBILITY = {
  SIGNUP_WHITELIST: 'signup_allowlist',
  NO_SIGNUP: 'no_signup',
} as const
