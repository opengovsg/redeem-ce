import React from 'react'
import {Trans, useTranslation} from 'react-i18next'

const useErrorStates = () => {
  const {t} = useTranslation('errors')
  return {
    NotFoundError: {
      title: t('voucher_not_found.title'),
      content: (
        <Trans t={t} i18nKey='voucher_not_found.body'>
          Please double check the URL or click on the link in the SMS again. If
          the problem persists, please call PA&apos;s hotline at{' '}
          <span className='modal-text-primary'>6225 5322</span> or reach out to
          your{' '}
          <span className='modal-text-primary'>
            nearest Community Centre/ Club (CC)
          </span>
          .
        </Trans>
      ),
    },
    ServiceUnavailable: {
      title: t('service_unavailable.title'),
      content: (
        <Trans t={t} i18nKey='service_unavailable.body'>
          Please make sure your device is connected to the internet and try
          again.
        </Trans>
      ),
    },
  }
}

export default useErrorStates
