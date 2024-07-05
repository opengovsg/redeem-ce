import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { QueryClientProvider } from 'react-query'

import OgpFooter from 'components/OgpFooter'
import ScrollToTopOnPathChange from 'components/ScrollToTopOnPathChange'
import LogoutOnUnauthorized from 'components/LogoutOnUnauthorized'
import NonProdWarningBanner from 'components/NonProdWarningBanner'

import Login from 'routes/Login'
import Campaigns from 'routes/Campaigns'
import Merchants from 'routes/Merchants'
import NoMatch from 'routes/NoMatch'
import Styleguide from 'routes/Styleguide'

// Import our providers
import { AuthenticationStateProvider } from 'data/Authentication'
import { ToastProvider } from 'data/Toasts'

import {
  CAMPAIGNS_ROUTE,
  MERCHANTS_ROUTE,
  NO_MATCH_ROUTE,
  ROOT_ROUTE,
  STYLEGUIDE_ROUTE,
} from 'constants/routes'
import { initMonitoringIfTokensPresent } from 'helpers/monitoring'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'theme'
import { css, Global } from '@emotion/react'
import { queryClient } from 'helpers/query'
import FeatureFlagNotificationBanner from 'components/FeatureFlagNotificationBanner'
import PublicRestrictedRoute from './PublicRestrictedRoute'
import PrivateRoute from './PrivateRoute'
import {
  isHideNonProductionFlags,
  isLaunchdarklySdkClientAvailable,
} from '../constants'
import 'focus-visible/dist/focus-visible'

initMonitoringIfTokensPresent()
const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Global styles={GlobalStyles} />
        <AuthenticationStateProvider>
          <ToastProvider>
            {isLaunchdarklySdkClientAvailable && (
              <FeatureFlagNotificationBanner />
            )}
            {!isHideNonProductionFlags && <NonProdWarningBanner />}
            <Router>
              <ScrollToTopOnPathChange />
              <LogoutOnUnauthorized />
              <Switch>
                <PublicRestrictedRoute
                  path={ROOT_ROUTE}
                  exact
                  redirectPath={CAMPAIGNS_ROUTE}
                >
                  <Login />
                </PublicRestrictedRoute>
                <PrivateRoute path={MERCHANTS_ROUTE}>
                  <Merchants />
                </PrivateRoute>
                <PrivateRoute path={CAMPAIGNS_ROUTE}>
                  <Campaigns />
                </PrivateRoute>
                <Route exact path={NO_MATCH_ROUTE}>
                  <NoMatch />
                </Route>
                <Route exact path={STYLEGUIDE_ROUTE}>
                  <Styleguide />
                </Route>
                <Redirect from="*" to={NO_MATCH_ROUTE} />
              </Switch>
            </Router>
            <OgpFooter />
          </ToastProvider>
        </AuthenticationStateProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
