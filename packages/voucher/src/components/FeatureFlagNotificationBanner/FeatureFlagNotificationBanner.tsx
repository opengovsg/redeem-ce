import React from 'react'

import {BannerVariant} from 'theme/components/Banner'

import Banner from '../Banner'
import {useJSONFlags} from 'hooks/FeatureFlag'

// The extra nesting is because all flags are tied to the same account. So the extra object key is meant to specify which flag we are extracting
type FeatureFlagNotificationBannerProps = {
  voucherNotificationBanner: {
    shouldShow: boolean
    message: string
    variant: BannerVariant
    isDismissable: boolean
  }
}

const FeatureFlagNotificationBanner = () => {
  const voucherNotificationBanner =
    useJSONFlags<FeatureFlagNotificationBannerProps>(
      'voucherNotificationBanner',
    )
  const {shouldShow, message, variant, isDismissable} =
    voucherNotificationBanner

  if (!shouldShow) {
    return null
  }

  return (
    <Banner variant={variant} isDismissable={isDismissable}>
      {message}
    </Banner>
  )
}

export default FeatureFlagNotificationBanner
