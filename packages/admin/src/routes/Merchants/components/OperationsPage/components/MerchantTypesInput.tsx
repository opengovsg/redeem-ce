import React from 'react'
import { Radio, RadioGroup, VStack, Text } from '@chakra-ui/react'
import { MerchantTypeInputProps } from '../types'
import { MERCHANT_NO_TYPE } from '../../../constants/operations'

export const MerchantTypeInput = ({
  merchantType,
  setMerchantType,
}: MerchantTypeInputProps): JSX.Element => {
  return (
    <VStack alignItems="left">
      <Text textStyle="subhead1" marginBottom="12px" color="neutral.900">
        Choose Merchant Type
      </Text>
      <RadioGroup
        colorScheme="primary"
        defaultValue={merchantType}
        onChange={(event) => setMerchantType(event as string)}
        size="lg"
      >
        <VStack>
          <Radio value={MERCHANT_NO_TYPE}>
            <Text textStyle="subhead1" color="neutral.900">
              This merchant can accept both regular and supermarket vouchers
            </Text>
          </Radio>
          <Radio value="regular" textStyle="subhead1" color="neutral.900">
            <Text textStyle="subhead1" color="neutral.900">
              This merchant can only accept regular vouchers
            </Text>
          </Radio>
          <Radio value="supermarket" textStyle="subhead1" color="neutral.900">
            <Text textStyle="subhead1" color="neutral.900">
              This merchant can only accept supermarket vouchers
            </Text>
          </Radio>
        </VStack>
      </RadioGroup>
    </VStack>
  )
}
