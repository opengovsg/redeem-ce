import { useToast } from 'data/Toasts'
import { useCallback } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import {
  sendGroupVouchers,
  updateGroupedVoucherDetails,
  getVouchersToPrint,
} from 'services/RedeemApi'

import { UpdateGroupedVoucherDetailsParams } from 'services/RedeemApi/types'

// Refer to useQuery here
// https://react-query.tanstack.com/docs/guides/queries#displaying-background-fetching-loading-states

export function useSendGroupedVouchers() {
  const { toastErrorWithoutTitle } = useToast()
  const { mutateAsync, status, data, error, reset, isLoading } = useMutation(
    sendGroupVouchers,
    {
      onError: () => {
        toastErrorWithoutTitle({
          primaryText: 'Oops an error has occurred. ',
          message: 'Unable to send grouped voucher',
        })
      },
      // On success, replace the cached query data of campaign voucher list by finding its index and
      // replacing it with the voucher object returned from sending successful
    }
  )

  const sendGroupedVouchers = useCallback(
    (groupId: string) => mutateAsync({ groupId }),
    [mutateAsync]
  )

  return {
    sendGroupedVouchers,
    isSendGroupedVouchersLoading: isLoading,
    sendGroupedVouchersStatus: status,
    sendGroupedVouchersResponse: data,
    sendGroupedVouchersError: error,
    resetSendGroupedVouchers: reset,
  }
}

export function useGetVouchersToPrint() {
  // TODO: Use react query
  return getVouchersToPrint
}

export function useUpdateGroupedVoucherDetails({
  campaignId,
}: {
  campaignId: string
}) {
  const { toastErrorWithoutTitle, toastSuccessWithoutTitle } = useToast()
  const queryCache = useQueryClient()
  const { mutateAsync, status, data, error, reset, isLoading } = useMutation(
    updateGroupedVoucherDetails,
    {
      onError: () => {
        toastErrorWithoutTitle({
          primaryText: 'Oops an error has occurred. ',
          message:
            'Please check if name or mobile number field is being filled up. Otherwise, please check if mobile number is either not empty or valid!',
        })
      },
      // TODO: Consider if not refetching is more appropriate
      onSuccess: () => {
        queryCache.invalidateQueries([campaignId, 'groupedVouchers'])
        toastSuccessWithoutTitle({
          primaryText: 'Success! ',
          secondaryText: 'Recipient details changes have been saved.',
        })
      },
    }
  )

  const updateGroupedVoucherDetailsCallback = useCallback(
    ({ groupId, updateGroupParams }: UpdateGroupedVoucherDetailsParams) =>
      mutateAsync({ groupId, updateGroupParams }),
    [mutateAsync]
  )

  return {
    updateGroupedVoucherDetails: updateGroupedVoucherDetailsCallback,
    isUpdateGroupedVoucherDetailsLoading: isLoading,
    updateGroupedVoucherDetailsStatus: status,
    updateGroupedVoucherDetailsResponse: data,
    updateGroupedVoucherDetailsError: error,
    resetUpdateGroupedVoucherDetails: reset,
  }
}
