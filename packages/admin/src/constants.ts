import _ from 'lodash'

export const isHideNonProductionFlags =
  process.env.REACT_APP_IS_HIDE_NON_PRODUCTION_FLAGS === 'true'
export const launchdarklySdkClient =
  process.env.REACT_APP_LAUNCHDARKLY_SDK_CLIENT ?? ''
export const isLaunchdarklySdkClientAvailable =
  !_.isEmpty(launchdarklySdkClient) && launchdarklySdkClient !== 'null'
