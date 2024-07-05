import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'

import TabErrorBoundary from 'components/TabErrorBoundary'
import CampaignNavTabs from './components/CampaignNavTabs'
import VouchersTab from './components/VouchersTab'
import MerchantsTab from './components/MerchantsTab'
import SettingsTab from './components/SettingsTab'
import HistoryTab from './components/HistoryTab'
import MetricsTab from './components/MetricsTab'

import CampaignHeader from './components/CampaignHeader'

import { CAMPAIGN_NAV_TABS_KEYS } from './constants'

import './Campaign.scss'

const CAMPAIGN_ROUTES = [
  {
    routeName: CAMPAIGN_NAV_TABS_KEYS.MERCHANTS,
    Tab: MerchantsTab,
  },
  {
    routeName: CAMPAIGN_NAV_TABS_KEYS.SETTINGS,
    Tab: SettingsTab,
  },
  {
    routeName: CAMPAIGN_NAV_TABS_KEYS.VOUCHERS,
    Tab: VouchersTab,
  },
  {
    routeName: CAMPAIGN_NAV_TABS_KEYS.METRICS,
    Tab: MetricsTab,
  },
  {
    routeName: CAMPAIGN_NAV_TABS_KEYS.HISTORY,
    Tab: HistoryTab,
  },
]

export default function Campaign() {
  const { path, url } = useRouteMatch()

  return (
    <Flex minWidth="100%">
      <Switch>
        <Route path={`${path}/:tabKey`}>
          <CampaignNavTabs url={url} />
        </Route>
      </Switch>
      <Box flexGrow={1} background="neutral.100">
        <CampaignHeader />
        <Switch>
          {CAMPAIGN_ROUTES.map(({ routeName, Tab }) => (
            <Route path={`${path}/${routeName}`} key={routeName}>
              <TabErrorBoundary tabName={routeName}>
                <Tab />
              </TabErrorBoundary>
            </Route>
          ))}
          <Route>
            <Redirect to={`${url}/${CAMPAIGN_NAV_TABS_KEYS.VOUCHERS}`} />
          </Route>
        </Switch>
      </Box>
    </Flex>
  )
}
