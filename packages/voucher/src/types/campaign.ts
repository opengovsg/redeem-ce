export type CampaignValidity =
  | 'campaign_not_started'
  | 'campaign_ended'
  | 'campaign_valid'

export type Campaign = {
  advisoryUrl: string | null
  category: string | null
  createdAt: string
  colour: string | null
  defaultVouchers: Record<string, unknown>[] | null
  description: string | null
  extraQrPrefix: string | null
  id: string
  logoBackgroundColor: string | null
  logoQrUrl: string | null
  logoUrl: string | null
  merchantListUrl: string | null
  metadata: Record<string, unknown>
  name: string | null
  organiserContactNumber: string | null
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
  voucherColours: Record<string, unknown>[] | null
}
