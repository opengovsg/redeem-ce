import { AxiosError } from 'axios'
import { useToast } from 'data/Toasts'
import { openInNewTab } from 'helpers/utils'
import _ from 'lodash'
import { useMutation, useQuery } from 'react-query'
import {
  downloadCampaignVoucherLinks,
  fetchCampaignSettlementReports,
  fetchCampaignSettlementReportURL,
  fetchCampaignTransactionReports,
  fetchCampaignTransactionReportURL,
  fetchCampaignVoucherReportURL,
} from 'services/RedeemApi'

// Refer to useQuery here
// https://react-query.tanstack.com/docs/guides/queries#displaying-background-fetching-loading-states

export function useCampaignSettlementReports(
  campaignId: string,
  onOpenSettlementsModal: (() => void) | null
) {
  const { toastErrorWithoutTitle } = useToast()
  const {
    data: response,
    refetch,
    status,
    isFetching,
    error,
  } = useQuery(
    [campaignId, 'settlementReports'],
    () => fetchCampaignSettlementReports(campaignId),
    {
      enabled: false,
      onSuccess: (successData) => {
        if (successData.totalItems !== 0 && !_.isNull(onOpenSettlementsModal)) {
          onOpenSettlementsModal()
        } else {
          toastErrorWithoutTitle({
            message:
              'Please wait 1 working day after transactions have started to download your settlements report.',
          })
        }
      },
    }
  )

  return {
    campaignSettlementReports: response?.data,
    fetchCampaignSettlementReports: refetch,
    fetchCampaignSettlementReportsStatus: status,
    isFetchingCampaignSettlementReports: isFetching,
    fetchCampaignSettlementReportsError: error,
  }
}

export function useDownloadCampaignSettlementReport({
  campaignId,
  key,
}: {
  campaignId: string
  key: string
}) {
  const { mutateAsync, status, data, error, reset, isLoading } = useMutation(
    async () => {
      const response = await fetchCampaignSettlementReportURL({
        campaignId,
        key,
      })
      const reportUrl = response?.link
      if (reportUrl) {
        openInNewTab(reportUrl)
      }
    }
  )

  return {
    downloadCampaignSettlementReport: mutateAsync,
    isDownloadCampaignSettlementReportLoading: isLoading,
    downloadCampaignSettlementReportStatus: status,
    downloadCampaignSettlementReportResponse: data,
    downloadCampaignSettlementReportError: error,
    resetDownloadCampaignSettlementReport: reset,
  }
}

export function useCampaignTransactionReports(
  campaignId: string,
  onClickOpenDownloadTransactionModal: (() => void) | null
) {
  const { toastErrorWithoutTitle } = useToast()
  const {
    data: response,
    refetch,
    status,
    isFetching,
    error,
  } = useQuery(
    [campaignId, 'transactionReports'],
    () => fetchCampaignTransactionReports(campaignId),
    {
      enabled: false,
      onSuccess: (successData) => {
        if (successData.totalItems !== 0) {
          onClickOpenDownloadTransactionModal?.()
        } else {
          toastErrorWithoutTitle({
            message:
              'Please wait 1 working day after transactions have started to download your transactions report.',
          })
        }
      },
    }
  )

  return {
    campaignTransactionReports: response?.data,
    fetchCampaignTransactionReports: refetch,
    fetchCampaignTransactionReportsStatus: status,
    isFetchingCampaignTransactionReports: isFetching,
    fetchCampaignTransactionReportsError: error,
  }
}

export function useDownloadCampaignTransactionReport({
  campaignId,
  key,
}: {
  campaignId: string
  key: string
}) {
  const { mutateAsync, status, data, error, reset, isLoading } = useMutation(
    async () => {
      const response = await fetchCampaignTransactionReportURL({
        campaignId,
        key,
      })
      const reportUrl = response?.link
      if (reportUrl) {
        openInNewTab(reportUrl)
      }
    }
  )

  const downloadCampaignTransactionReport = mutateAsync

  return {
    downloadCampaignTransactionReport,
    isDownloadCampaignTransactionReportLoading: isLoading,
    downloadCampaignTransactionReportStatus: status,
    downloadCampaignTransactionReportResponse: data,
    downloadCampaignTransactionReportError: error,
    resetDownloadCampaignTransactionReport: reset,
  }
}

export function useCampaignVoucherReportURL(campaignId: string) {
  const { toastErrorWithoutTitle } = useToast()
  const { mutateAsync, status, data, error, reset, isLoading } = useMutation(
    async () => {
      const response = await fetchCampaignVoucherReportURL({
        campaignId,
      })
      const reportUrl = response?.link
      if (reportUrl) {
        openInNewTab(reportUrl)
      }
    },
    {
      onError: (axiosError: AxiosError) => {
        toastErrorWithoutTitle({
          message:
            axiosError.response?.status === 404
              ? 'Please wait 1 working day after transactions have started to download your voucher report.'
              : 'Oops, something went wrong.',
        })
      },
    }
  )

  const downloadCampaignVoucherReport = mutateAsync

  return {
    downloadCampaignVoucherReport,
    isDownloadCampaignVoucherReportLoading: isLoading,
    downloadCampaignVoucherReportStatus: status,
    downloadCampaignVoucherReportResponse: data,
    downloadCampaignVoucherReportError: error,
    resetDownloadCampaignVoucherReport: reset,
  }
}

export function useDownloadCampaignVoucherLinks(campaignId: string) {
  const { toastErrorWithoutTitle } = useToast()
  const { mutateAsync, data, error, isLoading } = useMutation(
    async () => {
      const response = await downloadCampaignVoucherLinks({
        campaignId,
      })
      const csvUrl = response.downloadUrl
      if (csvUrl) {
        openInNewTab(csvUrl)
      }
    },
    {
      onError: (axiosError: AxiosError) => {
        toastErrorWithoutTitle({
          message:
            axiosError.response?.status === 402
              ? 'Please wait until vouchers have been created to download your voucher links report.'
              : 'Oops, something went wrong.',
        })
      },
    }
  )

  return {
    downloadCampaignVoucherLinks: mutateAsync,
    isDownloadCampaignVoucherLinksLoading: isLoading,
    downloadCampaignVoucherLinksResponse: data,
    downloadCampaignVoucherLinksError: error,
  }
}
