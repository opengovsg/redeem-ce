import type { JsonObject } from 'type-fest'

export type VoucherValue = { quantity: number; value: number; type: string }
type VoucherColour = { colour: string; value: string | number }

export type VerifyOtpResponse = {
  user: {
    id: string
    contactNumber: string | null
    email: string | null
    name: string | null
  }
  token: string
}

export type UserRole = {
  actorId: string
  resourceId: string
  roles: string[]
  actions: string[]
}

export type ListUserRolesForUserResponse = {
  data: UserRole[]
}

type CampaignValidity =
  | 'campaign_not_started'
  | 'campaign_ended'
  | 'campaign_valid'

export type CampaignVisibility = 'public' | 'private'

export enum CampaignEligibility {
  signup_allowlist = 'signup_allowlist',
  signup_conditions_address = 'signup_conditions_address',
  signup_conditions_hdb = 'signup_conditions_hdb',
  no_signup = 'no_signup',
}

// This is not the full list of return fields from the backend, but you can pick what you need in the FE
export type Campaign = {
  advisoryUrl: string | null
  category: string | null
  colour: string | null
  createdAt: string
  customCredentialsEnabled: boolean
  defaultVouchers: VoucherValue[] | null
  description: string | null
  eligibility: CampaignEligibility
  extraQrPrefix: string | null
  id: string
  isDeleted: boolean
  name: string | null
  logoUrl: string | null
  merchantListUrl: string | null
  metadata: Record<any, any>
  organiserEmail: string | null
  organiserFeedbackUrl: string | null
  organiserLocation: string | null
  organiserName: string | null
  owner: string | null
  tncUrl: string | null
  updatedAt: string
  validity: CampaignValidity
  validityEnd: string
  validityStart: string
  visibility: CampaignVisibility
  voucherColours: VoucherColour[] | null
}

export type CampaignEvent = {
  id: number
  event: string
  campaignId: string
  actorId: string
  data: JsonObject | null
  createdAt: string
  updatedAt: string
  actorEmail?: string
}

export type MerchantEvent = {
  id: number
  event: string
  merchantId: string
  actorId: string
  actorEmail: string | null
  data: JsonObject | null
  createdAt: string
  updatedAt: string
}

export type PaginatedResponse<T> = {
  pageInfo: {
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor: string
    endCursor: string
  }
  data: T[]
}

export type CampaignEventResponse = PaginatedResponse<CampaignEvent>
export type MerchantEventResponse = PaginatedResponse<MerchantEvent>

export type BaseWhitelistMetaData = {
  numberOfRows: number
  numberOfDuplicates: number
  numberOfInvalidIds: number
}

export const enum WhitelistCheckValidityResponseType {
  SUCCESS,
  INVALID_PARAMS,
  ERROR,
}

export type BaseBulkCreateMetaData = {
  numberOfRows: number
  numberOfEmptyRows: number
  numberOfInvalidRecipientIds: number
  numberOfInvalidMobileNumber: number
  numberOfDuplicateMobileNumber: number
  numberOfDuplicateName: number
  numberOfDuplicateRecipientIds: number
  numberOfMissingMobileNumber: number
  numberOfMissingName: number
  numberOfMissingRecipientIds: number
}

export const enum BulkCreateCheckValidityResponseType {
  CHECKING_SUCCESS,
  INVALID_PARAMS,
  ERROR,
}

export type CheckWhitelistResponse = {
  href: string
  whitelistMetadata: BaseWhitelistMetaData
  hasWhitelistError: boolean
}

export type CheckBulkCreateResponse = {
  href: string
  bulkCreateMetadata: BaseBulkCreateMetaData
  hasBulkCreateError: boolean
  haveExtraDetails: boolean
}

export type SubmitBulkCreateResponse = {
  jobId: string
}

export enum BulkCreateJobStatus {
  not_started = 'not_started',
  started = 'started',
  success = 'success',
  failure = 'failure',
}

export type CheckBulkCreateJobStatusResponse = {
  jobStatus: BulkCreateJobStatus
  numSuccessfulCreations: number
  numOfGroupedVouchersToCreate: number
}

// Types that are manually retrieved from the backend.
// Note that these types below might be outdated

type ListVoucherResponseObject = {
  id: string
  label: string | null
  state: string
  metadata: Record<any, any>
  lastRedeemedTimestamp: string | null
  voucherValue: number
  groupId: string | null
  type: string | null
}

type AddressBody = {
  postalCode: string | null
  block: string | null
  floor: string | null
  unit: string | null
  street: string | null
}

export type VoucherType = AddressBody & {
  id: string
  campaignId: string
  name: string | null
  contactNumber: string | null
  recipientId: string | null
  metadata: Record<string, unknown>
  vouchers: ListVoucherResponseObject[]
}

export type UpdateCampaignDetailsProp = {
  campaignName?: string
  campaignDescription?: string
  campaignOrganiserName?: string
  campaignOrganiserEmail?: string | null
  campaignLogoUrl?: string | null
  campaignMerchantListUrl?: string | null
  campaignOrganiserFeedbackUrl?: string | null
  campaignOrganiserLocation?: string | null
}

export type UpdateCampaignVoucherDetailsProp = {
  campaignAdvisoryUrl?: string | null
  campaignColour?: string
  campaignDefaultVouchers?: (Omit<VoucherValue, 'type'> | VoucherValue)[]
  campaignLogoUrl?: string
  campaignTncUrl?: string | null
  campaignVoucherColours?: VoucherColour[]
}

export type UpdateCampaignProps = {
  campaignAdvisoryUrl?: string | null
  campaignColour?: string
  campaignDefaultVouchers?: (Omit<VoucherValue, 'type'> | VoucherValue)[]
  campaignDescription?: string
  campaignName?: string
  campaignLogoUrl?: string | null
  campaignMerchantListUrl?: string | null
  campaignOrganiserEmail?: string | null
  campaignOrganiserFeedbackUrl?: string | null
  campaignOrganiserLocation?: string | null
  campaignOrganiserName?: string
  campaignTncUrl?: string | null
  campaignVoucherColours?: VoucherColour[]
}

export type CampaignSmsUsage = {
  smsUsage: number
}

export type TwilioCredentials = {
  accountSid: string
  authToken: string
  messagingServiceSid: string
}

export type DownloadCampaignVoucherLinksResponse = {
  downloadUrl: string
}

export type MetricIdentifierToValue = {
  identifier: string
  value: number
}

type SingleValueMetric = {
  header: string
  isSingleValue: true
  value: number
  breakdown?: MetricIdentifierToValue[] | null
}

// Denotes graph
type MultipleValueMetric = {
  header: string
  isSingleValue: false
  value: MetricIdentifierToValue[]
}

export type Metric = SingleValueMetric | MultipleValueMetric

export type CampaignMetricDto = {
  // Vouchers Related
  totalVouchersClaimed: Metric
  totalNumberOfVouchersWithAtLeastOneRedemption: Metric
  totalVouchersClaimedPerMonth: Metric
  totalVouchersClaimedPerDay: Metric
  // Transaction Related
  totalNumberOfTransactions: Metric
  totalValueOfTransactions: Metric
  averageTransactionValue: Metric
  totalValueOfTransactionsPerMonth: Metric
  totalValueOfTransactionsPerDay: Metric
  // Merchants Related
  totalNumberOfMerchants: Metric
  merchantTransactionValues: Metric
  totalNumberOfMerchantsWithAtLeastOneRedemption: Metric
  latestDataDateRetrieved: string
}

export type UpdateGroupedVoucherDetailsParams = {
  groupId: string
  updateGroupParams: { contactNumber: string | null; name: string | null }
}

export type CreateVoucherForCampaignParams = {
  campaignId: string
  label?: string
  name?: string
  contactNumber?: string
  recipientId?: string
  street?: string
  floor?: string
  postalCode?: string
  unit?: string
  block?: string
  values?: VoucherValue[]
}

export type GroupedVoucherEventResponseObject = {
  id: number
  event: string
  data: JsonObject | null
  readonly createdAt: string
  readonly updatedAt: string
}

export type FetchedGroupedVourEventsDto = {
  pageInfo: {
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor: string
    endCursor: string
  }
  data: GroupedVoucherEventResponseObject[]
}

export type LogoutResponse = {
  deleted: true
}
