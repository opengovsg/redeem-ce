export const CDC_MERCHANT_LIST_URL =
  'https://www.gowhere.gov.sg/cdcvouchersmerchants'
export const CDC_ADVISORY_URL = 'https://www.cdc.gov.sg/'
export const REDEEM_FEEDBACK_URL = 'https://go.gov.sg/redeemsgfeedback'
// Temporarily putting it as redeem's website
export const CDC_TERMS_AND_CONDITIONS = 'https://redeem.gov.sg/'

export const defaultCampaign = {
  object: 'grouped_vouchers',
  campaign: {
    created_at: '2022-08-31T16:26:15.742+08:00',
    updated_at: '2022-08-31T16:26:15.742+08:00',
    id: 'campaign_4feecf0e-b20f-48b2-bee9-04c4de9dbf5a',
    name: 'CDC Vouchers 2023',
    description:
      'This is a test campaign which might or might not have voucher types',
    organiser_name: 'Community Development Council',
    organiser_email: 'enquiries@cdc.gov.sg',
    organiser_contact_number: '6562255322',
    organiser_feedback_url: 'https://form.gov.sg',
    organiser_location: 'Visit your nearest Community Centre/Club (CC)',
    merchant_list_url: CDC_MERCHANT_LIST_URL,
    advisory_url: CDC_ADVISORY_URL,
    logo_url: 'https://statics.redeem.gov.sg/campaign_logo/cdc_identifier.png',
    logo_qr_url:
      'https://statics.redeem.gov.sg/campaign_logo/cdc_identifier.png',
    colour: 'blue',
    owner: 'user_cc14a4e3-b428-49a0-8a3e-92fd55e2acd6',
    validity_start: '2021-01-01T00:00:00.000+08:00',
    validity_end: '2099-12-12T00:00:00.000+08:00', // TODO: Extend if E2E fails
    validity: 'campaign_valid',
    default_vouchers: [
      {
        value: 10,
        quantity: 2,
      },
      {
        value: 5,
        quantity: 5,
      },
      {
        value: 2,
        quantity: 5,
      },
    ],
    voucher_colours: [
      {
        value: 'default',
        colour: 'blue',
      },
    ],
    is_deleted: false,
    metadata: {},
    tnc_url: CDC_TERMS_AND_CONDITIONS,
  },
}

export const endedCampaign = {
  object: 'grouped_vouchers',
  campaign: {
    created_at: '2022-08-31T16:26:15.742+08:00',
    updated_at: '2022-08-31T16:26:15.742+08:00',
    id: 'campaign_4feecf0e-b20f-48b2-bee9-04c4de9dbf5a',
    name: 'CDC Vouchers 2023',
    description:
      'This is a test campaign which might or might not have voucher types',
    organiser_name: 'Community Development Council',
    organiser_email: 'enquiries@cdc.gov.sg',
    organiser_contact_number: '6562255322',
    organiser_feedback_url: 'https://form.gov.sg',
    organiser_location: 'Visit your nearest Community Centre/Club (CC)',
    merchant_list_url: CDC_MERCHANT_LIST_URL,
    advisory_url: CDC_ADVISORY_URL,
    logo_url: 'https://statics.redeem.gov.sg/campaign_logo/cdc_identifier.png',
    logo_qr_url:
      'https://statics.redeem.gov.sg/campaign_logo/cdc_identifier.png',
    colour: 'blue',
    owner: 'user_cc14a4e3-b428-49a0-8a3e-92fd55e2acd6',
    validity_start: '2021-01-01T00:00:00.000+08:00',
    validity_end: '2021-12-12T00:00:00.000+08:00',
    validity: 'campaign_ended',
    default_vouchers: [
      {
        value: 10,
        quantity: 2,
      },
      {
        value: 5,
        quantity: 5,
      },
      {
        value: 2,
        quantity: 5,
      },
    ],
    voucher_colours: [
      {
        value: 'default',
        colour: 'blue',
      },
    ],
    is_deleted: false,
    metadata: {},
  },
}

export const generalVouchersEndedCampaign = {
  ...endedCampaign,
  campaign: {
    ...endedCampaign.campaign,
    name: 'IRAS Staff Welfare Vouchers',
    category: 'redeemsg_general_vouchers',
  },
}

// TODO: Extend validity start and end past current date if tests start failing
// for not started campaigns.
export const notStartedCampaign = {
  object: 'grouped_vouchers',
  campaign: {
    created_at: '2022-08-31T16:26:15.742+08:00',
    updated_at: '2022-08-31T16:26:15.742+08:00',
    id: 'campaign_4feecf0e-b20f-48b2-bee9-04c4de9dbf5a',
    name: 'CDC Vouchers 2023',
    description:
      'This is a test campaign which might or might not have voucher types',
    organiser_name: 'Community Development Council',
    organiser_email: 'enquiries@cdc.gov.sg',
    organiser_contact_number: '6562255322',
    organiser_feedback_url: 'https://form.gov.sg',
    organiser_location: 'Visit your nearest Community Centre/Club (CC)',
    merchant_list_url: CDC_MERCHANT_LIST_URL,
    advisory_url: CDC_ADVISORY_URL,
    logo_url: 'https://statics.redeem.gov.sg/campaign_logo/cdc_identifier.png',
    logo_qr_url:
      'https://statics.redeem.gov.sg/campaign_logo/cdc_identifier.png',
    colour: 'blue',
    owner: 'user_cc14a4e3-b428-49a0-8a3e-92fd55e2acd6',
    validity_start: '2024-01-01T00:00:00.000+08:00',
    validity_end: '2024-12-12T00:00:00.000+08:00',
    validity: 'campaign_not_started',
    default_vouchers: [
      {
        value: 10,
        quantity: 2,
      },
      {
        value: 5,
        quantity: 5,
      },
      {
        value: 2,
        quantity: 5,
      },
    ],
    voucher_colours: [
      {
        value: 'default',
        colour: 'blue',
      },
    ],
    is_deleted: false,
    metadata: {},
  },
}

export const generalVouchersNotStartedCampaign = {
  ...notStartedCampaign,
  campaign: {
    ...notStartedCampaign.campaign,
    name: 'IRAS Staff Welfare Vouchers',
    category: 'redeemsg_general_vouchers',
  },
}

export const defaultPerson = {
  created_at: '2022-09-08T14:46:52.260+08:00',
  updated_at: '2022-09-13T18:32:28.278+08:00',
  virtual_address:
    'Blk 1234 Lower XYZ Mee Siam Road, #15-3960, SINGAPORE 123456',
  id: 'UQGVUCIN1S6BZY3',
  block: 'Blk 1234',
  street: 'Lower XYZ Mee Siam Road',
  floor: '15',
  unit: '3960',
  postal_code: '123456',
  campaign_id: 'campaign_4feecf0e-b20f-48b2-bee9-04c4de9dbf5a',
  is_deleted: false,
  is_sent: true,
  is_viewed: true,
  metadata: {},
  unique_key: 'campaign_4feecf0e-b20f-48b2-bee9-04c4de9dbf5a.758780.1.10.10.',
  vouchers: [], // Placeholder for other exported constants to overwrite.
}
