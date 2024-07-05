// Add merchants to campaign
interface AddMerchantsToCampaignRequest {
  campaignId: string
  merchantIds: string[]
  campaignMerchantType: string
}

interface AddMerchantsToCampaignSuccessResponse {
  created: true
  metadata: Record<string, unknown>
  role: string
  created_at: string
  updated_at: string
  merchant_id: string
  campaign_id: string
  campaign_merchant_type: string | null
}

interface AddMerchantsToCampaignFailureResponse {
  created: false
  merchant_id: string
  campaign_id: string
  metadata?: Record<string, unknown>
  error: string
}

type AddMerchantsToCampaignResponseBody =
  | AddMerchantsToCampaignSuccessResponse
  | AddMerchantsToCampaignFailureResponse

interface AddMerchantsToCampaignResponse {
  data: AddMerchantsToCampaignResponseBody[]
}

// Remove merchants from campaign
interface RemoveMerchantsFromCampaignRequest {
  campaignId: string
  merchantIds: string[]
}

type RemoveMerchantFromCampaignResponseBody = {
  deleted: boolean
  merchant_id: string
  campaign_id: string
  error?: string
}

type RemoveMerchantsFromCampaignResponse = {
  data: RemoveMerchantFromCampaignResponseBody[]
}

// Create and add merchants to campaign
interface MerchantInfoForResponse {
  created_at: string | null
  updated_at: string | null
  id: string
  access_code: string | null
  payment_preferred_payment_method: 'BANK_TRANSFER' | null
  payment_bank_name: string | null
  payment_bank_account_holder_name: string | null
  payment_bank_account_number: string | null
  shop_name: string | null
  shop_uen: string | null
  shop_unit_number: string | null
  shop_street_address: string | null
  shop_postal_code: string | null
  poc_contact_number: string | null
  poc_email: string | null
  poc_name: string | null
  is_deleted: boolean
  metadata: Record<string, unknown>
}

interface CreateAndAddMerchantRequest {
  campaignId: string
  merchants: MerchantInfoForResponse[]
}

type CreateAndAddMerchantSuccess = {
  created: true
  merchant: MerchantInfoForResponse
}

type CreateAndAddMerchantError = {
  created: false
  merchant: MerchantInfoForResponse
  campaign_id: string
  error: string
}

type CreateAndAddMerchantResponseBody =
  | CreateAndAddMerchantSuccess
  | CreateAndAddMerchantError

type CreateAndAddMerchantsResponse = {
  data: CreateAndAddMerchantResponseBody[]
}

// Send merchants access codes
interface SendMerchantsAccessCodeRequest {
  merchantIds: string[]
}

type SendMerchantsAccessCodeResponseBody = {
  sent: boolean
  merchant_id: string
  error?: string
}

type SendMerchantsAccessCodeResponse = {
  data: SendMerchantsAccessCodeResponseBody[]
}

// Copy merchants
interface CopyMerchantsFromCampaignToAnotherRequest {
  campaignToCopyFrom: string
  campaignToCopyTo: string
}

type CopyMerchantsFromCampaignToAnotherSuccessResponse =
  AddMerchantsToCampaignSuccessResponse
type CopyMerchantsFromCampaignToAnotherFailureResponse =
  AddMerchantsToCampaignFailureResponse

type CopyMerchantsFromCampaignToAnotherResponseBody =
  | CopyMerchantsFromCampaignToAnotherSuccessResponse
  | CopyMerchantsFromCampaignToAnotherFailureResponse

interface CopyMerchantsFromCampaignToAnotherResponse {
  data: CopyMerchantsFromCampaignToAnotherResponseBody[]
}

export type {
  AddMerchantsToCampaignRequest,
  AddMerchantsToCampaignResponse,
  RemoveMerchantsFromCampaignRequest,
  RemoveMerchantsFromCampaignResponse,
  CreateAndAddMerchantRequest,
  CreateAndAddMerchantsResponse,
  SendMerchantsAccessCodeRequest,
  SendMerchantsAccessCodeResponse,
  MerchantInfoForResponse,
  CopyMerchantsFromCampaignToAnotherRequest,
  CopyMerchantsFromCampaignToAnotherResponse,
}
