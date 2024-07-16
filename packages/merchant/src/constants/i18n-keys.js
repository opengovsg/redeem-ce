const CHOOSE_LANG_SCREEN = {
  KEY: 'LanguageSelectionScreen',
  TEXT: {
    HEADER: 'Choose language',
    CONFIRM_BUTTON: 'Confirm',
  },
}

const OTP_MOBILE = {
  KEY: 'LoginScreen',
  TEXT: {
    BACK: 'Choose language',
    HEADER: 'Merchant login',
    PLACEHOLDER: 'Mobile number',
    INSTRUCTION: 'Enter your mobile number',
    PRIMARY_BTN_TEXT: 'Next',
    NO_SHOP_CODE_EXPLANATION: 'Only proceed if you have a shop code.',
    NO_SHOP_CODE_BUTTON: "Don't have one?",
    INVALID_MOBILE_NUM_TEXT:
      'Please enter a valid Singapore mobile number and try again.',
  },
}

const OTP_CODE = {
  KEY: 'OtpScreen',
  TEXT: {
    BACK: 'Enter mobile number',
    HEADER: 'Enter OTP',
    INSTRUCTION: 'Enter OTP sent to [[number]]',
    RESEND_OTP_TEXT: 'Resend OTP',
  },
}

const CHOOSE_SHOP = {
  KEY: 'EnterShopCodeScreen',
  TEXT: {
    HEADER: 'Enter shop code',
    PLACEHOLDER: '6 character code',
    INSTRUCTION: 'Enter the 6 character code given to your shop',
    PRIMARY_BTN_TEXT: 'Join shop',
    NO_SHOP_CODE_TEXT: "Don't have a shop code?",
    INVALID_SHOP_CODE:
      'Invalid shop code. Please check and re-enter the shop code sent to your point of contact.',
  },
}

const CHOOSE_NAME = {
  KEY: 'EnterNameScreen',
  TEXT: {
    HEADER: 'Enter your name',
    PLACEHOLDER: 'Your Name',
    INSTRUCTION: 'This will be used for redemption records',
    PRIMARY_BTN_TEXT: 'Submit',
    GO_BACK_TEXT: 'Back',
  },
}

const HOME = {
  KEY: 'HomeScreen',
  TEXT: {
    HEADER: 'Welcome',
    HEADER_CARD_LABEL: 'Total scanned by entire shop today',
    START_SCAN_TEXT: 'Scan QR',
    CAMERA_BLOCKED_TEXT: 'Turn on camera access in settings to scan vouchers',
    GO_SETTINGS_TEXT: 'Go to settings',
  },
}

const TRANSACTIONS = {
  KEY: 'TransactionsScreen',
  TEXT: {
    HEADER_LABEL: 'Transactions',
    HEADER_SHOP_CARD: 'Total scanned by entire shop today',
    HEADER_USER_CARD: 'Total scanned by you today',
    SHOP_TAB: 'ENTIRE SHOP',
    USER_TAB: 'YOU',
    USER_NO_TRANSACTIONS_PLACEHOLDER:
      'Vouchers you have scanned will appear here',
    SHOP_NO_TRANSACTIONS_PLACEHOLDER:
      'Vouchers all staff have scanned will appear here',
    NO_TRANSACTIONS_PLACEHOLDER_BTM: 'Start scanning vouchers in the home page',
    FOOTER_START: 'This page shows up to',
    FOOTER_END:
      "transactions. As such, the last day's total and transaction history may be inaccurate.",
    FOOTER_EXPLANATION: 'This does not affect your payouts.\n To see all, ',
    DOWNLOAD_PROMPT: 'download a CSV file',
    SHOW_ALL_TRANSACTIONS: 'Show all transactions',
    SHOW_LESS_TRANSACTIONS: 'Show less transactions',
  },
}

const PAYOUTS = {
  KEY: 'PayoutsScreen',
  TEXT: {
    HEADER: 'Payouts',
    DAILY_TAB: 'DAILY',
    MONTHLY_TAB: 'MONTHLY',
    NO_PAYOUTS: "Bank payments to the shop's account will appear here",
    INFO_DRAWER_PROMPT: 'When will I get my money?',
    INFO_DRAWER_TEXT:
      'At the end of each day, we will transfer the money for vouchers scanned that day to your registered bank account. This should arrive within a day.\n\nIf monies do not appear after 2 days, you may contact us.',
  },
}

const SETTINGS = {
  KEY: 'SettingsScreen',
  TEXT: {
    HEADER: 'Settings',
    SHOW_SHOP_CODE: 'Show Shop Code',
    FAQ: 'FAQ',
    CONTACT_US: 'Contact Us',
    ABOUT_REDEEM: 'About Redeem',
    CHANGE_LANGUAGE: 'Change Language',
    CHANGE_NAME: 'Change Name',
    CHANGE_SHOP: 'Change Shop',
    LOGOUT: 'Logout',
    TERMS_OF_USE: 'Terms of Use',
    PRIVACY_POLICY: 'Privacy Policy',
  },
}

const COMMON = {
  KEY: 'Common',
  TEXT: {
    HOME: 'Home',
    TRANSACTIONS: 'Transactions',
    PAYOUTS: 'Payouts',
    SETTINGS: 'Settings',

    LOGOUT_TITLE: 'Are you sure you want to logout?',
    LOGOUT_DESCRIPTION: 'You will have to enter your shop code again to login.',
    LOGOUT: 'Logout',

    SUCCESS: 'Success!',
    CLOSE: 'Close',
    CANCEL: 'Cancel',

    TRANSFERRED: 'Transferred',
    TRANSFERRING: 'Transferring',
    TO_BE_TRANSFERRED: 'To be Transferred',

    JOIN_SUCCESS_TEXT:
      'You can now scan vouchers on behalf of [[merchantName]]',

    SHARE_SHOP: 'Your Shop Code',
    SHARE_SHOP_PROMPT:
      'Share this 6 character shop code to other staff of the shop so that they can join the shop.',

    JOIN_SHOP: 'Join Shop',
    CHANGE_SHOP: 'Change Shop',
    CHANGE_SHOP_PROMPT: 'Enter new 6 character shop code.',
    SHARE_SHOP_CODE:
      'Share this 6 character shop code to other staff of the shop so that they can join the shop.',

    CHANGE_NAME: 'Change Name',
    CHANGE_NAME_PROMPT: 'Enter new name.',
    SAVE_NAME: 'Save Name',
  },
}

const I18N_KEYS = {
  CHOOSE_LANG_SCREEN,
  OTP_MOBILE,
  OTP_CODE,
  CHOOSE_SHOP,
  CHOOSE_NAME,
  HOME,
  TRANSACTIONS,
  PAYOUTS,
  SETTINGS,
  COMMON,
}

export default I18N_KEYS
