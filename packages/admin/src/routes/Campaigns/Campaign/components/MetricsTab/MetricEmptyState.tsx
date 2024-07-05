import React from 'react'
import { VStack, Text } from '@chakra-ui/react'

const MetricEmptyState = () => {
  return (
    <VStack
      align="start"
      width="512px"
      marginLeft="248px"
      marginY="48px"
      spacing="16px"
    >
      <Text textStyle="h3" color="neutral.900">
        No metrics found
      </Text>
      <Text textStyle="subhead1" color="neutral.800">
        Metrics will only be generated once you have set up your payouts.
      </Text>
    </VStack>
  )
}

export default MetricEmptyState
