import React from 'react'

import {
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tab,
  Spinner,
  VStack,
} from '@chakra-ui/react'

import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import EligibilityType from './components/EligibilityType'
import CampaignDetailsForm from './components/CampaignDetailsForm'
import CampaignUserPermissionsTab from './components/CampaignUserPermissionsTab'
import VoucherDetailsForm from './components/VoucherDetailsForm'
import Settings from './components/Settings'

export default function SettingsTab() {
  const { campaign, hasWhitelist } = useCampaignContext()

  if (!campaign) {
    return <Spinner />
  }

  const displays = [
    {
      tab: 'Eligibility type',
      Panel: EligibilityType,
      shouldShow: hasWhitelist,
    },
    { tab: 'Campaign management', Panel: VoucherDetailsForm, shouldShow: true },
    { tab: 'Voucher details', Panel: CampaignDetailsForm, shouldShow: true },
    {
      tab: 'User permissions',
      Panel: CampaignUserPermissionsTab,
      shouldShow: true,
    },
    {
      tab: 'Settings',
      Panel: Settings,
      shouldShow: true,
    },
  ].filter((display) => display.shouldShow)

  return (
    <VStack align="start">
      <Text textStyle="h2" margin="32px" color="primary.700">
        Campaign
      </Text>
      <Tabs width="100%" colorScheme="primary">
        <TabList>
          {displays.map(({ tab }) => (
            <Tab key={tab}>{tab}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {displays.map(({ Panel, tab }) => (
            <TabPanel key={tab}>
              <Panel />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </VStack>
  )
}
