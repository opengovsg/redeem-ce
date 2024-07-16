import { useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import RedeemApi from 'services/redeem-api'
import * as Storage from 'services/storage'

import { isClientError } from 'helpers/utils'
import _ from 'lodash'

// Refer to useQuery here
// https://react-query.tanstack.com/docs/guides/queries#displaying-background-fetching-loading-states

const RETRIES_MAX = 3

const SESSION_QUERY_KEY = 'session'

function retrieveMerchantBankDetails(merchant) {
  if (!merchant) {
    return ''
  }
  if (merchant.paymentPreferredPaymentMethod === 'PAYNOW') {
    if (merchant.paymentPaynowNric) {
      return `PayNow NRIC: ${merchant.paymentPaynowNric}`
    }
    if (merchant.paymentPaynowMobileNumber) {
      return `PayNow Mobile: ${merchant.paymentPaynowMobileNumber}`
    }
    if (merchant.paymentPaynowUen) {
      return `PayNow UEN: ${merchant.paymentPaynowUen}`
    }
  }
  if (merchant.paymentPreferredPaymentMethod === 'BANK_TRANSFER') {
    return `Bank Account: ${merchant.paymentBankAccountNumber}`
  }
  return ''
}

export default function useSession() {
  const {
    data: response,
    refetch,
    status,
    isFetching,
    error,
  } = useQuery(
    SESSION_QUERY_KEY,
    async () => {
      const session = await RedeemApi.fetchSession()
      return session
    },
    {
      // Returns true to indicate should retry
      // Will retry when not client error and the number of retries has not reached the max
      retry: (failureCount, responseError) =>
        !isClientError(responseError) && failureCount < RETRIES_MAX,
    },
  )

  return {
    session: response
      ? {
          userName: _.get(response, 'user.name'),
          merchantId: _.get(response, 'merchant.id'),
          merchantName: _.get(response, 'merchant.shopName'),
          merchantAccessCode: _.get(response, 'merchant.accessCode'),
          merchantBankDetails: retrieveMerchantBankDetails(response.merchant),
          user: response.user,
          merchant: response.merchant,
        }
      : {},
    fetchSession: refetch,
    fetchSessionStatus: status,
    isFetchingSession: isFetching,
    fetchSessionError: error,
  }
}

export function useRequestJoinMerchantWithCode() {
  const queryClient = useQueryClient()
  const { mutateAsync, status, data, error, reset } = useMutation(
    (code) => RedeemApi.requestJoinMerchantWithCode(code),
    {
      onSuccess: async () => {
        // Write to storage to show successfully joined shop modal later,
        // and invalidate the session query key to refetch session which
        // will contain the updated merchant association
        await Storage.saveShouldShowSuccessJoinShop(true)
        queryClient.invalidateQueries(SESSION_QUERY_KEY)
      },
    },
  )

  return {
    requestJoinMerchantWithCode: mutateAsync,
    requestJoinMerchantWithCodeStatus: status,
    requestJoinMerchantWithCodeResponse: data,
    requestJoinMerchantWithCodeError: error,
    resetRequestJoinMerchantWithCode: reset,
  }
}

export function useRequestLeaveMerchant() {
  const queryClient = useQueryClient()
  const { mutateAsync, status, data, error, reset } = useMutation(
    RedeemApi.requestLeaveMerchant,
    {
      onSuccess: () => queryClient.invalidateQueries(SESSION_QUERY_KEY),
    },
  )
  // TODO: implement alert
  const showConfirmation = useCallback(() => {
    // showAlert({
    //   body: 'Change Shop',
    //   title: 'You will need to re-enter a shop code.',
    //   positiveText: 'Change Shop',
    //   onPositivePress: async () => {
    //     try {
    //       await mutateAsync()
    //     } catch (mutateError) {
    //       showError(mutateError)
    //     }
    //   },
    //   negativeText: 'Cancel'
    // })
  }, [])

  return {
    requestLeaveMerchantWithConfirmation: showConfirmation,
    requestLeaveMerchant: mutateAsync,
    requestLeaveMerchantStatus: status,
    requestLeaveMerchantResponse: data,
    requestLeaveMerchantError: error,
    resetRequestLeaveMerchant: reset,
  }
}

export function useRequestUpdateUserName() {
  const queryClient = useQueryClient()
  const { mutateAsync, status, data, error, reset } = useMutation(
    (name) => RedeemApi.requestUpdateUserName(name),
    {
      onSuccess: () => queryClient.invalidateQueries(SESSION_QUERY_KEY),
    },
  )

  return {
    requestUpdateUserName: mutateAsync,
    requestUpdateUserNameStatus: status,
    requestUpdateUserNameResponse: data,
    requestUpdateUserNameError: error,
    resetRequestUpdateUserName: reset,
  }
}
