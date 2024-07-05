import {
  fetchCampaignEventsByCampaignId,
  fetchGroupedVoucherEventsByGroupId,
  fetchMerchantEvents,
} from 'services/RedeemApi'

import { useQuery } from 'react-query'
import _ from 'lodash'
import { useMemo } from 'react'
import { GroupedVoucherEventResponseObject } from 'services/RedeemApi/types'
import usePaginatedQuery from './pagination'

// Refer to useQuery here
// https://react-query.tanstack.com/docs/guides/queries#displaying-background-fetching-loading-states

export function useCampaignEvents({ campaignId }: { campaignId: string }) {
  const {
    entries,
    isFetchingEntries,
    isFetchingEntriesNextPage,
    isFetchingEntriesPreviousPage,
    getNextPageOfEntries,
    getPreviousPageOfEntries,
    refetchEntries,
  } = usePaginatedQuery({
    apiFunction: (params) =>
      fetchCampaignEventsByCampaignId({ ...params, campaignId }),
    enabled: false,
    queryKey: [campaignId, 'campaignEvents'],
  })

  return {
    campaignEvents: entries,
    fetchCampaignEvents: refetchEntries,
    isFetchingCampaignEvents: isFetchingEntries,
    getNextPageOfCampaignEvents: getNextPageOfEntries,
    getPreviousPageOfCampaignEvents: getPreviousPageOfEntries,
    IsFetchingCampaignEventsNextPage: isFetchingEntriesNextPage,
    IsFetchingCampaignEventsPreviousPage: isFetchingEntriesPreviousPage,
  }
}

export function useMerchantEvents() {
  const {
    entries,
    isFetchingEntries,
    isFetchingEntriesNextPage,
    isFetchingEntriesPreviousPage,
    getNextPageOfEntries,
    getPreviousPageOfEntries,
    refetchEntries,
  } = usePaginatedQuery({
    apiFunction: fetchMerchantEvents,
    enabled: false,
    queryKey: ['merchantEvents'],
  })

  return {
    merchantEvents: entries,
    fetchMerchantEvents: refetchEntries,
    isFetchingMerchantEvents: isFetchingEntries,
    getNextPageOfMerchantEvents: getNextPageOfEntries,
    getPreviousPageOfMerchantEvents: getPreviousPageOfEntries,
    IsFetchingMerchantEventsNextPage: isFetchingEntriesNextPage,
    IsFetchingMerchantEventsPreviousPage: isFetchingEntriesPreviousPage,
  }
}

export function useGroupedVoucherEvents({ groupId }: { groupId: string }) {
  const {
    data: response,
    refetch,
    status,
    isFetching,
    error,
  } = useQuery(
    [groupId, 'events'],
    () => fetchGroupedVoucherEventsByGroupId({ groupId }),
    {
      refetchInterval: 10000,
      enabled: !!groupId,
    }
  )

  // Ensure returned groupedVoucherEvents always has same identity when response
  // is unchanged. This prevents unnecessary re-renders by react components when
  // comparing the identity of groupedVoucherEvents.
  const groupedVoucherEvents = useMemo(
    () => _.get(response, 'data', [] as GroupedVoucherEventResponseObject[]),
    [response]
  )

  return {
    groupedVoucherEvents,
    fetchGroupedVoucherEvents: refetch,
    fetchGroupedVoucherEventsStatus: status,
    isFetchingGroupedVoucherEvents: isFetching,
    fetchGroupedVoucherEventsError: error,
  }
}
