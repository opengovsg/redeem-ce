import I18N_KEYS from 'constants/i18n-keys'

export const ROUTES = {
  ONBOARDING: {
    ROOT: '/onboarding',
    PATHS: {
      CHOOSE_LANG: 'choose-lang',
      OTP_MOBILE: 'otp-mobile',
      OTP_CODE: 'otp-code',
      CHOOSE_NAME: 'choose-name',
      CHOOSE_SHOP: 'choose-shop',
    },
  },
  MAIN: {
    ROOT: '/',
    PATHS: {
      HOME: '/',
      TRANSACTIONS: 'transactions',
      PAYOUTS: 'payouts',
      SETTINGS: 'settings',
    },
  },
}

export const FLOWS = {
  ONBOARDING: {
    CHOOSE_LANG: {
      NEXT: ROUTES.ONBOARDING.PATHS.OTP_MOBILE,
      BACKLINK: null,
    },
    OTP_MOBILE: {
      NEXT: ROUTES.ONBOARDING.PATHS.OTP_CODE,
      BACKLINK: {
        ROUTE: ROUTES.ONBOARDING.PATHS.CHOOSE_LANG,
        TITLE: I18N_KEYS.OTP_MOBILE.TEXT.BACK,
      },
    },
    OTP_CODE: {
      NEXT: ROUTES.ONBOARDING.PATHS.CHOOSE_NAME,
      BACKLINK: {
        ROUTE: ROUTES.ONBOARDING.PATHS.OTP_MOBILE,
        TITLE: I18N_KEYS.OTP_CODE.TEXT.BACK,
      },
    },
    CHOOSE_NAME: {
      NEXT: ROUTES.ONBOARDING.PATHS.CHOOSE_SHOP,
    },
    CHOOSE_SHOP: {
      NEXT: ROUTES.MAIN.PATHS.HOME,
    },
  },
}
