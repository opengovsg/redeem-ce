import React from 'react'
import {isDesktop} from 'react-device-detect'
import {useTranslation} from 'react-i18next'
import InlineMessage from 'components/InlineMessage'

const DesktopAlertOverlay = () => {
  const {t} = useTranslation('alerts', {keyPrefix: 'desktop'})
  return <InlineMessage isHidden={!isDesktop}>{t('alert')}</InlineMessage>
}

export default DesktopAlertOverlay
