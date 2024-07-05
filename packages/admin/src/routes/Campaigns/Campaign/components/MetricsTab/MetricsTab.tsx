import React from 'react'
import _ from 'lodash'
import { Grid, GridItem, Spinner, Text, VStack, HStack } from '@chakra-ui/react'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import useCampaignMetrics from 'hooks/Metrics'
import moment from 'moment'
import MetricEmptyState from './MetricEmptyState'
import LineGraph from './LineGraph'
import MetricGraphCard from './MetricGraphCard'
import IndividualMetricCard from './IndividualMetricCard'
import HorizontalBarGraph from './HorizontalBarGraph'
import MetricCard from './MetricCard'

const MetricsTab = () => {
  const { campaignId } = useCampaignContext()
  const { campaignMetrics, isLoadingCampaignMetrics, isError } =
    useCampaignMetrics(campaignId)

  if (isLoadingCampaignMetrics) {
    return <Spinner />
  }

  if (isError || _.isUndefined(campaignMetrics)) {
    return <MetricEmptyState />
  }

  const {
    totalVouchersClaimed,
    totalNumberOfVouchersWithAtLeastOneRedemption,
    // TODO: We are still using this in the future, but there is no current plan for this data
    // totalVouchersClaimedPerMonth,
    totalVouchersClaimedPerDay,
    totalNumberOfTransactions,
    totalValueOfTransactions,
    averageTransactionValue,
    // TODO: We are still using this in the future, but there is no current plan for this data
    // totalValueOfTransactionsPerMonth,
    totalValueOfTransactionsPerDay,
    totalNumberOfMerchants,
    merchantTransactionValues,
    totalNumberOfMerchantsWithAtLeastOneRedemption,
    latestDataDateRetrieved,
  } = campaignMetrics

  const CARDS_DATA = [
    {
      header: 'Vouchers',
      content: (
        <Grid gridGap="24px" gridTemplateColumns="repeat(2, 1fr)" width="100%">
          <GridItem colSpan={1}>
            <IndividualMetricCard metric={totalVouchersClaimed} />
          </GridItem>
          <GridItem colSpan={1}>
            <IndividualMetricCard
              metric={totalNumberOfVouchersWithAtLeastOneRedemption}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <MetricGraphCard
              metric={totalVouchersClaimedPerDay}
              render={(graphData) => (
                <LineGraph data={graphData} label="Total number of vouchers" />
              )}
            />
          </GridItem>
        </Grid>
      ),
    },
    {
      header: 'Transactions',
      content: (
        <Grid gridGap={4} gridTemplateColumns="repeat(2, 1fr)" width="100%">
          <GridItem colSpan={1}>
            <IndividualMetricCard
              metric={totalValueOfTransactions}
              isMonetaryValue
            />
          </GridItem>
          <GridItem colSpan={1}>
            <IndividualMetricCard metric={totalNumberOfTransactions} />
          </GridItem>
          <GridItem colSpan={1}>
            <IndividualMetricCard
              metric={averageTransactionValue}
              isMonetaryValue
            />
          </GridItem>
          <GridItem colSpan={2}>
            <MetricGraphCard
              metric={totalValueOfTransactionsPerDay}
              render={(graphData) => (
                <LineGraph
                  data={graphData}
                  label="Total transactions"
                  isMonetary
                />
              )}
            />
          </GridItem>
        </Grid>
      ),
    },
    {
      header: 'Merchants',
      content: (
        <Grid gridGap={4} gridTemplateColumns="repeat(2, 1fr)" width="100%">
          <GridItem colSpan={1}>
            <IndividualMetricCard metric={totalNumberOfMerchants} />
          </GridItem>
          <GridItem colSpan={1}>
            <IndividualMetricCard
              metric={totalNumberOfMerchantsWithAtLeastOneRedemption}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <MetricGraphCard
              metric={merchantTransactionValues}
              render={(graphData) => (
                <HorizontalBarGraph
                  data={graphData}
                  label="Total transaction value"
                  isMonetary
                />
              )}
            />
          </GridItem>
        </Grid>
      ),
    },
  ]

  return (
    <VStack alignItems="stretch" padding="32px" spacing="36px">
      <HStack alignItems="center" align="start" spacing="32px">
        <Text textStyle="h2" color="primary.700">
          Metrics
        </Text>
        <Text textStyle="body1" color="neutral.700">
          {`As of ${moment(latestDataDateRetrieved).format(
            'DD MMM YYYY, h:mma'
          )}`}
        </Text>
      </HStack>
      <VStack alignItems="stretch" spacing="32px">
        {CARDS_DATA.map(({ header, content }) => (
          <MetricCard header={header} key={header}>
            {content}
          </MetricCard>
        ))}
      </VStack>
    </VStack>
  )
}

export default MetricsTab
