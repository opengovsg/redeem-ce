import _ from 'lodash'
import { WhitelistMetaDataAction } from 'routes/Campaigns/Campaign/components/SettingsTab/components/EligibilityType/components/WhitelistContainer/components/WhitelistAttachmentWithModal/WhitelistReducer'
import { TwilioCredentials } from 'routes/Campaigns/Campaign/components/SettingsTab/components/Settings/machine/TwilioCredentialsModalMachine'
import { BulkCreateMetaDataAction } from 'routes/Campaigns/Campaign/components/VouchersTab/components/BulkCreateVoucherModal/BulkCreateReducer'
import { log } from '../logger'
import baseConfig, {
  getAuthorizationHeader,
  baseConfiguration,
} from './baseConfig'
import {
  CampaignEventResponse,
  ListUserRolesForUserResponse,
  VerifyOtpResponse,
  MerchantEventResponse,
  CheckWhitelistResponse,
  Campaign,
  UpdateCampaignDetailsProp,
  UpdateCampaignVoucherDetailsProp,
  UpdateCampaignProps,
  CampaignSmsUsage,
  CheckBulkCreateResponse,
  SubmitBulkCreateResponse,
  CheckBulkCreateJobStatusResponse,
  DownloadCampaignVoucherLinksResponse,
  CampaignMetricDto,
  UpdateGroupedVoucherDetailsParams,
  CreateVoucherForCampaignParams,
  FetchedGroupedVourEventsDto,
  LogoutResponse,
} from './types'

// OTP =====================================================
// For logging in into the admin dashboard
function requestOtpByEmail({ email }: { email: string }) {
  log('[INFO] requestOtpByEmail')
  return baseConfig.post('/otp/email/register', {
    email,
  })
}

function verifyOtpAndEmailForCredentials({
  otp,
  email,
}: {
  otp: string
  email: string
}): Promise<VerifyOtpResponse> {
  log('[INFO] verifyOtpAndEmailForCredentials')
  return baseConfig
    .post('/otp/email/verify', {
      otp,
      email,
    })
    .then((res) => res.data)
}

// Self Permissions =====================================================
// For admins to get their own permissions

function fetchUserPermissions(): Promise<ListUserRolesForUserResponse> {
  log('[INFO] fetchUserPermissions')
  const headers = getAuthorizationHeader()
  return baseConfig.get('/users/roles', { headers }).then((res) => res.data)
}

// Sessions =================================================
// For session management
function logout(): Promise<LogoutResponse> {
  log('[INFO] logout')
  const headers = getAuthorizationHeader()
  return baseConfig
    .delete('/sessions/dashboard', { headers })
    .then((res) => res.data)
}

// Admins =================================================
// For super-users to manage admins
// super-users have the ability to list/delete/add
function addAdminToCampaign({
  campaignId,
  email,
  permissionGroups,
}: {
  campaignId: string
  email: string
  permissionGroups: string[]
}) {
  log('[POST] addAdminToCampaign')
  const headers = getAuthorizationHeader()
  return baseConfig
    .post(
      `/campaigns/${campaignId}/roles`,
      {
        email,
        roles: permissionGroups,
      },
      { headers }
    )
    .then((res) => res.data)
}

function updateCampaignAdminPermissions({
  campaignId,
  userId,
  permissionGroups,
}: {
  campaignId: string
  userId: string
  permissionGroups: string[]
}) {
  log('[POST] updateCampaignAdminPermissions')
  const headers = getAuthorizationHeader()
  return baseConfig
    .put(
      `/campaigns/${campaignId}/users/${userId}/roles`,
      {
        roles: permissionGroups,
      },
      { headers }
    )
    .then((res) => res.data)
}

function deleteCampaignAdminPermissions({
  campaignId,
  userId,
  permissionGroups,
}: {
  campaignId: string
  userId: string
  permissionGroups: string[]
}) {
  log('[DELETE] deleteCampaignAdminPermissions')
  const headers = getAuthorizationHeader()
  return baseConfig({
    // Method baseConfig.delete does not allow request body
    method: 'DELETE',
    url: `/campaigns/${campaignId}/users/${userId}/roles`,
    headers,
    data: {
      roles: permissionGroups,
    },
  }).then((res) => res.data)
}

function fetchCampaignAdmins(campaignId: string) {
  log('[GET] fetchAllAdminsOfCampaign')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/campaigns/${campaignId}/roles`, { headers })
    .then((res) => res.data)
}

// Campaigns ===============================================
// For admin to manage campaigns
// TODO: Consider if the destructuring logic should be here
async function createCampaign({
  campaignName: name,
  campaignDescription: description,
  campaignOrganiserName: organiserName,
  campaignOrganiserEmail: organiserEmail,
  campaignAdvisoryUrl: advisoryUrl,
  campaignLogoUrl: logoUrl,
  campaignMerchantListUrl: merchantListUrl,
  campaignOrganiserLocation: organiserLocation,
}: {
  campaignName: string
  campaignDescription: string
  campaignOrganiserName: string
  campaignOrganiserEmail: string
  campaignAdvisoryUrl: string
  campaignLogoUrl: string
  campaignMerchantListUrl: string
  campaignOrganiserLocation: string
}) {
  log('[POST] createCampaign')
  const headers = getAuthorizationHeader()
  return baseConfig
    .post(
      '/campaigns',
      {
        ...(name && { name }),
        ...(description && { description }),
        ...(organiserName && { organiserName }),
        ...(organiserEmail && { organiserEmail }),
        ...(advisoryUrl && { advisoryUrl }),
        ...(logoUrl && { logoUrl }),
        ...(merchantListUrl && { merchantListUrl }),
        ...(organiserLocation && { organiserLocation }),
      },
      { headers }
    )
    .then((res) => res.data)
}

function updateCampaign(
  campaignId: string,
  {
    campaignName: name,
    campaignDescription: description,
    campaignOrganiserName: organiserName,
    campaignOrganiserEmail: organiserEmail,
    campaignMerchantListUrl: merchantListUrl,
    campaignOrganiserLocation: organiserLocation,
    campaignAdvisoryUrl: advisoryUrl,
    campaignOrganiserFeedbackUrl: organiserFeedbackUrl,
    campaignLogoUrl: logoUrl,
    campaignColour: colour,
    campaignDefaultVouchers: defaultVouchers,
    campaignVoucherColours: voucherColours,
    campaignTncUrl: tncUrl,
  }: UpdateCampaignProps
) {
  log('[PUT] updateCampaign')
  const headers = getAuthorizationHeader()
  return baseConfig
    .put(
      `/campaigns/${campaignId}`,
      {
        name,
        description,
        organiserName,
        organiserEmail,
        advisoryUrl,
        organiserFeedbackUrl,
        logoUrl,
        merchantListUrl,
        organiserLocation,
        colour,
        defaultVouchers,
        voucherColours,
        tncUrl,
      },
      { headers }
    )
    .then((res) => res.data)
}

function updateCampaignDetails(
  campaignId: string,
  {
    campaignName,
    campaignDescription,
    campaignOrganiserName,
    campaignOrganiserEmail,
    campaignLogoUrl,
    campaignMerchantListUrl,
    campaignOrganiserFeedbackUrl,
    campaignOrganiserLocation,
  }: UpdateCampaignDetailsProp
) {
  return updateCampaign(campaignId, {
    campaignName,
    campaignDescription,
    campaignOrganiserName,
    campaignOrganiserEmail,
    campaignLogoUrl,
    campaignMerchantListUrl,
    campaignOrganiserFeedbackUrl,
    campaignOrganiserLocation,
  })
}

function updateCampaignVoucherDetails(
  campaignId: string,
  {
    campaignAdvisoryUrl,
    campaignLogoUrl,
    campaignColour,
    campaignDefaultVouchers,
    campaignVoucherColours,
    campaignTncUrl,
  }: UpdateCampaignVoucherDetailsProp
) {
  return updateCampaign(campaignId, {
    campaignAdvisoryUrl,
    campaignLogoUrl,
    campaignColour,
    campaignVoucherColours,
    campaignDefaultVouchers,
    campaignTncUrl,
  })
}

function fetchCampaignById(campaignId: string): Promise<Campaign> {
  log('[INFO] fetchCampaignById')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/campaigns/${campaignId}`, { headers })
    .then((res) => res.data)
}

function fetchCampaignStatsByCampaignId(campaignId: string) {
  log('[INFO] fetchCampaignStatsByCampaignId')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/campaigns/${campaignId}/stats`, { headers })
    .then((res) => res.data)
}

function fetchAllCampaigns() {
  log('[INFO] fetchAllCampaigns')
  const headers = getAuthorizationHeader()
  return baseConfig.get(`/campaigns`, { headers }).then((res) => res.data)
}

// Campaign Reports
// For fetching of reports
function fetchCampaignSettlementReports(campaignId: string) {
  log('[INFO] fetchCampaignSettlementReports')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/campaigns/${campaignId}/reports/settlements`, { headers })
    .then((res) => res.data)
}

function fetchCampaignSettlementReportURL({
  campaignId,
  key,
}: {
  campaignId: string
  key: string
}) {
  log('[INFO] fetchCampaignSettlementReportURL')
  const headers = getAuthorizationHeader()
  return baseConfig
    .post(
      `/campaigns/${campaignId}/reports/settlements/download`,
      { key },
      { headers }
    )
    .then((res) => res.data)
}

function fetchCampaignTransactionReports(campaignId: string) {
  log('[INFO] fetchCampaignTransactionReports')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/campaigns/${campaignId}/reports/transactions`, { headers })
    .then((res) => res.data)
}

function fetchCampaignTransactionReportURL({
  campaignId,
  key,
}: {
  campaignId: string
  key: string
}) {
  log('[INFO] fetchCampaignTransactionReportURL')
  const headers = getAuthorizationHeader()
  return baseConfig
    .post(
      `/campaigns/${campaignId}/reports/transactions/download`,
      { key },
      { headers }
    )
    .then((res) => res.data)
}
function fetchCampaignVoucherReportURL({ campaignId }: { campaignId: string }) {
  log('[INFO] fetchCampaignVoucherReportURL')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/campaigns/${campaignId}/reports/vouchers/download`, { headers })
    .then((res) => res.data)
}

function downloadCampaignVoucherLinks({
  campaignId,
}: {
  campaignId: string
}): Promise<DownloadCampaignVoucherLinksResponse> {
  log('[INFO] downloadCampaignVoucherLinks')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/campaigns/${campaignId}/download-campaign-voucher-links`, {
      headers,
    })
    .then((res) => res.data)
}

// CampaignVouchers ================================================
// For admin to manage vouchers within a campaign
// 1. Such as fetching all vouchers within a campaign
// 2. Creating a voucher for a campaign
function fetchAllVouchersByCampaignId({
  campaignId,
  after,
  before,
  search,
  block,
  floor,
  unit,
  postalCode,
  limit,
  recipientId,
}: {
  campaignId: string
  after?: string
  before?: string
  search?: string
  block?: string
  floor?: string
  unit?: string
  postalCode?: string
  limit?: number
  recipientId?: string
}) {
  log('[INFO] fetchAllVouchersByCampaignId')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/campaigns/${campaignId}/vouchers`, {
      headers,
      params: {
        after,
        before,
        search,
        limit,
        block,
        floor,
        unit,
        postalCode,
        recipientId,
      },
    })
    .then((res) => res.data)
}

function createVoucherForCampaign({
  campaignId,
  label,
  name,
  contactNumber,
  recipientId,
  street,
  floor,
  postalCode,
  unit,
  block,
  values,
}: CreateVoucherForCampaignParams) {
  log('[INFO] createVoucher')
  const headers = getAuthorizationHeader()
  return baseConfig
    .post(
      `/campaigns/${campaignId}/vouchers/create-group`,
      {
        ...(label && { label }),
        ...(name && { name }),
        ...(contactNumber && { contactNumber }),
        ...(recipientId && { recipientId }),
        ...(block && { block }),
        ...(unit && { unit }),
        ...(floor && { floor }),
        ...(postalCode && { postalCode }),
        ...(street && { street }),
        ...(values && { values }),
      },
      { headers }
    )
    .then((res) => res?.data?.data)
}

function uploadWhitelistForCampaign({
  campaignId,
  whitelistCsv,
}: {
  campaignId: string
  whitelistCsv: File
}) {
  log('[POST] uploadWhitelist')
  const headers = getAuthorizationHeader()
  const formData = new FormData()
  formData.append('whitelist_csv', whitelistCsv, whitelistCsv.name)
  formData.append('file_type', 'recipientId')
  return baseConfig
    .post(`/campaigns/${campaignId}/whitelist/upload`, formData, {
      ...baseConfiguration,
      transformRequest: (data) => data,
      headers,
    })
    .then((res) => res.data)
}

function submitBulkCreateForCampaign({
  campaignId,
  bulkCreateCsv,
}: {
  campaignId: string
  bulkCreateCsv: File
}): Promise<SubmitBulkCreateResponse> {
  log('[POST] submitBulkCreate')
  const headers = getAuthorizationHeader()
  const formData = new FormData()
  formData.append('bulk_create_csv', bulkCreateCsv, bulkCreateCsv.name)
  return baseConfig
    .post(`/campaigns/${campaignId}/bulk-create`, formData, {
      ...baseConfiguration,
      transformRequest: (data) => data,
      headers,
    })
    .then((res) => res.data)
}

function checkBulkCreateJobStatus({
  campaignId,
  jobId,
}: {
  campaignId: string
  jobId: string
}): Promise<CheckBulkCreateJobStatusResponse> {
  log('[POST] checkBulkCreateJobStatus')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/campaigns/${campaignId}/bulk-create-job-status`, {
      ...baseConfiguration,
      transformRequest: (data) => data,
      params: { jobId },
      headers,
    })
    .then((res) => res.data)
}

async function checkWhitelistForCampaign({
  campaignId,
  whitelistCsv,
  dispatch,
}: {
  campaignId: string
  whitelistCsv: File
  dispatch: React.Dispatch<WhitelistMetaDataAction>
}): Promise<CheckWhitelistResponse> {
  log('[POST] checkWhitelist')
  const headers = getAuthorizationHeader()
  const formData = new FormData()
  formData.append('whitelist_csv', whitelistCsv, whitelistCsv.name)
  formData.append('file_type', 'recipientId')

  // Somehow I will have to redefine transformRequest inorder to make this work. If anyone has an idea to avoid it do let me know.
  // Apparently it should be working in our v.0.24 but yet i am not sure if our base configuration has something to do with it.
  // https://github.com/axios/axios/issues/4406
  return baseConfig
    .post(`/campaigns/${campaignId}/whitelist/validity`, formData, {
      ...baseConfiguration,
      transformRequest: (data) => data,
      headers,
      // Just doing a rough assumption of uploading which assumes it be only 90%
      // The upload progress shows almost instantly in localhost because see @https://github.com/axios/axios/issues/639
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 90
        dispatch({
          type: 'CHECKING',
          payload: { checkingWhitelistProgress: progress },
        })
      },
    })
    .then((res) => res.data)
}

async function checkBulkCreateForCampaign({
  campaignId,
  bulkCreateCsv,
  dispatch,
}: {
  campaignId: string
  bulkCreateCsv: File
  dispatch: React.Dispatch<BulkCreateMetaDataAction>
}): Promise<CheckBulkCreateResponse> {
  log('[POST] checkBulkCreate')
  const headers = getAuthorizationHeader()
  const formData = new FormData()
  formData.append('bulk_create_csv', bulkCreateCsv, bulkCreateCsv.name)

  return baseConfig
    .post(`/campaigns/${campaignId}/bulk-create-validity-check`, formData, {
      ...baseConfiguration,
      transformRequest: (data) => data,
      headers,
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 90
        dispatch({
          type: 'CHECKING',
          payload: { checkingBulkCreateProgress: progress },
        })
      },
    })
    .then((res) => res.data)
}

function downloadWhitelistForCampaign({
  campaignId,
  versionId,
}: {
  campaignId: string
  versionId?: string
}) {
  log('[GET] downloadWhitelist')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/campaigns/${campaignId}/whitelist/download`, {
      headers,
      params: {
        ...(versionId && { versionId }),
      },
    })
    .then((res) => res.data)
}

function fetchTemplateWhitelist() {
  log('[GET] downloadTemplateWhitelist')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/campaigns/whitelist/template/download`, {
      headers,
      params: {
        type: 'recipientId',
      },
    })
    .then((res) => res.data)
}

function fetchTemplateBulkCreate() {
  log('[GET] downloadTemplateBulkCreate')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/campaigns/bulk-create/template-download`, { headers })
    .then((res) => res.data)
}

function checkIfRecipientInWhitelistForCampaign({
  campaignId,
  recipientId,
}: {
  campaignId: string
  recipientId: string
}) {
  log('[GET] checkUserAgainstWhitelist')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/campaigns/${campaignId}/whitelist/check`, {
      headers,
      params: { recipientId },
    })
    .then((res) => res.data)
}

function fetchCampaignSmsUsage(campaignId: string): Promise<CampaignSmsUsage> {
  log('[INFO] fetchCampaignSmsUsage')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/campaigns/${campaignId}/sms-usage`, { headers })
    .then((res) => res.data)
}

function addTwilioCredentials({
  campaignId,
  credentials,
}: {
  campaignId: string
  credentials: TwilioCredentials
}) {
  log('[INFO] addTwilioCredentials')
  const headers = getAuthorizationHeader()
  return baseConfig
    .post(`/campaigns/${campaignId}/add-twilio-credentials`, credentials, {
      headers,
    })
    .then((res) => res.data)
}

function getTwilioCredentials(campaignId: string): Promise<TwilioCredentials> {
  log('[INFO] getTwilioCredentials')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/campaigns/${campaignId}/twilio-credentials`, { headers })
    .then((res) => res.data)
}

function checkIfAddressInBlacklistForCampaign({
  block,
  floor,
  unit,
  postalCode,
  campaignId,
}: {
  block: string
  floor: string | null
  unit: string | null
  postalCode: string
  campaignId: string
}) {
  log('[INFO] checkIfAddressInBlacklistForCampaign')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/campaigns/${campaignId}/blacklist`, {
      headers,
      params: {
        block,
        floor,
        unit,
        postalCode,
      },
    })
    .then((res) => res.data)
}

// Grouped Vouchers ===========================================================
// For actions on a specific voucher group such as:
// 1. POST to server to send out a specific voucher group to its receipient(s) using the contacts on
// the grouped vouchers.
function sendGroupVouchers({ groupId }: { groupId: string }) {
  log('[INFO] sendGroupVouchers')
  const headers = getAuthorizationHeader()
  return baseConfig
    .post(`/vouchers/${groupId}/send-group`, null, { headers })
    .then((res) => res.data)
}

function getVouchersToPrint({ groupId }: { groupId: string }) {
  log('[INFO] getVouchersToPrint')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/vouchers/${groupId}/vouchers-to-print`, { headers })
    .then((res) => res.data)
}

function updateGroupedVoucherDetails({
  groupId,
  updateGroupParams: { contactNumber, name },
}: UpdateGroupedVoucherDetailsParams) {
  log('[INFO] updateGroupedVoucherDetails')
  const headers = getAuthorizationHeader()
  return baseConfig
    .put(
      `/vouchers/${groupId}/recipient-details`,
      { contactNumber, name },
      { headers }
    )
    .then((res) => res.data)
}

// Merchants ===========================================================
// For admins to manage merchants of a specific campaign
function fetchCampaignMerchants({
  campaignId,
  after,
  before,
  search,
  limit,
}: {
  campaignId: string
  after?: string
  before?: string
  search?: string
  limit?: number
}) {
  log('[INFO] fetchAllMerchantsOfCampaign')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/campaigns/${campaignId}/merchants`, {
      headers,
      params: {
        after,
        before,
        search,
        limit,
      },
    })
    .then((res) => res.data)
}

function fetchMerchant(merchantId: string) {
  log('[INFO] fetchMerchant')
  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/merchants/${merchantId}`, { headers })
    .then((res) => res.data)
}

function updateMerchant(
  merchantId: string,
  updateMerchantFields: {
    shopName?: string
    shopUen?: string
    shopPostalCode?: string
    shopUnitNumber?: string
    shopStreetAddress?: string
    metadata?: object
    pocContactNumber?: string
    pocName?: string
    pocEmail?: string
  }
) {
  log('[PUT] updateMerchant')
  const headers = getAuthorizationHeader()
  const filteredFields = _.pickBy(
    updateMerchantFields,
    (value) => value !== undefined
  )
  return baseConfig
    .put(`/merchants/${merchantId}`, filteredFields, { headers })
    .then((res) => res.data?.merchant)
}

function updateMerchantPaymentDetails(
  merchantId: string,
  updateMerchantFields: {
    paymentBankAccountNumber?: string
    paymentBankAccountHolderName?: string
    paymentBankName?: string
    paymentPreferredPaymentMethod?: 'BANK_TRANSFER'
  }
) {
  log('[PUT] updateMerchantPaymentDetails')
  const headers = getAuthorizationHeader()
  const filteredFields = _.pickBy(
    updateMerchantFields,
    (value) => value !== undefined
  )
  return baseConfig
    .put(`/merchants/${merchantId}/payment`, filteredFields, { headers })
    .then((res) => res.data?.merchant)
}

function downloadAdminUsers(campaignId: string) {
  log('[GET] downloadAdminUsers')
  const headers = getAuthorizationHeader()

  return baseConfig
    .get(`campaigns/${campaignId}/download-campaign-user-roles`, {
      headers,
    })
    .then((res) => res.data)
}

function fetchCampaignMetrics(campaignId: string): Promise<CampaignMetricDto> {
  log('[GET] fetchCampaignMetrics')
  const headers = getAuthorizationHeader()

  return baseConfig
    .get(`campaigns/${campaignId}/metrics`, {
      headers,
    })
    .then((res) => res.data)
}

// Events ========================================================
// For fetching events
function fetchMerchantEvents({
  after,
  before,
  search,
  limit,
}: {
  after?: string
  before?: string
  search?: string
  limit?: number
}): Promise<MerchantEventResponse> {
  log('[INFO] fetchMerchantEvents')

  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/events/merchants`, {
      headers,
      params: { after, before, search, limit },
    })
    .then((res) => res.data)
}

function fetchCampaignEventsByCampaignId({
  campaignId,
  after,
  before,
  search,
  limit,
}: {
  campaignId: string
  after?: string
  before?: string
  search?: string
  limit?: number
}): Promise<CampaignEventResponse> {
  log('[INFO] fetchCampaignEventsByCampaignId')

  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/events/campaigns/${campaignId}`, {
      headers,
      params: { after, before, search, limit },
    })
    .then((res) => res.data)
}
function fetchGroupedVoucherEventsByGroupId({
  groupId,
  after,
  before,
  search,
  limit,
}: {
  groupId: string
  after?: string
  before?: string
  search?: string
  limit?: number
}): Promise<FetchedGroupedVourEventsDto> {
  log('[INFO] fetchGroupedVoucherEventsByGroupId')

  const headers = getAuthorizationHeader()
  return baseConfig
    .get(`/events/vouchers/${groupId}`, {
      headers,
      params: { after, before, search, limit },
    })
    .then((res) => res.data)
}

export {
  // Otp
  requestOtpByEmail,
  verifyOtpAndEmailForCredentials,
  // Sessions
  logout,
  // Permissions
  fetchUserPermissions,
  // Admin
  addAdminToCampaign,
  fetchCampaignAdmins,
  updateCampaignAdminPermissions,
  deleteCampaignAdminPermissions,
  // Campaigns
  createCampaign,
  updateCampaignDetails,
  updateCampaignVoucherDetails,
  fetchCampaignById,
  fetchCampaignStatsByCampaignId,
  fetchAllCampaigns,
  uploadWhitelistForCampaign,
  fetchTemplateWhitelist,
  checkWhitelistForCampaign,
  downloadWhitelistForCampaign,
  checkIfRecipientInWhitelistForCampaign,
  downloadAdminUsers,
  fetchCampaignSmsUsage,
  addTwilioCredentials,
  getTwilioCredentials,
  fetchCampaignMetrics,
  checkIfAddressInBlacklistForCampaign,
  // Vouchers
  fetchAllVouchersByCampaignId,
  createVoucherForCampaign,
  // Reports
  fetchCampaignSettlementReports,
  fetchCampaignSettlementReportURL,
  fetchCampaignTransactionReports,
  fetchCampaignTransactionReportURL,
  fetchCampaignVoucherReportURL,
  downloadCampaignVoucherLinks,
  // Groups
  sendGroupVouchers,
  updateGroupedVoucherDetails,
  getVouchersToPrint,
  // Merchants
  fetchCampaignMerchants,
  fetchMerchant,
  updateMerchant,
  updateMerchantPaymentDetails,
  // Events
  fetchMerchantEvents,
  fetchCampaignEventsByCampaignId,
  fetchGroupedVoucherEventsByGroupId,
  // Bulk Create
  checkBulkCreateForCampaign,
  fetchTemplateBulkCreate,
  submitBulkCreateForCampaign,
  checkBulkCreateJobStatus,
}
