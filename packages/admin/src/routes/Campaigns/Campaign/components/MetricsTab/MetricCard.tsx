import { VStack, Text } from '@chakra-ui/react'
import Card from 'components/Card'
import React from 'react'

type MetricCardProps = {
  header: string
  children: React.ReactNode
}

const MetricCard = ({ header, children }: MetricCardProps) => {
  return (
    <Card padding="40px 32px" spacing="24px">
      <VStack alignItems="start" width="100%" spacing="24px">
        <Text textStyle="h4" color="neutral.900" fontWeight={600}>
          {header}
        </Text>
        {children}
      </VStack>
    </Card>
  )
}

export default MetricCard
