import { datadogRum } from '@datadog/browser-rum'
import { useEffect } from 'react'

export function initMonitoringIfTokensPresent() {
  if (
    !process.env.REACT_APP_DATADOG_APPLICATION_ID ||
    !process.env.REACT_APP_DATADOG_CLIENT_TOKEN
  ) {
    return
  }
  datadogRum.init({
    applicationId: process.env.REACT_APP_DATADOG_APPLICATION_ID,
    clientToken: process.env.REACT_APP_DATADOG_CLIENT_TOKEN,
    site: 'datadoghq.com',
    service: 'redeem-admin',
    env: process.env.REACT_APP_ENV || process.env.NODE_ENV,
    // Specify a version number to identify the deployed version of your application in Datadog
    version: '1.0.0',
    sampleRate: 100,
    trackInteractions: true,
    // Allows integration with DataDog Traces
    allowedTracingOrigins: [/https:\/\/.*(\.)?redeem\.gov\.sg/],
  })

  datadogRum.startSessionReplayRecording()
}

export function logCreateVouchersAction({ type, timeTaken, isUsePrefill }) {
  datadogRum.addAction('Create grouped vouchers', {
    type,
    time_taken: timeTaken,
    is_use_prefill: isUsePrefill,
  })
}

export function useLogCreateVoucherStepChanges({ stepNumber }) {
  useEffect(() => {
    if (!stepNumber) {
      return
    }
    datadogRum.addAction('Open create grouped vouchers step', {
      step_number: stepNumber,
    })
  }, [stepNumber])
}

export function setMonitoringUser({ id, email }) {
  datadogRum.setUser({
    id,
    name: email,
  })
}
