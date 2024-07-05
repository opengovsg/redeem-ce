import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import _ from 'lodash'
import { getEditedText } from '../../utils'

type MerchantEventBodyProps = {
  event: string
  data: any
  merchantId: string
}

export const MerchantEventBody = ({
  event,
  data,
  merchantId,
}: MerchantEventBodyProps): JSX.Element => {
  switch (event) {
    case 'merchant_edit_general':
    case 'merchant_edit_finance': {
      const { before, after } = data
      return (
        <Box>
          {[
            <Text key={0}>
              {before.shopName || 'null'} with ID {before.id} was edited
            </Text>,
            ..._.union(Object.keys(before), Object.keys(after)).map((key) =>
              getEditedText(before, after, key)
            ),
          ]}
        </Box>
      )
    }
    case 'merchant_send_access_code': {
      return (
        <Box>
          <Text>
            {`SMS with access code was sent to `}
            <Text as="span" textStyle="subhead2" color="primary.500">
              merchant-ID {merchantId}
            </Text>
            {` via contact number ${data.contactNumber}.`}
          </Text>
        </Box>
      )
    }
    case 'merchant_notify_payment_info_updated': {
      return (
        <Box>
          <Text>
            {`SMS to notify payment details updated was sent to `}
            <Text as="span" textStyle="subhead2" color="primary.500">
              merchant-ID {merchantId}
            </Text>
            {` via contact number ${data.contactNumber}.`}
          </Text>
        </Box>
      )
    }
    case 'merchant_create_api_key': {
      return (
        <Box>
          <Text>
            {`API key for `}
            <Text as="span" textStyle="subhead2" color="primary.500">
              merchant-ID {data.merchantId}
            </Text>
            {` was created.`}
          </Text>
        </Box>
      )
    }
    default:
      return <Text whiteSpace="pre">{JSON.stringify(data, null, 2)}</Text>
  }
}
