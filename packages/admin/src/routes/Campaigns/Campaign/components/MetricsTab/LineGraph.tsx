import React from 'react'
import { AxisOptions, Chart } from 'react-charts'
import { Box } from '@chakra-ui/react'
import moment from 'moment'
import { MetricIdentifierToValue } from 'services/RedeemApi/types'
import { convertValueToMonetaryFormat } from './helper'

type LineGraphProps = {
  data: MetricIdentifierToValue[]
  label: string
  isMonetary?: boolean
}

function LineGraph({ data, label, isMonetary }: LineGraphProps) {
  const transformedData = [
    {
      label,
      data: data.map((x) => ({
        primary: new Date(x.identifier),
        secondary: x.value,
      })),
    },
  ]

  const primaryAxis = React.useMemo<
    AxisOptions<(typeof transformedData)[number]['data'][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary as unknown as Date,
      scaleType: 'localTime',
      formatters: {
        scale: (value) => moment(value).format('ll'),
      },
      tickCount: 12,
    }),
    []
  )

  const secondaryAxes = React.useMemo<
    AxisOptions<(typeof transformedData)[number]['data'][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
        formatters: {
          tooltip: (value: any) =>
            convertValueToMonetaryFormat(value, isMonetary),
          scale: (value: string) =>
            convertValueToMonetaryFormat(value, isMonetary),
        },
      },
    ],
    []
  )

  return (
    <Box width="100%" height="500px">
      <Chart
        options={{
          data: transformedData,
          primaryAxis,
          secondaryAxes,
          defaultColors: ['#BCBFE3', '#DFE1F2', '#505798'],
          secondaryCursor: {
            show: false,
          },
          primaryCursor: {
            show: false,
          },
        }}
      />
    </Box>
  )
}

export default LineGraph
