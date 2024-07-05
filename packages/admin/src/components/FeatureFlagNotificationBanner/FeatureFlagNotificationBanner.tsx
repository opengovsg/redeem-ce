import React from 'react'
import { BannerVariant } from 'theme/components/Banner'
import { useJSONFlags } from 'hooks/FeatureFlag'
import Banner from '../Banner'

// The extra nesting is because all flags are tied to the same account. So the extra object key is meant to specify which flag we are extracting
type FeatureFlagNotificationBannerProps = {
  adminNotificationBanner: {
    shouldShow: boolean
    message: string
    variant: BannerVariant
    isDismissable: boolean
  }
}

const FeatureFlagNotificationBanner = () => {
  const adminNotificationBanner =
    useJSONFlags<FeatureFlagNotificationBannerProps>('adminNotificationBanner')
  const { shouldShow, message, variant, isDismissable } =
    adminNotificationBanner

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
