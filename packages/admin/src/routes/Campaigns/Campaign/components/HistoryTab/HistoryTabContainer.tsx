import { UserActions } from 'constants/permissions'
import { useAuthenticationState } from 'data/Authentication'
import { getAllowedActionsForResource } from 'helpers/permissions'
import { useCampaignEvents, useMerchantEvents } from 'hooks/Events'
import React, { useEffect } from 'react'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import HistoryTab from './HistoryTab'

const HistoryTabContainer = () => {
  const { campaignId } = useCampaignContext()
  const { permissions } = useAuthenticationState()
  const allowedActionsOnCampaign = getAllowedActionsForResource({
    permissions,
    campaignId,
  })
  const allowedActionsOnAll = getAllowedActionsForResource({
    permissions,
    campaignId: '*',
  })
  const canViewCampaignEvents = allowedActionsOnCampaign.includes(
    UserActions.ListCampaignEvents
  )
  const canViewMerchantEvents = allowedActionsOnAll.includes(
    UserActions.ListMerchantEvents
  )
  const {
    campaignEvents,
    fetchCampaignEvents,
    getNextPageOfCampaignEvents,
    getPreviousPageOfCampaignEvents,
    IsFetchingCampaignEventsNextPage,
    IsFetchingCampaignEventsPreviousPage,
  } = useCampaignEvents({
    campaignId,
  })
  useEffect(() => {
    if (canViewCampaignEvents) {
      fetchCampaignEvents()
    }
  }, [fetchCampaignEvents, canViewCampaignEvents])
  const {
    merchantEvents,
    fetchMerchantEvents,
    getNextPageOfMerchantEvents,
    getPreviousPageOfMerchantEvents,
    IsFetchingMerchantEventsNextPage,
    IsFetchingMerchantEventsPreviousPage,
  } = useMerchantEvents()
  useEffect(() => {
    if (canViewMerchantEvents) {
      fetchMerchantEvents()
    }
  }, [fetchMerchantEvents, canViewMerchantEvents])
  return (
    <HistoryTab
      campaignEvents={campaignEvents}
      canViewCampaignEvents={canViewCampaignEvents}
      getNextPageOfCampaignEvents={getNextPageOfCampaignEvents}
      getPreviousPageOfCampaignEvents={getPreviousPageOfCampaignEvents}
      isLoadingCampaignEventsNextPage={IsFetchingCampaignEventsNextPage}
      isLoadingCampaignEventsPreviousPage={IsFetchingCampaignEventsPreviousPage}
      merchantEvents={merchantEvents}
      canViewMerchantEvents={canViewMerchantEvents}
      getNextPageOfMerchantEvents={getNextPageOfMerchantEvents}
      getPreviousPageOfMerchantEvents={getPreviousPageOfMerchantEvents}
      isLoadingMerchantEventsNextPage={IsFetchingMerchantEventsNextPage}
      isLoadingMerchantEventsPreviousPage={IsFetchingMerchantEventsPreviousPage}
    />
  )
}

export default HistoryTabContainer
