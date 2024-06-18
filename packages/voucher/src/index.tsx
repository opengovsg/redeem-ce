import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './app/App'

import {asyncWithLDProvider} from 'launchdarkly-react-client-sdk'

import {
  getLaunchDarklySdkClientId,
  getIsLaunchDarklySdkClientAvailable,
} from 'constants/config'

import './styles/styles.scss'

const isLaunchdarklySdkClientAvailable = getIsLaunchDarklySdkClientAvailable()
const launchDarklySdkClientId = getLaunchDarklySdkClientId()

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!)

// If no env variable, initialize the component as it is
if (!isLaunchdarklySdkClientAvailable) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  // The reason why there is an extra semi colon for IIFE is because of the default rule of Automatic SemiColon Insertion https://github.com/prettier/prettier/issues/2800
  // eslint-disable-next-line
  ;(async () => {
    /**
     * The difference between withLDProvider and asyncWithLDProvider is that withLDProvider initializes launchdarkly-js-client-sdk at componentDidMount.
     * This means your flags and the ldClient are only available after your app has mounted. This can result in a flicker due to flag changes at startup time.
     * asyncWithLDProvider initializes launchdarkly-js-client-sdk at the entry point of your app prior to render. This means that your flags and the ldClient
     * are ready at the beginning of your app. This ensures your app does not flicker due to flag changes at startup time.
     */
    const LDProvider = await asyncWithLDProvider({
      clientSideID: launchDarklySdkClientId,
      reactOptions: {
        useCamelCaseFlagKeys: true,
      },
      options: {
        bootstrap: 'localStorage',
      },
      context: {
        kind: 'voucher',
        key: 'voucher',
        name: 'voucher',
      },
    })

    root.render(
      <React.StrictMode>
        <LDProvider>
          <App />
        </LDProvider>
      </React.StrictMode>,
    )
  })()
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
