import { openInNewTab } from 'helpers/utils'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  checkBulkCreateForCampaign,
  checkBulkCreateJobStatus,
  fetchTemplateBulkCreate,
  submitBulkCreateForCampaign,
} from 'services/RedeemApi'
import { useToast } from 'data/Toasts'
import type { AxiosError } from 'axios'
import {
  BulkCreateCheckValidityResponseType,
  BulkCreateJobStatus,
} from 'services/RedeemApi/types'
import {
  BulkCreateMetaDataAction,
  baseMetaDataForBulkCreate,
} from 'routes/Campaigns/Campaign/components/VouchersTab/components/BulkCreateVoucherModal/BulkCreateReducer'
import { useState } from 'react'

export function useDownloadTemplateBulkCreate() {
  const { toastError } = useToast()
  const { mutateAsync, error, isLoading } = useMutation(
    async () => {
      const response = await fetchTemplateBulkCreate()
      const templateUrl = response.link
      openInNewTab(templateUrl)
    },
    {
      onError: () => {
        toastError({ message: 'Oops an error has occurred' })
      },
    }
  )

  return {
    downloadTemplateBulkCreate: mutateAsync,
    downloadTemplateBulkCreateError: error,
    isDownloadTemplateBulkCreateLoading: isLoading,
  }
}

export function useSubmitBulkCreate(campaignId: string) {
  const { toastError } = useToast()
  const { mutateAsync, error, isLoading } = useMutation(
    async ({ bulkCreateCsv }: { bulkCreateCsv: File }) => {
      return submitBulkCreateForCampaign({
        campaignId,
        bulkCreateCsv,
      })
    },
    {
      onError: (err: unknown) => {
        const typedError = err as AxiosError<{ error: { message: string } }>
        return toastError({
          message:
            typedError?.response?.data.error.message ||
            'Oops an error has occurred',
        })
      },
    }
  )

  return {
    submitBulkCreate: mutateAsync,
    submitBulkCreateError: error,
    isSubmittingBulkCreate: isLoading,
  }
}

export function useCheckBulkCreateJobStatus(campaignId: string, jobId: string) {
  const { toastError } = useToast()
  const queryClient = useQueryClient()
  const [isRefetchEnabled, setIsRefetchEnabled] = useState(true)

  const { data, error } = useQuery(
    ['bulkCreateJobStatus', campaignId, jobId],
    async () => {
      return checkBulkCreateJobStatus({
        campaignId,
        jobId,
      })
    },
    {
      // Hook does not automatically run
      refetchInterval: isRefetchEnabled ? 2000 : false, // refetch every 2 seconds
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: isRefetchEnabled,
      onError: () => {
        setIsRefetchEnabled(false)
        toastError({ message: 'Oops an error has occurred' })
      },
      onSuccess: (successData) => {
        if (
          successData?.jobStatus === BulkCreateJobStatus.success ||
          successData?.jobStatus === BulkCreateJobStatus.failure
        ) {
          setIsRefetchEnabled(false)
          queryClient.invalidateQueries(campaignId)
        }
      },
    }
  )

  return {
    bulkCreateJobStatus: data?.jobStatus || BulkCreateJobStatus.not_started,
    numVouchersCreated: data?.numSuccessfulCreations || 0,
    numOfGroupedVouchersToCreate: data?.numOfGroupedVouchersToCreate || 0,
    bulkCreateJobStatusError: error,
  }
}

export function useCheckBulkCreate(
  dispatch: React.Dispatch<BulkCreateMetaDataAction>
) {
  const { toastError } = useToast()
  const { mutateAsync, error, isLoading } = useMutation(
    async ({
      campaignId,
      bulkCreateCsv,
    }: {
      campaignId: string
      bulkCreateCsv: File
    }) => {
      // There is a delay of 500 because we want to ensure that the loading animation of the spinner to be smooth rather than a sudden change for files that
      // are especially small. @see https://opengovproducts.slack.com/archives/CS0KBDFEE/p1681452348018219?thread_ts=1681370834.921579&cid=CS0KBDFEE
      const [result] = await Promise.all([
        checkBulkCreateForCampaign({
          campaignId,
          bulkCreateCsv,
          dispatch,
        }),
        // eslint-disable-next-line no-promise-executor-return
        new Promise((resolve) => setTimeout(resolve, 500)),
      ])

      // Indicates that we have finished checking the CSV
      dispatch({
        type: 'CHECKING',
        payload: { checkingBulkCreateProgress: 100 },
      })

      const { bulkCreateMetadata, hasBulkCreateError, href, haveExtraDetails } =
        result

      const {
        numberOfInvalidRecipientIds,
        numberOfDuplicateRecipientIds,
        numberOfMissingRecipientIds,
        ...otherBulkCreateMetadata
      } = bulkCreateMetadata

      // A signedLink from s3 is being returned as a href if there is a bulk create error in terms of:
      // 1. Empty rows
      // 2. Invalid recipient id
      // 3. Invalid mobile number
      if (hasBulkCreateError) {
        return dispatch({
          type: BulkCreateCheckValidityResponseType.INVALID_PARAMS,
          payload: {
            ...baseMetaDataForBulkCreate,
            numberOfInvalidRecipientIds,
            numberOfDuplicateRecipientIds,
            numberOfMissingRecipientIds,
            ...otherBulkCreateMetadata,
            href,
          },
        })
      }

      return dispatch({
        type: BulkCreateCheckValidityResponseType.CHECKING_SUCCESS,
        payload: {
          ...baseMetaDataForBulkCreate,
          numberOfInvalidRecipientIds,
          numberOfDuplicateRecipientIds,
          numberOfMissingRecipientIds,
          ...otherBulkCreateMetadata,
          bulkCreateCsv,
          ...(haveExtraDetails && { href }), // If there are extra details, we also need to set the href for details download
        },
      })
    },
    {
      onError: (err: unknown) => {
        // Indicates that we have finished checking the CSV
        dispatch({
          type: 'CHECKING',
          payload: { checkingBulkCreateProgress: 100 },
        })

        const typedError = err as AxiosError<{
          error: { code: string; message: string }
        }>
        // 400s are CSV errors from the backend that indicate either:
        // 1. Empty CSV
        // 2. Invalid headers in CSV
        if (typedError.response && typedError.response.status === 400) {
          const errorCode = typedError.response.data.error.code
          // The href is empty because CSVs are not fully parsed in the event of such errors
          return dispatch({
            type: BulkCreateCheckValidityResponseType.INVALID_PARAMS,
            payload: {
              ...baseMetaDataForBulkCreate,
              href: '',
              ...(errorCode === 'bulk_create_empty_csv_error' && {
                isEmptyCSV: true,
              }),
              ...(errorCode === 'bulk_create_invalid_headers_error' && {
                hasInvalidHeader: true,
              }),
            },
          })
        }

        if (typedError.response && typedError.response.status === 429) {
          return toastError({ message: typedError.response.data.error.message })
        }

        // Returns a generic error response for unknown type
        return dispatch({
          type: BulkCreateCheckValidityResponseType.ERROR,
          payload: baseMetaDataForBulkCreate,
        })
      },
    }
  )

  return {
    checkBulkCreate: mutateAsync,
    checkBulkCreateError: error,
    isCheckingBulkCreate: isLoading,
  }
}
