import _ from 'lodash'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { fetchUserPermissions } from 'services/RedeemApi'

export default function useSelfUserPermissions({
  enabled,
}: {
  enabled: boolean
}) {
  const {
    data: response,
    refetch,
    status,
    error,
    isLoading,
  } = useQuery('selfUserPermissions', () => fetchUserPermissions(), {
    enabled,
  })

  const permissions = useMemo(
    () =>
      _(response?.data)
        .groupBy((userResourcePair) => userResourcePair.resourceId)
        .mapValues(([permissionInfo]) => permissionInfo)
        .value(),
    [response]
  )

  return {
    permissions,
    fetchSelfUserPermissions: refetch,
    fetchSelfUserPermissionsStatus: status,
    isLoadingPermissions: isLoading,
    fetchSelfUserPermissionsError: error,
  }
}
