import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import PermissionsBasedRoute from 'app/PermissionBasedRoute'
import Campaigns from './CampaignsContainer'
import Campaign from './Campaign'
import { CampaignProvider } from './Campaign/context/CampaignContext'

export default function CampaignsRouter() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        <Campaigns />
      </Route>
      <Route path={`${path}/:campaignId`}>
        <PermissionsBasedRoute>
          <CampaignProvider>
            <Campaign />
          </CampaignProvider>
        </PermissionsBasedRoute>
      </Route>
    </Switch>
  )
}
