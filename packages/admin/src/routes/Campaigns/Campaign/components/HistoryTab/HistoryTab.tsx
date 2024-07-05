import {
  VStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { CampaignEvent, MerchantEvent } from 'services/RedeemApi/types'
import CampaignHistory from './components/CampaignHistory'
import MerchantHistory from './components/MerchantHistory'

type HistoryTabProps = {
  canViewMerchantEvents: boolean
  canViewCampaignEvents: boolean
  getNextPageOfCampaignEvents: (() => void) | null
  getPreviousPageOfCampaignEvents: (() => void) | null
  isLoadingCampaignEventsNextPage: boolean
  isLoadingCampaignEventsPreviousPage: boolean
  getNextPageOfMerchantEvents: (() => void) | null
  getPreviousPageOfMerchantEvents: (() => void) | null
  isLoadingMerchantEventsNextPage: boolean
  isLoadingMerchantEventsPreviousPage: boolean
  campaignEvents?: CampaignEvent[]
  merchantEvents?: MerchantEvent[]
}

const HistoryTab: React.FC<HistoryTabProps> = ({
  canViewCampaignEvents,
  canViewMerchantEvents,
  campaignEvents,
  getNextPageOfCampaignEvents,
  getPreviousPageOfCampaignEvents,
  isLoadingCampaignEventsNextPage,
  isLoadingCampaignEventsPreviousPage,
  merchantEvents,
  getNextPageOfMerchantEvents,
  getPreviousPageOfMerchantEvents,
  isLoadingMerchantEventsNextPage,
  isLoadingMerchantEventsPreviousPage,
}) => {
  return (
    <VStack align="stretch" paddingY="24px" spacing="32px">
      <Text textStyle="h2" color="primary.700" marginX="32px">
        Security history
      </Text>
      <Tabs colorScheme="primary">
        <TabList>
          {canViewCampaignEvents && <Tab>Campaign</Tab>}
          {canViewMerchantEvents && <Tab>Merchants</Tab>}
        </TabList>
        <TabPanels>
          {canViewCampaignEvents && (
            <TabPanel>
              <CampaignHistory
                events={campaignEvents}
                getNextPage={getNextPageOfCampaignEvents}
                getPreviousPage={getPreviousPageOfCampaignEvents}
                isLoadingNextPage={isLoadingCampaignEventsNextPage}
                isLoadingPreviousPage={isLoadingCampaignEventsPreviousPage}
              />
            </TabPanel>
          )}
          {canViewMerchantEvents && (
            <TabPanel>
              <MerchantHistory
                events={merchantEvents}
                getNextPage={getNextPageOfMerchantEvents}
                getPreviousPage={getPreviousPageOfMerchantEvents}
                isLoadingNextPage={isLoadingMerchantEventsNextPage}
                isLoadingPreviousPage={isLoadingMerchantEventsPreviousPage}
              />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </VStack>
  )
}

export default HistoryTab
