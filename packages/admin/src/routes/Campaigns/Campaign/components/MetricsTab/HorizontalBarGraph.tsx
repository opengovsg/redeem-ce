import React, { useMemo } from 'react'
import { AxisOptions, Chart } from 'react-charts'
import { Box } from '@chakra-ui/react'
import { MetricIdentifierToValue } from 'services/RedeemApi/types'
import { convertValueToMonetaryFormat } from './helper'

type HorizontalBarGraphProps = {
  data: MetricIdentifierToValue[]
  label: string
  isMonetary?: boolean
}

function HorizontalBarGraph({
  data,
  label,
  isMonetary,
}: HorizontalBarGraphProps) {
  const transformedData = [
    {
      label,
      data: data.map((x) => ({
        primary: x.identifier,
        secondary: x.value,
      })),
    },
  ]

  const primaryAxis = useMemo<
    AxisOptions<(typeof transformedData)[number]['data'][number]>
  >(
    () => ({
      position: 'left',
      getValue: (datum) => datum.primary,
    }),
    []
  )

  const secondaryAxes = React.useMemo<
    AxisOptions<(typeof transformedData)[number]['data'][number]>[]
  >(
    () => [
      {
        position: 'bottom',
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
    <Box width="100%" height="450px">
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

export default HorizontalBarGraph
