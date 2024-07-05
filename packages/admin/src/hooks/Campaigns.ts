import { useCallback } from 'react'
import _ from 'lodash'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  fetchAllCampaigns,
  createCampaign,
  updateCampaignDetails,
  updateCampaignVoucherDetails,
} from 'services/RedeemApi'
import {
  UpdateCampaignDetailsProp,
  UpdateCampaignVoucherDetailsProp,
} from 'services/RedeemApi/types'
import { useToast } from 'data/Toasts'

export default function useCampaigns() {
  const {
    data: response,
    refetch,
    status,
    isFetching,
    error,
  } = useQuery('allCampaigns', fetchAllCampaigns)

  const campaigns = _.get(response, 'data', [])

  const campaignsSortedByCreatedAt = _.orderBy(campaigns, 'updatedAt', ['desc'])

  return {
    campaigns: campaignsSortedByCreatedAt,
    fetchCampaigns: refetch,
    fetchCampaignsStatus: status,
    isFetchingCampaigns: isFetching,
    fetchCampaignsError: error,
  }
}

export function useCreateCampaign() {
  const queryCache = useQueryClient()
  const { toastErrorWithoutTitle } = useToast()
  const { mutateAsync, status, data, error, reset } = useMutation(
    createCampaign,
    {
      onError: () => {
        toastErrorWithoutTitle({
          primaryText: 'Oops an error has occurred. ',
          message: 'Unable to create campaign',
        })
      },
      onSuccess: () => queryCache.invalidateQueries('allCampaigns'),
    }
  )

  const createCampaignCallback = useCallback(
    (params: {
      campaignName: string
      campaignDescription: string
      campaignOrganiserName: string
      campaignOrganiserEmail: string
      campaignAdvisoryUrl: string
      campaignLogoUrl: string
      campaignMerchantListUrl: string
      campaignOrganiserLocation: string
    }) => mutateAsync(params),
    [mutateAsync]
  )

  return {
    createCampaign: createCampaignCallback,
    createCampaignStatus: status,
    createCampaignResponse: data,
    createCampaignError: error,
    resetCreateCampaign: reset,
  }
}

export function useUpdateCampaignDetails(campaignId: string) {
  const queryCache = useQueryClient()
  const { toastErrorWithoutTitle } = useToast()
  const { mutateAsync, error, isLoading } = useMutation(
    (updatedCampaignDetails: UpdateCampaignDetailsProp) =>
      updateCampaignDetails(campaignId, updatedCampaignDetails),
    {
      onError: () => {
        toastErrorWithoutTitle({
          primaryText: 'Oops an error has occurred. ',
          message: 'Unable to update campaign details',
        })
      },
      // Invalidate the stale campaign data if the campaign updated successfully
      onSuccess: () => queryCache.invalidateQueries(campaignId),
    }
  )

  return {
    updateCampaignDetails: mutateAsync,
    updateCampaignDetailsError: error,
    isUpdateCampaignDetailsLoading: isLoading,
  }
}

export function useUpdateCampaignVoucherDetails(campaignId: string) {
  const queryCache = useQueryClient()
  const { toastErrorWithoutTitle } = useToast()
  const { mutateAsync, error, isLoading } = useMutation(
    (updatedCampaignVoucherDetails: UpdateCampaignVoucherDetailsProp) =>
      updateCampaignVoucherDetails(campaignId, updatedCampaignVoucherDetails),
    {
      onError: () => {
        toastErrorWithoutTitle({
          primaryText: 'Oops an error has occurred. ',
          message: 'Unable to update campaign voucher details',
        })
      },
      // Invalidate the stale campaign data if the campaign updated successfully
      onSuccess: () => queryCache.invalidateQueries(campaignId),
    }
  )

  return {
    updateCampaignVoucherDetails: mutateAsync,
    updateCampaignVoucherDetailsError: error,
    isUpdateCampaignVoucherDetailsLoading: isLoading,
  }
}
