import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  fetchCampaignMerchants,
  fetchMerchant,
  updateMerchant,
  updateMerchantPaymentDetails,
} from 'services/RedeemApi'
import _ from 'lodash'

import usePaginatedQuery from './pagination'

// Refer to useQuery here
// https://react-query.tanstack.com/docs/guides/queries#displaying-background-fetching-loading-states

export default function useCampaignMerchants(campaignId) {
  const {
    entries,
    fetchEntriesStatus,
    isFetchingEntries,
    isFetchingEntriesNextPage,
    isFetchingEntriesPreviousPage,
    fetchEntriesError,
    fetchEntriesCurrentSearchQuery,
    getNextPageOfEntries,
    getPreviousPageOfEntries,
    refreshFetchEntries,
    updateFetchEntriesSearchQuery,
    refetchEntries,
  } = usePaginatedQuery({
    apiFunction: (params) => fetchCampaignMerchants({ campaignId, ...params }),
    refetchInterval: 0,
    queryKey: ['useMerchants', campaignId],
  })

  return {
    campaignMerchants: entries,
    fetchCampaignMerchantsStatus: fetchEntriesStatus,
    isFetchingCampaignMerchants: isFetchingEntries,
    isFetchingCampaignMerchantsNextPage: isFetchingEntriesNextPage,
    isFetchingCampaignMerchantsPreviousPage: isFetchingEntriesPreviousPage,
    fetchCampaignMerchantsError: fetchEntriesError,
    fetchCampaignMerchantsCurrentSearchQuery: fetchEntriesCurrentSearchQuery,
    getNextPageOfCampaignMerchants: getNextPageOfEntries,
    getPreviousPageOfCampaignMerchants: getPreviousPageOfEntries,
    refreshFetchCampaignMerchants: refreshFetchEntries,
    updateFetchCampaignMerchantsSearchQuery: updateFetchEntriesSearchQuery,
    fetchCampaignMerchants: refetchEntries,
  }
}

export function useFetchMerchant(merchantId) {
  const {
    data: response,
    refetch,
    status,
    isFetching,
    error,
  } = useQuery(['useFetchMerchant', merchantId], () =>
    fetchMerchant(merchantId)
  )

  const merchant = _.get(response, 'data', {})

  return {
    merchant,
    fetchMerchant: refetch,
    fetchMerchantStatus: status,
    isFetchingMerchant: isFetching,
    fetchMerchantError: error,
  }
}

export function useUpdateMerchant(merchantId) {
  const queryCache = useQueryClient()
  const { mutateAsync, error, isLoading } = useMutation(
    (updatedMerchantData) => updateMerchant(merchantId, updatedMerchantData),
    {
      throwOnError: true,
      // Invalidate the stale campaign data if the campaign updated successfully
      onSuccess: () => {
        queryCache.invalidateQueries(['useFetchMerchant', merchantId])
        queryCache.invalidateQueries(['useMerchants', merchantId])
      },
    }
  )

  return {
    updateMerchant: mutateAsync,
    updateMerchantError: error,
    isUpdateMerchantLoading: isLoading,
  }
}

export function useUpdateMerchantPaymentDetails(merchantId) {
  const queryCache = useQueryClient()
  const { mutateAsync, error, isLoading } = useMutation(
    (updatedMerchantData) =>
      updateMerchantPaymentDetails(merchantId, updatedMerchantData),
    {
      throwOnError: true,
      // Invalidate the stale campaign data if the campaign updated successfully
      onSuccess: () => {
        queryCache.invalidateQueries(['useFetchMerchant', merchantId])
        queryCache.invalidateQueries(['useMerchants', merchantId])
      },
    }
  )

  return {
    updateMerchantPaymentDetails: mutateAsync,
    updateMerchantErrorPaymentDetails: error,
    isUpdateMerchantPaymentDetailsLoading: isLoading,
  }
}
