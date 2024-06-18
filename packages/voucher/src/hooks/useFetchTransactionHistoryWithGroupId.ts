import {useState, useCallback, useEffect} from 'react'
import {useQuery} from '@tanstack/react-query'
import _ from 'lodash'

import {fetchTransactionHistoryByGroupId} from 'services/RedeemApi'

import {is404Error} from 'helpers/utils'
import {GroupedVoucherEvent} from 'types/voucher'

const RETRIES_MAX = 3

const useFetchTransactionHistoryWithGroupId = ({
  groupId,
  refetchInterval,
  enabled = true,
}: {
  groupId: string
  refetchInterval: number
  enabled?: boolean
}): {
  groupedVoucherEvents?: GroupedVoucherEvent[]
  fetchGroupByIdStatus: 'pending' | 'idle' | 'error' | 'loading' | 'success'
  isFetchingGroupById: boolean
  fetchGroupByIdError: unknown
} => {
  const [isRefetchEnabled, setIsRefetchEnabled] = useState(true)
  const disableRefetch = useCallback(() => setIsRefetchEnabled(false), [])
  const {
    data: response,
    status,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['groupedVoucherEvents', groupId],
    queryFn: () => fetchTransactionHistoryByGroupId(groupId),

    // Retry logic on failure
    retry: (failureCount, responseError) => {
      // Will retry when not 404
      // 404 means voucher not found
      return !is404Error(responseError) && failureCount < RETRIES_MAX
    },
    // This means that the hook does not automatically run
    refetchInterval: isRefetchEnabled ? refetchInterval : false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: isRefetchEnabled,
    enabled,
  })

  useEffect(() => {
    if (error) {
      disableRefetch()
    }
  }, [error])

  const groupedVoucherEvents = _.get(response, 'data', [])

  return {
    groupedVoucherEvents,
    fetchGroupByIdStatus: status,
    isFetchingGroupById: isFetching,
    fetchGroupByIdError: error,
  }
}

export default useFetchTransactionHistoryWithGroupId
