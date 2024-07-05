import React from 'react'
import { Metric } from 'services/RedeemApi/types'
import Card from 'components/Card'
import { Table, Tbody, Td, Text, Tr, VStack } from '@chakra-ui/react'
import { convertNumberWithCommaDelimiters } from 'utils/string'

type IndividualMetricCardProps = {
  metric: Metric
  isMonetaryValue?: boolean
}

const IndividualMetricCard = ({
  metric,
  isMonetaryValue,
}: IndividualMetricCardProps) => {
  if (!metric.isSingleValue) {
    return null
  }

  const { breakdown, header, value } = metric

  return (
    <Card padding="24px" spacing="12px">
      <VStack align="start" spacing="8px">
        <Text textStyle="subhead1" color="neutral.900">
          {header}
        </Text>
        <Text textStyle="h2" color="neutral.900">{`${
          isMonetaryValue ? '$' : ''
        }${convertNumberWithCommaDelimiters(value)}`}</Text>
      </VStack>
      {breakdown && (
        <VStack alignItems="start" width="100%">
          <Table width="100%" variant="unstyled">
            <Tbody width="100%" __css={{ tableLayout: 'fixed' }}>
              {breakdown.map(({ identifier, value: breakdownValue }) => {
                return (
                  <Tr key={identifier}>
                    <Td
                      verticalAlign="middle"
                      padding="4px"
                      _first={{ paddingLeft: '0px' }}
                    >
                      <Text
                        textStyle="body1"
                        color="neutral.700"
                        whiteSpace="nowrap"
                      >
                        {identifier}
                      </Text>
                    </Td>
                    <Td verticalAlign="middle" padding="4px">
                      <Text textStyle="body1" align="right" color="neutral.700">
                        {`${
                          isMonetaryValue ? '$' : ''
                        }${convertNumberWithCommaDelimiters(breakdownValue)}`}
                      </Text>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </VStack>
      )}
    </Card>
  )
}

export default IndividualMetricCard
