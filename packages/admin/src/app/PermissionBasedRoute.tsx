import React from 'react'
import { Redirect, useParams } from 'react-router-dom'

import { useAuthenticationState } from 'data/Authentication'

import { CAMPAIGNS_ROUTE } from 'constants/routes'

type PermissionBasedRouteProps = {
  children: React.ReactNode
}

const PermissionsBasedRoute = ({ children }: PermissionBasedRouteProps) => {
  const { campaignId } = useParams<{ campaignId: string }>()
  const { permissions, user, isLoadingPermissions } = useAuthenticationState()

  // We wait for fetching permissions to be done to prevent redirect eagerly. This is to ensure that we check whether the user does have permissions to access this campaign
  if (isLoadingPermissions) {
    return null
  }

  const isUserAbleToAccessCampaign = campaignId in permissions

  // If permissions is fetched sucessfully and user is available but not able to access campaign, redirect to list of campaigns
  return user && !isUserAbleToAccessCampaign ? (
    <Redirect to={CAMPAIGNS_ROUTE} />
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  )
}

export default PermissionsBasedRoute
