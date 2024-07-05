import { formatTime } from 'services/utils'

// Column-level data configuration for the table
export const TABLE_COLUMN_CONFIG = {
  NAME: {
    key: 'shopName',
    display: 'Name',
    formatValue: ({ shopName }) => shopName,
  },
  STREET_ADDRESS: {
    key: 'shopStreetAddress',
    display: 'Street Address',
    formatValue: ({ shopStreetAddress }) => shopStreetAddress,
  },
  UNIT_NUMBER: {
    key: 'shopUnitNumber',
    display: 'Unit No.',
    formatValue: ({ shopUnitNumber }) => shopUnitNumber,
  },
  POSTAL_CODE: {
    key: 'shopPostalCode',
    display: 'Postal Code',
    formatValue: ({ shopPostalCode }) => shopPostalCode,
  },
  MERCHANT_CODE: {
    key: 'accessCode',
    display: 'Merchant Code',
    formatValue: ({ accessCode }) => accessCode,
  },
  UPDATED_AT: {
    key: 'updatedAt',
    display: 'Last updated',
    formatValue: ({ updatedAt }) => formatTime(updatedAt),
  },
}
