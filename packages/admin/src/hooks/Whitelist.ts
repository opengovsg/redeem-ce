import { useCallback } from 'react'
import { openInNewTab } from 'helpers/utils'
import { useMutation, useQueryClient } from 'react-query'
import {
  fetchTemplateWhitelist,
  uploadWhitelistForCampaign,
  checkWhitelistForCampaign,
  downloadWhitelistForCampaign,
  checkIfRecipientInWhitelistForCampaign,
} from 'services/RedeemApi'
import { useToast } from 'data/Toasts'
import type { AxiosError } from 'axios'
import { WhitelistCheckValidityResponseType } from 'services/RedeemApi/types'
import {
  baseMetaDataForWhitelist,
  WhitelistMetaDataAction,
} from 'routes/Campaigns/Campaign/components/SettingsTab/components/EligibilityType/components/WhitelistContainer/components/WhitelistAttachmentWithModal/WhitelistReducer'
import { CheckIfRecipientInWhitelistForCampaignParams } from './types'

export function useDownloadWhitelist() {
  const { toastError } = useToast()
  const { mutateAsync, error, isLoading } = useMutation(
    async ({
      campaignId,
      s3VersionId,
    }: {
      campaignId: string
      s3VersionId?: string
    }) => {
      const response = await downloadWhitelistForCampaign({
        campaignId,
        versionId: s3VersionId,
      })
      const whitelistUrl = response?.link
      if (whitelistUrl) {
        openInNewTab(whitelistUrl)
      }
    },
    {
      onError: () => {
        toastError({ message: 'Oops an error has occurred' })
      },
    }
  )

  return {
    downloadWhitelist: mutateAsync,
    downloadWhitelistError: error,
    isDownloadWhitelistLoading: isLoading,
  }
}

export function useDownloadTemplateWhitelist() {
  const { toastError } = useToast()
  const { mutateAsync, error, isLoading } = useMutation(
    // TODO: Extending type for address in the future
    async () => {
      const response = await fetchTemplateWhitelist()
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
    downloadTemplateWhitelist: mutateAsync,
    downloadTemplateWhitelistError: error,
    isDownloadTemplateWhitelistLoading: isLoading,
  }
}

export function useUploadWhitelist(campaignId: string) {
  const { toastError } = useToast()
  const queryClient = useQueryClient()
  const { mutateAsync, error, isLoading } = useMutation(
    async ({ whitelistCsv }: { whitelistCsv: File }) =>
      uploadWhitelistForCampaign({ campaignId, whitelistCsv }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(campaignId)
      },

      onError: () => {
        toastError({ message: 'Oops an error has occurred' })
      },
    }
  )

  return {
    uploadWhitelist: mutateAsync,
    uploadWhitelistError: error,
    isUploadingWhitelist: isLoading,
  }
}

export function useCheckWhitelist(
  dispatch: React.Dispatch<WhitelistMetaDataAction>
) {
  const { mutateAsync, error, isLoading } = useMutation(
    async ({
      campaignId,
      whitelistCsv,
    }: {
      campaignId: string
      whitelistCsv: File
    }) => {
      // There is a delay of 500 because we want to ensure that the loading animation of the spinner to be smooth rather than a sudden change for files that
      // are especially small. @see https://opengovproducts.slack.com/archives/CS0KBDFEE/p1681452348018219?thread_ts=1681370834.921579&cid=CS0KBDFEE
      const [result] = await Promise.all([
        checkWhitelistForCampaign({
          campaignId,
          whitelistCsv,
          dispatch,
        }),
        // eslint-disable-next-line no-promise-executor-return
        new Promise((resolve) => setTimeout(resolve, 500)),
      ])

      // Indicates that we have finish checking the whitelist
      dispatch({
        type: 'CHECKING',
        payload: { checkingWhitelistProgress: 100 },
      })

      const { whitelistMetadata, hasWhitelistError, href } = result
      // If there is a whitelistError in terms of duplicates or invalid recipient ids, a signedLink from s3 is being returned
      if (hasWhitelistError) {
        return dispatch({
          type: WhitelistCheckValidityResponseType.INVALID_PARAMS,
          payload: {
            ...baseMetaDataForWhitelist,
            ...whitelistMetadata,
            href,
          },
        })
      }

      return dispatch({
        type: WhitelistCheckValidityResponseType.SUCCESS,
        payload: {
          ...baseMetaDataForWhitelist,
          ...whitelistMetadata,
          whitelistCsv,
        },
      })
    },
    {
      onError: (err: unknown) => {
        // Indicates that we have finish checking the whitelist
        dispatch({
          type: 'CHECKING',
          payload: { checkingWhitelistProgress: 100 },
        })

        const typedError = err as AxiosError<{ error: { code: string } }>
        // 400s are CSV errors from the backend that indicate either:
        // 1. Empty CSV
        // 2. Invalid headers in CSV
        if (typedError.response && typedError.response.status === 400) {
          const errorCode = typedError.response.data.error.code
          // The href is empty because CSVs are not fully parsed in the event of such errors
          return dispatch({
            type: WhitelistCheckValidityResponseType.INVALID_PARAMS,
            payload: {
              ...baseMetaDataForWhitelist,
              href: '',
              ...(errorCode === 'whitelist_empty_csv_error' && {
                isEmptyCSV: true,
              }),
              ...(errorCode === 'whitelist_invalid_headers_error' && {
                hasInvalidHeader: true,
              }),
            },
          })
        }

        // Returns a generic error response for unknown type
        return dispatch({
          type: WhitelistCheckValidityResponseType.ERROR,
          payload: baseMetaDataForWhitelist,
        })
      },
    }
  )

  return {
    checkWhitelist: mutateAsync,
    checkWhitelistError: error,
    isCheckingWhitelist: isLoading,
  }
}

export function useCheckIfRecipientNotInWhitelistForCampaign({
  campaignId,
  hasWhitelist,
}: {
  campaignId: string
  hasWhitelist: boolean
}) {
  return useCallback(
    async (params: CheckIfRecipientInWhitelistForCampaignParams) => {
      if (!hasWhitelist || params === null) return false
      try {
        const { recipientId } = params
        const response = await checkIfRecipientInWhitelistForCampaign({
          campaignId,
          recipientId,
        })

        return !response?.result
      } catch (err) {
        return false
      }
    },
    [campaignId, hasWhitelist]
  )
}
