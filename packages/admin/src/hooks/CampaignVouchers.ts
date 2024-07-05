import { useCallback } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import {
  createVoucherForCampaign,
  fetchAllVouchersByCampaignId,
} from 'services/RedeemApi'
import {
  VoucherType,
  CreateVoucherForCampaignParams,
} from 'services/RedeemApi/types'
import usePaginatedQuery from './pagination'

// Refer to useQuery here
// https://react-query.tanstack.com/docs/guides/queries#displaying-background-fetching-loading-states

interface UseCampaignVouchersPaginatedProps {
  campaignId: string
  enabled?: boolean | (({ search }: { search: string }) => boolean)
}

export function useCampaignVouchersPaginated({
  campaignId,
  enabled = true,
}: UseCampaignVouchersPaginatedProps) {
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
  } = usePaginatedQuery<VoucherType>({
    apiFunction: (params) =>
      fetchAllVouchersByCampaignId({ ...params, campaignId }),
    queryKey: [campaignId, 'groupedVouchers'],
    enabled,
  })

  return {
    vouchers: entries,
    fetchVouchersByCampaignIdStatus: fetchEntriesStatus,
    isFetchingVouchersByCampaignId: isFetchingEntries,
    isFetchingVouchersByCampaignIdNextPage: isFetchingEntriesNextPage,
    isFetchingVouchersByCampaignIdPreviousPage: isFetchingEntriesPreviousPage,
    fetchVouchersByCampaignIdError: fetchEntriesError,
    fetchVouchersByCampaignCurrentSearchQuery: fetchEntriesCurrentSearchQuery,
    getNextPageOfVouchersByCampaignId: getNextPageOfEntries,
    getPreviousPageOfVouchersByCampaignId: getPreviousPageOfEntries,
    refreshFetchVouchersByCampaignId: refreshFetchEntries,
    updateFetchVouchersByCampaignIdSearchQuery: updateFetchEntriesSearchQuery,
  }
}

export function useCampaignVouchersSearchExists(campaignId: string) {
  return useCallback(
    async ({
      block,
      floor,
      unit,
      postalCode,
      search,
      recipientId,
    }: {
      campaignId: string
      after?: string
      before?: string
      search?: string
      block?: string
      floor?: string
      unit?: string
      postalCode?: string
      limit?: number
      recipientId?: string
    }) => {
      const response = await fetchAllVouchersByCampaignId({
        campaignId,
        block,
        floor,
        unit,
        postalCode,
        search,
        recipientId,
        limit: 1,
      })

      return !!response?.data?.length
    },
    [campaignId]
  )
}

export function useCreateCampaignVoucher(campaignId: string) {
  const queryCache = useQueryClient()
  const { mutateAsync, status, data, error, reset } = useMutation(
    createVoucherForCampaign,
    {
      onSuccess: () =>
        queryCache.invalidateQueries([campaignId, 'groupedVouchers']),
    }
  )

  const createCampaignVoucher = useCallback(
    (params: Omit<CreateVoucherForCampaignParams, 'campaignId'>) =>
      mutateAsync({ campaignId, ...params }),
    [mutateAsync, campaignId]
  )

  return {
    createCampaignVoucher,
    createCampaignVoucherStatus: status,
    createCampaignVoucherResponse: data,
    createCampaignVoucherError: error,
    resetCreateCampaignVoucher: reset,
  }
}
