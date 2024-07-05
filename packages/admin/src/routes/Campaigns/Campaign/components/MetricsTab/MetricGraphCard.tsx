import _ from 'lodash'
import React from 'react'
import Card from 'components/Card'
import { VStack, Text } from '@chakra-ui/react'
import { Metric, MetricIdentifierToValue } from 'services/RedeemApi/types'

type MetricGraphProps = {
  metric: Metric
  render: (data: MetricIdentifierToValue[]) => React.ReactNode
}

const MetricGraphCard = ({ metric, render }: MetricGraphProps) => {
  return !metric.isSingleValue && !_.isEmpty(metric.value) ? (
    <Card padding="24px" spacing="12px">
      <VStack alignItems="start" width="100%">
        <Text textStyle="subhead1">{metric.header}</Text>
        {render(metric.value)}
      </VStack>
    </Card>
  ) : null
}

export default MetricGraphCard
