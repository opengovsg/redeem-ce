import {datadogRum} from '@datadog/browser-rum'
import {datadogLogs} from '@datadog/browser-logs'
import {useEffect} from 'react'
import type {JsonObject} from 'type-fest'
import {useBrowserId} from './user'

import packageJson from '../../package.json'

const {name: service, version} = packageJson

// TODO: Increase this back to 10 if we want to monitor more sessions
const DEFAULT_RUM_SAMPLING_RATE = 1

export function initMonitoringIfTokensPresent() {
  if (
    !process.env.REACT_APP_DATADOG_APPLICATION_ID ||
    !process.env.REACT_APP_DATADOG_CLIENT_TOKEN
  ) {
    return
  }

  // Shared Datadog config between RUM and Browser Logs
  // Must be initialised here after process.env check because
  // env vars might be undefined.
  const datadogConfig = {
    clientToken: process.env.REACT_APP_DATADOG_CLIENT_TOKEN,
    site: 'datadoghq.com',
    service,
    env: process.env.REACT_APP_DD_ENV || process.env.NODE_ENV,
    // Specify a version number to identify the deployed version of your application in Datadog
    version,
  }

  datadogRum.init({
    ...datadogConfig,
    applicationId: process.env.REACT_APP_DATADOG_APPLICATION_ID,
    // Sample rate in % (i.e 100 refers to all sessions)
    sampleRate:
      Number(process.env.REACT_APP_DATADOG_RUM_SAMPLE_RATE) ||
      DEFAULT_RUM_SAMPLING_RATE,
    trackInteractions: true,
    // Allows integration with DataDog Traces
    allowedTracingOrigins: [/https:\/\/.*(\.)?redeem\.gov\.sg/],
  })

  datadogLogs.init({
    ...datadogConfig,
    // Sample rate in % (i.e 100 refers to all sessions)
    sampleRate: 100,
    forwardErrorsToLogs: true,
    beforeSend: (log) => {
      // Don't log XHR aborted requests
      if (log.http?.status_code === 0) {
        return false
      }
    },
  })

  datadogRum.startSessionReplayRecording()
}
// TODO - Seperate out custom  monitoring functions into different folder
function ddAddCustomAction({
  actionName,
  context,
}: {
  actionName: string
  context?: JsonObject
}) {
  datadogRum.addAction(actionName, context)
}

export function customMonitorClick(targetName: string) {
  ddAddCustomAction({
    actionName: targetName,
    context: {
      target: {
        name: targetName,
      },
    },
  })
}

export function logLimitReached(numVouchers: number) {
  ddAddCustomAction({
    actionName: 'voucher limit reached',
    context: {
      value: numVouchers,
    },
  })
}

export function useMonitorLanguage(language: string) {
  useEffect(() => {
    // Override previously set language as it can be changed by the user
    datadogRum.removeRumGlobalContext('language')
    datadogRum.addRumGlobalContext('language', language)
  }, [language])
}

export function useMonitorBrowserId() {
  const browserId = useBrowserId()
  // Browser ID does not change over a session
  useEffect(() => datadogRum.addRumGlobalContext('browser_id', browserId))
}
