import { CAMPAIGN1_ID, TEST_USER_ID } from '../../../../constants'

export const API_GET_CAMPAIGN_ROLES_RESPONSE = {
  object: 'user_actions',
  data: [
    {
      actions: [],
      actor_id: TEST_USER_ID,
      conditions: null,
      created_at: '2023-03-15T17:05:51.249+08:00',
      updated_at: '2023-03-15T17:05:51.249+08:00',
      email: 'team@redeem.gov.sg',
      metadata: {},
      resource_id: CAMPAIGN1_ID,
      roles: ['finance', 'operations', 'admin'],
    },
  ],
}

export const API_GET_CAMPAIGN_WITH_WHITELIST_AND_LIST_OF_WHITELISTS_RESPONSE = {
  object: 'campaign',
  advisory_url: 'https://cdc.gov.sg',
  colour: 'green',
  created_at: '2021-07-05T15:03:25.459+08:00',
  description: '$999 CDC Vouchers',
  eligibility: 'signup_allowlist',
  id: CAMPAIGN1_ID,
  is_active: true,
  logo_url: 'https://v-staging.redeem.gov.sg/images/fridge_logo.png',
  metadata: {
    whitelistVersions: [
      {
        fileName: 'NOERROR-100.csv',
        s3VersionId: 'N_deUC1f4psGROKrjKu8msEBt3IkPZ.j',
        lastModified: '2023-04-06T12:19:33.531+08:00',
        versionIndex: '8',
        numRecipients: 101,
      },
      {
        fileName: 'NOERROR-1MILLION.csv',
        s3VersionId: 'J.yMNCjfENYzn0Z_0bOCfmn1SsliY6oz',
        lastModified: '2023-04-06T12:18:54.773+08:00',
        versionIndex: '7',
        numRecipients: 1000000,
      },
      {
        fileName: 'NOERROR-100.csv',
        s3VersionId: 'au0g1Sfq.wiafZzhS1IRnTfBf7yyzALH',
        lastModified: '2023-04-06T12:16:53.792+08:00',
        versionIndex: '6',
        numRecipients: 101,
      },
      {
        fileName: 'NOERROR-100.csv',
        s3VersionId: 'fftBWrDsYssgP.GAn9Z9WsiBOW9HjVsM',
        lastModified: '2023-04-06T11:31:35.084+08:00',
        versionIndex: '5',
        numRecipients: 101,
      },
      {
        fileName: 'NOERROR-100.csv',
        s3VersionId: 'd4Zkf9T1Cl84R9vhjwv_oIeu__bFhosi',
        lastModified: '2023-04-06T11:30:58.134+08:00',
        versionIndex: '4',
        numRecipients: 101,
      },
      {
        fileName: 'NOERROR-100.csv',
        s3VersionId: 'oCq5mnXPdORsbXyaUlk5KGcPf59uOBLY',
        lastModified: '2023-04-06T11:25:50.792+08:00',
        versionIndex: '3',
        numRecipients: 101,
      },
      {
        fileName: 'NOERROR-100.csv',
        s3VersionId: '2dZnQcy1KqERqgnCWbYi.eQ3rhNb3Y25',
        lastModified: '2023-04-06T11:25:19.585+08:00',
        versionIndex: '2',
        numRecipients: 101,
      },
      {
        fileName: 'NOERROR-100.csv',
        s3VersionId: 'vOWSS84GKVQUtz0CNKYIBdFU0pC5yNVG',
        lastModified: '2023-04-06T11:25:08.183+08:00',
        versionIndex: '1',
        numRecipients: 101,
      },
    ],
  },
  name: '8 July CDC Trial',
  organiser_email: 'cdc@fake-email.gov.sg',
  organiser_name: 'Community Development Council',
  owner: TEST_USER_ID,
  updated_at: '2021-08-04T19:05:02.114+08:00',
  default_vouchers: [
    { value: 1, quantity: 1 },
    { value: 4, quantity: 1 },
  ],
  voucher_colours: [{ value: 'default', colour: 'blue' }],
  validity: 'campaign_valid',
  validity_end: '2024-03-22T22:26:31.040+08:00',
  validity_start: '2021-03-22T22:26:31.040+08:00',
  visibility: 'public',
}

export const API_GET_TEMPLATE_WHITELIST_DOWNLOAD_RESPONSE = {
  link: 'fake link',
  object: 'whitelist_version_download_link',
}
