import React from 'react'
import { VStack, HStack, Text } from '@chakra-ui/react'
import { RequiredFieldsProps } from '../types'

export const RequiredFields = ({
  expectedParams,
}: RequiredFieldsProps): JSX.Element => {
  return (
    <VStack alignItems="flex-start" spacing={2}>
      <Text textStyle="subhead3" textColor="neutral.500">
        REQUIRED FIELDS
      </Text>
      {expectedParams.map((param) => (
        <HStack
          alignItems="flex-start"
          textColor="neutral.700"
          spacing={2}
          key={param.title}
        >
          <Text textStyle="subhead-2">{param.title}</Text>
          <Text textStyle="body2">{param.description}</Text>
        </HStack>
      ))}
    </VStack>
  )
}
