import { useQuery, useMutation, useQueryClient } from 'react-query'
import _ from 'lodash'

import {
  addAdminToCampaign,
  fetchCampaignAdmins,
  updateCampaignAdminPermissions,
  deleteCampaignAdminPermissions,
} from 'services/RedeemApi'

// Refer to useQuery here
// https://react-query.tanstack.com/docs/guides/queries#displaying-background-fetching-loading-states
// Refer to useMutation here
// https://react-query.tanstack.com/guides/mutations
// The main difference is that useQuery is idempotent and is usually used for GET requests
// but useMutation is not idempotent and is usually used for PUT/POST/DELETE requests (as these have side-effects)

export function useFetchCampaignAdmins(campaignId) {
  const {
    data: response,
    refetch,
    status,
    isFetching,
    error,
  } = useQuery(
    // NOTE: passing the string is needed as an identifier because the
    // campaignId identifier is already taken by useCampaign
    // refer to: https://react-query.tanstack.com/guides/query-keys
    ['fetchCampaignAdmins', campaignId],
    () => fetchCampaignAdmins(campaignId)
  )

  const admins = _.get(response, 'data', [])

  return {
    campaignAdmins: admins,
    fetchCampaignAdmins: refetch,
    fetchCampaignAdminsStatus: status,
    isFetchingCampaignAdmins: isFetching,
    fetchCampaignAdminsError: error,
  }
}

export function useAddCampaignAdmin(campaignId) {
  const queryCache = useQueryClient()
  const {
    mutateAsync: addCampaignAdmin,
    status: addCampaignAdminStatus,
    error: addCampaignAdminError,
    isLoading: isAddCampaignAdminLoading,
  } = useMutation(
    ({ email, permissionGroups }) =>
      addAdminToCampaign({ campaignId, email, permissionGroups }),
    {
      throwOnError: true,
      // On the successful addition of an admin, refetch
      // and update the data display to the latest version
      onSuccess: () =>
        queryCache.invalidateQueries('fetchCampaignAdmins', campaignId),
    }
  )

  return {
    addCampaignAdmin,
    addCampaignAdminStatus,
    addCampaignAdminError,
    isAddCampaignAdminLoading,
  }
}

export function useUpdateCampaignAdmin(campaignId) {
  const queryCache = useQueryClient()
  const {
    mutateAsync: updateCampaignAdmin,
    status: updateCampaignAdminStatus,
    error: updateCampaignAdminError,
    isLoading: isUpdateCampaignAdminLoading,
  } = useMutation(
    ({ userId, permissionGroups }) =>
      updateCampaignAdminPermissions({ campaignId, userId, permissionGroups }),
    {
      throwOnError: true,
      // On the successful addition of an admin, refetch
      // and update the data display to the latest version
      onSuccess: () => {
        queryCache.invalidateQueries('fetchCampaignAdmins', campaignId)
        // Refresh our own roles query in case we updated our own role
        queryCache.invalidateQueries('selfUserPermissions')
      },
    }
  )

  return {
    updateCampaignAdmin,
    updateCampaignAdminStatus,
    updateCampaignAdminError,
    isUpdateCampaignAdminLoading,
  }
}

export function useDeleteCampaignAdmin(campaignId) {
  const queryCache = useQueryClient()
  const {
    mutateAsync: deleteCampaignAdmin,
    status: deleteCampaignAdminStatus,
    error: deleteCampaignAdminError,
    isLoading: isDeleteCampaignAdminLoading,
  } = useMutation(
    ({ userId, permissionGroups }) =>
      deleteCampaignAdminPermissions({ campaignId, userId, permissionGroups }),
    {
      throwOnError: true,
      // On the successful addition of an admin, refetch
      // and update the data display to the latest version
      // On the successful addition of an admin, refetch
      // and update the data display to the latest version
      onSuccess: () => {
        queryCache.invalidateQueries('fetchCampaignAdmins', campaignId)
        // Refresh our own roles query in case we updated our own role
        queryCache.invalidateQueries('selfUserPermissions')
      },
    }
  )

  return {
    deleteCampaignAdmin,
    deleteCampaignAdminStatus,
    deleteCampaignAdminError,
    isDeleteCampaignAdminLoading,
  }
}
