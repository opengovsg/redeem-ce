import {useState, useCallback, useEffect} from 'react'
import {useQuery} from '@tanstack/react-query'
import _ from 'lodash'

import {fetchGroupById} from 'services/RedeemApi'

import {is404Error} from 'helpers/utils'
import {GroupedVoucher, Voucher} from 'types/voucher'
import {Campaign} from 'types/campaign'

const RETRIES_MAX = 3

const useGroupWithRefetchInterval = (
  groupId: string,
  refetchInterval: number,
): {
  voucherGroup: Voucher[]
  groupData: GroupedVoucher
  campaign: Campaign
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
    queryKey: ['groups', groupId],
    queryFn: () => fetchGroupById(groupId),
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
  })

  useEffect(() => {
    if (error) {
      disableRefetch()
    }
  }, [error])

  const voucherGroup = _.get(response, 'data.vouchers', [])
  const groupData = _.get(response, 'data') as unknown as GroupedVoucher
  const campaign = _.get(response, 'campaign') as unknown as Campaign

  return {
    voucherGroup,
    groupData,
    campaign,
    fetchGroupByIdStatus: status,
    isFetchingGroupById: isFetching,
    fetchGroupByIdError: error,
  }
}

export default useGroupWithRefetchInterval
