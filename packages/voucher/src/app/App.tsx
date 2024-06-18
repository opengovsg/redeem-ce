import {css, Global} from '@emotion/react'
import {Helmet, HelmetProvider} from 'react-helmet-async'
import {Toaster} from 'react-hot-toast'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import {
  initMonitoringIfTokensPresent,
  useMonitorBrowserId,
  useMonitorLanguage,
} from 'helpers/monitoring'

// Components
import FeatureFlagNotificationBanner from 'components/FeatureFlagNotificationBanner'

// Pages
import GroupPage from 'pages/GroupPage'

// Route paths
import {NO_MATCH_ROUTE, GROUP_PAGE_ROUTE} from 'constants/routes'

// Configs
import {getIsLaunchDarklySdkClientAvailable} from 'constants/config'

// Translations
import {initTranslations} from 'helpers/i18n'
import DetectDefaultLanguage from 'components/DetectDefaultLanguage'
import {DEFAULT_LOCALE} from 'constants/translation'

import 'focus-visible/dist/focus-visible'

// Theme
import {ChakraProvider} from '@chakra-ui/react'
import {theme} from 'theme'
import {initTimezone} from 'helpers/timezone'
import ScrollToTopOnPathChange from 'components/ScrollToTopOnPathChange'
import TryAgainPage from 'pages/TryAgainLaterPage'
import {useJSONFlags} from 'hooks/FeatureFlag'
import VoucherError from 'components/VoucherError'

type KillSwitchFeatureFlagProps = {
  voucherKillSwitchFeatureFlag: {
    title?: string
    message?: string
    shouldShow: boolean
  }
}

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

const helmetContext = {}
const queryClient = new QueryClient()

initTimezone()
initMonitoringIfTokensPresent()
initTranslations()

function App(): JSX.Element {
  const {i18n: i18nInstance} = useTranslation()
  const language =
    i18nInstance?.language?.substring(0, 2) || DEFAULT_LOCALE.code // Get base language locale
  useMonitorLanguage(language)
  useMonitorBrowserId()

  const isLaunchdarklySdkClientAvailable = getIsLaunchDarklySdkClientAvailable()
  const voucherKillSwitchFeatureFlag = useJSONFlags<KillSwitchFeatureFlagProps>(
    'voucherKillSwitchFeatureFlag',
  )
  const {title, message, shouldShow} = voucherKillSwitchFeatureFlag

  return (
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Global styles={GlobalStyles} />
          <Helmet>
            <title>Redeem</title>
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1.0'
            />
            <meta property='og:title' content='Redeem' />
            <meta name='robots' content='noindex, nofollow' />
          </Helmet>
          <div
            id='language-wrapper'
            className={`language-wrapper language-${language}`}
          >
            <Toaster />
            {isLaunchdarklySdkClientAvailable && (
              <FeatureFlagNotificationBanner />
            )}
            <Router>
              <ScrollToTopOnPathChange />
              <DetectDefaultLanguage />
              <Routes>
                {isLaunchdarklySdkClientAvailable && shouldShow ? (
                  <Route
                    path='*'
                    element={
                      <TryAgainPage
                        title={title || ''}
                        message={message || ''}
                      />
                    }
                  />
                ) : (
                  <>
                    <Route
                      path={NO_MATCH_ROUTE}
                      element={
                        <VoucherError error={{response: {status: 404}}} />
                      }
                    />
                    <Route path={GROUP_PAGE_ROUTE} element={<GroupPage />} />
                    <Route
                      path='*'
                      element={<Navigate to={NO_MATCH_ROUTE} />}
                    />
                  </>
                )}
              </Routes>
            </Router>
          </div>
        </ChakraProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
