export const API_ROUTE_REGISTER = '/v1/otp/email/register'
export const API_ROUTE_VERIFY_OTP = '/v1/otp/email/verify'
export const API_ROUTE_GET_CAMPAIGNS = '/v1/campaigns'
export const API_ROUTE_GET_USER_ROLES = '/v1/users/roles'
export const API_ROUTE_GET_CAMPAIGN = '/v1/campaigns/*'
export const API_ROUTE_GET_CAMPAIGN_STATS = '/v1/campaigns/*/stats'
export const API_ROUTE_GET_CAMPAIGN_VOUCHERS = '/v1/campaigns/*/vouchers?**'
export const API_ROUTE_GET_CAMPAIGN_ROLES = '/v1/campaigns/*/roles'
export const API_ROUTE_GET_WHITELIST_TEMPLATE_DOWNLOAD =
  '/v1/campaigns/whitelist/template/download?**'
export const API_ROUTE_GET_TWILIO_CREDENTIALS =
  '/v1/campaigns/*/twilio-credentials'
export const API_ROUTE_GET_TWILIO_SMS_USAGE = '/v1/campaigns/*/sms-usage'
export const API_ROUTE_GET_PRINT_GROUPED_VOUCHERS =
  '/v1/vouchers/*/vouchers-to-print'
export const API_ROUTE_CREATE_CAMPAIGN_VOUCHERS =
  '/v1/campaigns/*/vouchers/create-group'
export const API_ROUTE_RECIPIENT_WHITELIST_CHECK =
  '/v1/campaigns/*/whitelist/check?**'
export const API_ROUTE_ADDRESS_IN_BLACKLIST_CHECK =
  '/v1/campaigns/*/blacklist?**'
export const API_URL =
  process.env.REACT_APP_REDEEM_URL || 'http://localhost:10000'
export const DEFAULT_RESPONSE_HEADERS = { 'Access-Control-Allow-Origin': '*' }

export const AUTH_TOKEN = 'thisisafaketokenfortesting'
export const TEST_USER_ID = 'user_c2d6ed7c-2e24-4c04-a1af-faf63f841bca'

export const LOCAL_STORAGE_USER_KEY = 'user'
export const LOCAL_STORAGE_USER = {
  id: TEST_USER_ID,
  contact_number: null,
  email: 'team@redeem.gov.sg',
  name: null,
  metadata: {},
  created_at: '2021-12-13T18:04:15.098+08:00',
  updated_at: '2021-12-13T18:04:15.098+08:00',
  token: AUTH_TOKEN,
}

export const CAMPAIGN_ACTIONS = [
  'downloadTransactionReport',
  'listTransactionReports',
  'listMerchantsForCampaign',
  'listGroupedVouchers',
  'listUserRolesForCampaign',
  'deleteUserRoles',
  'updateUserRoles',
  'createUserRoles',
  'listStats',
  'listTransactions',
  'removeAdminFromCampaign',
  'addAdminToCampaign',
  'listAdmins',
  'updateCampaign',
  'getCampaign',
  'listCampaignEvents',
  'listGroupedVoucherEvents',
  'downloadVoucherReport',
  'printGroupedVouchers',
  'updateGroupedVoucherContact',
  'sendGroupedVouchers',
  'createGroupedVouchers',
  'downloadSettlementReport',
  'listSettlementReports',
  'listPayoutSettlementsForCampaign',
]

export const GLOBAL_ACTIONS = [
  'listMerchantEvents',
  'updateMerchant',
  'updateMerchantPayment',
  'getMerchant',
  'createCampaign',
  'listCampaigns',
]

export const CAMPAIGN1_ID = 'campaign_be1dda5a-b902-4781-ba19-ecf4e3f55bc6'
export const NEW_GROUPED_VOUCHER1_ID = 'qxRF6MOCfpaRdJsAFkcnif2XWSLXoU'

export const API_CAMPAIGN_VOUCHERS_PAGE_1_END_CURSOR =
  'WyIyMDIxLTEyLTEyVDAzOjA1OjM3LjM4NCswODowMCIsInBNZE83Y0ZuWFNta0J6RnRRRHR3VzdYV2hEcXdKRSJd'
