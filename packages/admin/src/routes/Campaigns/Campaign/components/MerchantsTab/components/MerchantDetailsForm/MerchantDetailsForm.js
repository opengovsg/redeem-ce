import React from 'react'
import { PropTypes } from 'prop-types'
import { CONTACT_NUMBER_PREFIX } from 'constants/string'
import _ from 'lodash'
import { Table, Tr, Td, Tbody, Text, VStack } from '@chakra-ui/react'
import { capitalCase } from 'capital-case'
import { PAYMENT_RELATED_STRING_CHARACTER_REGEX } from 'constants/merchants'
import BaseUpdateMerchantForm from '../BaseUpdateMerchantForm'

const FORM = [
  {
    label: 'Merchant details',
    fields: {
      MERCHANT_NAME: {
        id: 'shopName',
        display: 'Shop Name',
        maxLength: 100,
        type: 'text',
        required: true,
        isInputValid: (input) =>
          PAYMENT_RELATED_STRING_CHARACTER_REGEX.test(input),
        defaultValue: ({ shopName }) => shopName || '',
      },
      MERCHANT_UEN: {
        id: 'shopUen',
        display: 'UIN/UEN Number',
        maxLength: 100,
        type: 'text',
        required: false,
        defaultValue: ({ shopUen }) => shopUen || '',
      },
      MERCHANT_UNIT_NUMBER: {
        id: 'shopUnitNumber',
        display: 'Unit Number',
        maxLength: 100,
        type: 'text',
        required: false,
        defaultValue: ({ shopUnitNumber }) => shopUnitNumber || '',
      },
      MERCHANT_STREET_ADDRESS: {
        id: 'shopStreetAddress',
        display: 'Street Address',
        maxLength: 100,
        type: 'text',
        required: false,
        defaultValue: ({ shopStreetAddress }) => shopStreetAddress || '',
      },
      MERCHANT_POSTAL_CODE: {
        id: 'shopPostalCode',
        display: 'Postal Code',
        maxLength: 100,
        type: 'text',
        required: false,
        defaultValue: ({ shopPostalCode }) => shopPostalCode || '',
      },
    },
  },
  {
    label: 'Point of contact details',
    fields: {
      MERCHANT_POC_CONTACT_NUMBER: {
        id: 'pocContactNumber',
        display: 'Contact Number',
        maxLength: 100,
        type: 'text',
        required: true,
        defaultValue: ({ pocContactNumber }) => {
          if (
            _.startsWith(pocContactNumber, CONTACT_NUMBER_PREFIX) &&
            pocContactNumber?.length === 10
          ) {
            return pocContactNumber.substring(CONTACT_NUMBER_PREFIX.length)
          }
          return pocContactNumber
        },
      },
      MERCHANT_POC_NAME: {
        id: 'pocName',
        display: 'Name',
        maxLength: 100,
        type: 'text',
        required: false,
        defaultValue: ({ pocName }) => pocName || '',
      },
      MERCHANT_POC_EMAIL: {
        id: 'pocEmail',
        display: 'Email',
        maxLength: 100,
        type: 'text',
        required: false,
        defaultValue: ({ pocEmail }) => pocEmail || '',
      },
    },
  },
]

export default function MerchantDetailsForm({
  merchant,
  onPrimaryClick,
  isPrimaryLoading,
}) {
  const onSubmit = (data) => {
    const contactNumberFieldName = FORM[1].fields.MERCHANT_POC_CONTACT_NUMBER.id
    onPrimaryClick({
      ...data,
      [contactNumberFieldName]:
        CONTACT_NUMBER_PREFIX + data[contactNumberFieldName],
    })
  }
  return (
    <BaseUpdateMerchantForm
      formFields={FORM}
      merchant={merchant}
      onPrimaryClick={onSubmit}
      isPrimaryLoading={isPrimaryLoading}
    >
      <VStack align="stretch" spacing="24px">
        <Text textStyle="h4" color="primary.500">
          Metadata
        </Text>
        <Table colorScheme="primary">
          <Tbody>
            {_(merchant.metadata)
              .toPairs()
              .map(([key, value]) => (
                <Tr key={`${key}-${value}`}>
                  <Td key="key">
                    <b>{capitalCase(key)}</b>
                  </Td>
                  <Td key="value">{value}</Td>
                </Tr>
              ))
              .value()}
          </Tbody>
        </Table>
      </VStack>
    </BaseUpdateMerchantForm>
  )
}

MerchantDetailsForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  merchant: PropTypes.objectOf(PropTypes.any).isRequired,
  onPrimaryClick: PropTypes.func.isRequired,
  isPrimaryLoading: PropTypes.bool.isRequired,
}
