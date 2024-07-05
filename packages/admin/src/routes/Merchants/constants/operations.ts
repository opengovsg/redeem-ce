import { MERCHANT_IDS_CSV, MERCHANT_INFO_CSV } from './csv'

const CSV_TEMPLATE_MESSAGE =
  'Download the required CSV template and modify according to the required fields.'

export const EXPECTED_PARAMS = {
  campaignId: {
    title: 'Campaign ID',
    description: 'Campaign identifier, eg. campaign_abcd1234.',
  },
  campaignIdFrom: {
    title: 'Campaign ID From',
    description: 'Campaign identifier to copy FROM, eg. campaign_abcd1234.',
  },
  campaignIdTo: {
    title: 'Campaign ID To',
    description: 'Campaign identifier to copy TO, eg. campaign_abcd1234.',
  },
  merchantIds: {
    title: 'Merchant IDs',
    description: CSV_TEMPLATE_MESSAGE,
  },
  campaignIds: {
    title: 'Campaign IDs',
    description: CSV_TEMPLATE_MESSAGE,
  },
  merchantInformation: {
    title: 'Merchant Information',
    description: CSV_TEMPLATE_MESSAGE,
  },
  merchantTypes: {
    title: 'Merchant types',
    description:
      'Pick one merchant type, eg. only CDC campaigns should have supermarket/heartland types! Even then, you should only be adding heartland types.',
  },
}

// TODO: Standardise path names as they are used for template CSV names as well.
// Eg. The template CSV name: create-and-add.csv might be confusing for creating and adding merchants to a campaign.
export const OPERATIONS = {
  merchant: {
    createAndAdd: {
      title: 'Create & Add to Campaign',
      subtitle: 'Create and add new merchants to a campaign',
      expectedParams: [
        EXPECTED_PARAMS.campaignId,
        EXPECTED_PARAMS.merchantInformation,
      ],
      path: 'create-and-add',
      verboseTitle: 'Create and Add New Merchants to Campaign',
      csv: MERCHANT_INFO_CSV,
    },
    addExisting: {
      title: 'Add to Campaign',
      subtitle: 'Add existing merchants to a campaign',
      expectedParams: [
        EXPECTED_PARAMS.merchantTypes,
        EXPECTED_PARAMS.campaignId,
        EXPECTED_PARAMS.merchantIds,
      ],
      path: 'add-existing',
      verboseTitle: 'Add Existing Merchants to Campaign',
      csv: MERCHANT_IDS_CSV,
    },
    remove: {
      title: 'Remove from Campaign',
      subtitle: 'Remove merchants from a campaign',
      expectedParams: [EXPECTED_PARAMS.campaignId, EXPECTED_PARAMS.merchantIds],
      path: 'remove',
      verboseTitle: 'Remove Existing Merchants from Campaign',
      csv: MERCHANT_IDS_CSV,
    },
    sendAccessCode: {
      title: 'Send Access Codes',
      subtitle: 'Send access codes to your merchants',
      expectedParams: [EXPECTED_PARAMS.merchantIds],
      path: 'send-access-code',
      verboseTitle: 'Send Existing Merchants Access Codes',
      csv: MERCHANT_IDS_CSV,
    },
    copy: {
      title: 'Copy from Campaign',
      subtitle: 'Copy merchants from a campaign to another',
      expectedParams: [
        EXPECTED_PARAMS.campaignIdFrom,
        EXPECTED_PARAMS.campaignIdTo,
      ],
      path: 'copy',
      verboseTitle: 'Copy Existing Merchants from Campaign to Another',
    },
  },
}

export const MERCHANT_NO_TYPE = 'merchant_no_type'
