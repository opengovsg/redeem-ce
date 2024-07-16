import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import MainContainer from 'router/containers/MainContainer'
import OnboardingContainer from 'router/containers/OnboardingContainer'
import { ROUTES } from 'router/routes'
import { RequireAuthentication, RequireSignedOut } from 'data/Authentication'

import Home from 'router/screens/Home'
import Transactions from 'router/screens/Transactions'
import Payouts from 'router/screens/Payouts'
import Settings from 'router/screens/Settings'

import ChooseLang from './screens/onboarding/ChooseLang'
import OTPMobile from './screens/onboarding/OTPMobile'
import OTPCode from './screens/onboarding/OTPCode'
import ChooseName from './screens/onboarding/ChooseName'
import ChooseShop from './screens/onboarding/ChooseShop'

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN.ROOT,
    element: (
      <RequireAuthentication>
        <MainContainer />
      </RequireAuthentication>
    ),
    children: [
      {
        path: ROUTES.MAIN.PATHS.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.MAIN.PATHS.TRANSACTIONS,
        element: <Transactions />,
      },
      {
        path: ROUTES.MAIN.PATHS.PAYOUTS,
        element: <Payouts />,
      },
      {
        path: ROUTES.MAIN.PATHS.SETTINGS,
        element: <Settings />,
      },
    ],
  },
  {
    path: ROUTES.ONBOARDING.ROOT,
    element: <OnboardingContainer />,
    children: [
      {
        path: ROUTES.ONBOARDING.PATHS.CHOOSE_LANG,
        element: (
          <RequireSignedOut>
            <ChooseLang />
          </RequireSignedOut>
        ),
      },
      {
        path: ROUTES.ONBOARDING.PATHS.OTP_MOBILE,
        element: (
          <RequireSignedOut>
            <OTPMobile />
          </RequireSignedOut>
        ),
      },
      {
        path: ROUTES.ONBOARDING.PATHS.OTP_CODE,
        element: (
          <RequireSignedOut>
            <OTPCode />
          </RequireSignedOut>
        ),
      },
      {
        path: ROUTES.ONBOARDING.PATHS.CHOOSE_NAME,
        element: (
          <RequireAuthentication>
            <ChooseName />
          </RequireAuthentication>
        ),
      },
      {
        path: ROUTES.ONBOARDING.PATHS.CHOOSE_SHOP,
        element: (
          <RequireAuthentication>
            <ChooseShop />
          </RequireAuthentication>
        ),
      },
    ],
  },
])

const AppRouter = () => <RouterProvider router={router} />

export default AppRouter
