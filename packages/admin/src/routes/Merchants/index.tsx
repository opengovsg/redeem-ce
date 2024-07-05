import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import {
  ThemeProvider,
  theme as ogpDsTheme,
} from '@opengovsg/design-system-react'
import { extendTheme } from '@chakra-ui/react'
import {
  AddExistingMerchantsToCampaignPage,
  CopyMerchantsFromCampaignToAnotherPage,
  CreateAndAddMerchantsToCampaignPage,
  MainMerchantsPage,
  RemoveMerchantsFromCampaignPage,
  SendMerchantsAccessCodesPage,
} from './routes'
import { theme as baseTheme } from '../../theme'

export default function CampaignsRouter() {
  const { path } = useRouteMatch()

  const theme = extendTheme(baseTheme, ogpDsTheme)

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path={path}>
          <MainMerchantsPage />
        </Route>
        <Route exact path={`${path}/add-existing`}>
          <AddExistingMerchantsToCampaignPage />
        </Route>
        <Route exact path={`${path}/create-and-add`}>
          <CreateAndAddMerchantsToCampaignPage />
        </Route>
        <Route exact path={`${path}/remove`}>
          <RemoveMerchantsFromCampaignPage />
        </Route>
        <Route exact path={`${path}/send-access-code`}>
          <SendMerchantsAccessCodesPage />
        </Route>
        <Route exact path={`${path}/copy`}>
          <CopyMerchantsFromCampaignToAnotherPage />
        </Route>
      </Switch>
    </ThemeProvider>
  )
}
