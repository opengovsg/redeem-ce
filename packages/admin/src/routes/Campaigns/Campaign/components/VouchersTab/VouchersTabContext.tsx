import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  useCreateCampaignVoucher,
  useCampaignVouchersPaginated,
  useCampaignVouchersSearchExists,
} from 'hooks/CampaignVouchers'
import {
  useSendGroupedVouchers,
  useUpdateGroupedVoucherDetails,
  useGetVouchersToPrint,
} from 'hooks/Voucher'
import _ from 'lodash'
import { printVouchers } from 'hooks/Print'
import { useToast } from 'data/Toasts'
import { scrollToTop } from 'helpers/utils'
import { useDebouncedCallback } from 'use-debounce'
import { usePrevious } from '@chakra-ui/react'
import {
  useCampaignVoucherReportURL,
  useDownloadCampaignVoucherLinks,
} from 'hooks/CampaignReports'
import { useGroupedVoucherEvents } from 'hooks/Events'
import { useStopwatch } from 'hooks/stopwatch'
import {
  logCreateVouchersAction,
  useLogCreateVoucherStepChanges,
} from 'helpers/monitoring'
import { useCheckIfRecipientNotInWhitelistForCampaign } from 'hooks/Whitelist'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import {
  GroupedVoucherEventResponseObject,
  VoucherType,
  VoucherValue,
} from 'services/RedeemApi/types'
import { UseMutateAsyncFunction } from 'react-query'
import { AxiosError } from 'axios'
import { CheckIfRecipientInWhitelistForCampaignParams } from 'hooks/types'
import { isCreateVoucherAddressUsePrefill as initialIsCreateVoucherAddressUsePrefill } from 'constants/street-addresses'
import { VOUCHER_TYPES } from './components/CreateVoucherModal/constants'

// Temporarily solution for typescript typing
type CreateVoucherParams = {
  voucherLabelParam?: string
  voucherNameParam?: string
  voucherContactNumberParam?: string
  voucherRecipientIdParam?: string
  voucherBlockNumberParam?: string
  voucherStreetNameParam?: string
  voucherPostalCodeParam?: string
  voucherFloorNumberParam?: string
  voucherUnitNumberParam?: string
  voucherGroupDenominationsParam?: VoucherValue[]
}

// Not very sure how to make this typing better
type ReactQueryMutateFunctionGeneric = UseMutateAsyncFunction<
  void,
  AxiosError<any, any>,
  void,
  unknown
>

type VouchersTabContextProps =
  | {
      // Vouchers Related
      vouchers: VoucherType[] | undefined
      currentSearchQuery: string
      getNextPageOfVouchers: (() => Promise<void>) | null
      getPreviousPageOfVouchers: (() => void) | null
      isLoadingNextPage: boolean
      isLoadingPreviousPage: boolean
      isLoading: boolean
      filterVouchersValue: string
      setFilterVouchersValue: React.Dispatch<React.SetStateAction<string>>
      refreshFetchVouchersByCampaignId: () => void
      // Create Vouchers related
      advanceStep: (steps: number) => void
      // TODO: better typing
      getIsVoucherGroupsMatchingQueryExists: ({
        block,
        floor,
        unit,
        postalCode,
        search,
        recipientId,
      }: any) => Promise<boolean>
      checkIfRecipientNotInWhitelistForCampaign: (
        params: CheckIfRecipientInWhitelistForCampaignParams
      ) => Promise<boolean>
      currentCreateStep: number
      setCurrentCreateStep: React.Dispatch<React.SetStateAction<number>>
      isCreateVoucherAddressUsePrefill: boolean
      setIsCreateVoucherAddressUsePrefill: React.Dispatch<
        React.SetStateAction<boolean>
      >
      selectedVoucherType: VOUCHER_TYPES | null
      setSelectedVoucherType: React.Dispatch<
        React.SetStateAction<VOUCHER_TYPES | null>
      >
      onClickCreateNew: () => void
      isCreateVoucherModalOpen: boolean
      closeCreateVoucherModal: () => void
      setIsCreateVoucherModalOpen: React.Dispatch<React.SetStateAction<boolean>>
      isCreateLoading: boolean
      isLoadingCreateVoucherOpen: boolean
      setIsLoadingCreateVoucherOpen: React.Dispatch<
        React.SetStateAction<boolean>
      >
      // Print Vouchers Related
      isPrintLoading: boolean
      onPrintUnusedVouchers: (name: string, groupId: string) => void
      setIsPrintLoading: React.Dispatch<React.SetStateAction<boolean>>
      // Voucheres table & Create Vouchers Related
      onCreateVoucherModalApplySearch: (value: string) => void
      createCampaignVoucher: (
        createVoucherParams: CreateVoucherParams
      ) => Promise<void | undefined>
      // Grouped related
      onSelectGroup: (group: VoucherType) => void
      onCloseGroup: () => void
      selectedGroup: VoucherType | undefined
      isUpdateVoucherGroupModalOpen: boolean
      selectedGroupToUpdate: VoucherType | undefined
      isSendGroupedVoucherModalOpen: boolean
      selectedGroupToSend: VoucherType | undefined
      groupedVoucherEvents: GroupedVoucherEventResponseObject[]
      isLoadingGroupedVoucherEvents: boolean
      openUpdateVoucherGroupModal: React.Dispatch<
        React.SetStateAction<string | null>
      >
      closeUpdateVoucherGroupModal: () => void
      updateVoucherGroup: (...args: any) => Promise<void>
      openSendGroupedVoucherModal: React.Dispatch<
        React.SetStateAction<string | null>
      >
      closeSendGroupedVoucherModal: () => void
      sendGroupedVouchersStatus: 'error' | 'idle' | 'loading' | 'success'
      sendGroupedVouchersError: unknown
      onSendGroupedVouchers: (groupId: string) => Promise<any>
      isSendGroupedVouchersLoading: boolean
      isUpdateVoucherGroupLoading: boolean
      // Campaign Report related
      isDownloadTransactionsModalOpen: boolean
      onCloseDownloadTransactionsModal: () => void
      onOpenDownloadTransactionsModal: () => void
      onDownloadCampaignVoucherReport: ReactQueryMutateFunctionGeneric
      onDownloadCampaignVoucherLinks: ReactQueryMutateFunctionGeneric
      isDownloadCampaignVoucherLinksLoading: boolean
      // Bulk Create related
      isBulkCreateVoucherModalOpen: boolean
      closeBulkCreateVoucherModal: () => void
      bulkCreateModalKey: number
      onClickBulkCreate: () => void
    }
  | undefined

const VouchersTabContext = createContext<VouchersTabContextProps>(undefined)

type VouchersTabProviderProps = { children: React.ReactNode }

// TOOD: Refactor this, it's too huge And convert in typescript in the future
// eslint-disable-next-line react/prop-types
export const VouchersTabProvider = ({ children }: VouchersTabProviderProps) => {
  const {
    hasWhitelist,
    campaignId,
    campaignName,
    campaignExpiresAt,
    extraQrPrefix,
  } = useCampaignContext()

  const { toastError } = useToast()

  // ============================================ Vouchers States ============================================
  const [filterVouchersValue, setFilterVouchersValue] = useState('')
  const previousFilterVouchersValue = usePrevious(filterVouchersValue)

  // ============================================ Create Vouchers States ============================================
  const [currentCreateStep, setCurrentCreateStep] = useState(0)
  const [
    isCreateVoucherAddressUsePrefill,
    // TODO: Consider enabling by default, and
    // implement your own address lookup
    setIsCreateVoucherAddressUsePrefill,
  ] = useState(initialIsCreateVoucherAddressUsePrefill)
  const [selectedVoucherType, setSelectedVoucherType] =
    useState<VOUCHER_TYPES | null>(null)
  const [isCreateVoucherModalOpen, setIsCreateVoucherModalOpen] =
    useState(false)
  const [isCreateLoading, setIsCreateLoading] = useState(false)
  const [isLoadingCreateVoucherOpen, setIsLoadingCreateVoucherOpen] =
    useState(false)

  // ============================================ Print Vouchers States ============================================
  const [isPrintLoading, setIsPrintLoading] = useState(false)

  // ============================================ Grouped Voucher Action States ============================================
  const [selectedVoucherGroupIdToUpdate, setSelectedVoucherGroupIdToUpdate] =
    useState<string | null>(null)
  const [selectedVoucherGroupIdToSend, setSelectedVoucherGroupIdToSend] =
    useState<string | null>(null)
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)

  // ============================================ Bulk Create States ============================================
  const [isBulkCreateVoucherModalOpen, setIsBulkCreateVoucherModalOpen] =
    useState(false)
  const [bulkCreateModalKey, setBulkCreateModalKey] = useState(0)

  // ============================================ Campaign Reports States ============================================
  const [isDownloadTransactionsModalOpen, setIsDownloadTransactionsModalOpen] =
    useState(false)

  // ============================================ Vouchers APIs ============================================
  const {
    vouchers,
    isFetchingVouchersByCampaignId,
    isFetchingVouchersByCampaignIdNextPage,
    isFetchingVouchersByCampaignIdPreviousPage,
    getNextPageOfVouchersByCampaignId,
    getPreviousPageOfVouchersByCampaignId,
    refreshFetchVouchersByCampaignId,
    updateFetchVouchersByCampaignIdSearchQuery,
    fetchVouchersByCampaignCurrentSearchQuery,
    // fetchVouchersByCampaignIdError,
    // fetchVouchersByCampaignIdStatus,
  } = useCampaignVouchersPaginated({
    campaignId,
    enabled: ({ search }) => !_.inRange(search.length, 1, 5),
  })

  const getNextPageOfVouchers = useMemo(() => {
    if (!getNextPageOfVouchersByCampaignId) {
      return null
    }
    return async () => {
      await getNextPageOfVouchersByCampaignId()
      scrollToTop()
    }
  }, [getNextPageOfVouchersByCampaignId])

  const getPreviousPageOfVouchers = useMemo(() => {
    if (!getPreviousPageOfVouchersByCampaignId) {
      return null
    }
    return () => {
      getPreviousPageOfVouchersByCampaignId()
      scrollToTop()
    }
  }, [getPreviousPageOfVouchersByCampaignId])

  const debouncedSearch = useCallback(
    useDebouncedCallback(updateFetchVouchersByCampaignIdSearchQuery, 500),
    [updateFetchVouchersByCampaignIdSearchQuery]
  )

  // ============================================ Helper APIs ===========================================
  const {
    resetAndStart: resetAndStartCreateVoucherStopwatch,
    getCurrentTimeMillis: getCreateVoucherStopwatchTimeMillis,
  } = useStopwatch()

  const onGetVouchersToPrint = useGetVouchersToPrint()
  const resetCreateModal = useCallback(() => {
    setSelectedVoucherType(null)
    setCurrentCreateStep(0)
    // TODO: Consider enabling by default, and
    // implement your own address lookup
    setIsCreateVoucherAddressUsePrefill(true)
  }, [])

  const onCreateVoucherModalApplySearch = useCallback(
    (value: string) => {
      setFilterVouchersValue(value)
      updateFetchVouchersByCampaignIdSearchQuery(value)
      setIsCreateVoucherModalOpen(false)
      resetCreateModal()
    },
    [resetCreateModal, setFilterVouchersValue]
  )

  const {
    createCampaignVoucher,
    // createCampaignVoucherStatus,
    // createCampaignVoucherResponse,
    // createCampaignVoucherError,
    // resetCreateCampaignVoucher,
  } = useCreateCampaignVoucher(campaignId)
  useLogCreateVoucherStepChanges({ stepNumber: currentCreateStep })

  const {
    sendGroupedVouchers,
    sendGroupedVouchersStatus,
    sendGroupedVouchersError,
    resetSendGroupedVouchers,
    isSendGroupedVouchersLoading,
  } = useSendGroupedVouchers()

  // ============================================ Create Vouchers APIs ============================================
  const advanceStep = (steps: number) =>
    setCurrentCreateStep((step) => step + steps)

  const getIsVoucherGroupsMatchingQueryExists =
    useCampaignVouchersSearchExists(campaignId)

  const checkIfRecipientNotInWhitelistForCampaign =
    useCheckIfRecipientNotInWhitelistForCampaign({ campaignId, hasWhitelist })

  const onClickCreateNew = useCallback(() => {
    resetAndStartCreateVoucherStopwatch()
    setFilterVouchersValue('')
    setIsCreateVoucherModalOpen(true)
  }, [])

  const closeCreateVoucherModal = useCallback(() => {
    if (isCreateLoading) {
      return
    }
    setIsCreateVoucherModalOpen(false)
    resetCreateModal()
  }, [resetCreateModal, isCreateLoading])

  const onCreateCampaignVoucher = useCallback(
    useDebouncedCallback(
      async ({
        voucherLabelParam,
        voucherNameParam,
        voucherContactNumberParam,
        voucherRecipientIdParam,
        voucherBlockNumberParam,
        voucherStreetNameParam,
        voucherPostalCodeParam,
        voucherFloorNumberParam,
        voucherUnitNumberParam,
        voucherGroupDenominationsParam,
      }: CreateVoucherParams) => {
        try {
          const result = await createCampaignVoucher({
            ...(voucherLabelParam && { label: voucherLabelParam }),
            ...(voucherNameParam && { name: voucherNameParam }),
            ...(voucherContactNumberParam && {
              contactNumber: voucherContactNumberParam,
            }),
            ...(voucherRecipientIdParam && {
              recipientId: voucherRecipientIdParam,
            }),
            ...(voucherGroupDenominationsParam && {
              values: voucherGroupDenominationsParam,
            }),
            ...(voucherBlockNumberParam && {
              block: voucherBlockNumberParam,
            }),
            ...(voucherStreetNameParam && {
              street: voucherStreetNameParam,
            }),
            ...(voucherPostalCodeParam && {
              postalCode: voucherPostalCodeParam,
            }),
            ...(voucherFloorNumberParam && {
              floor: voucherFloorNumberParam,
            }),
            ...(voucherUnitNumberParam && {
              unit: voucherUnitNumberParam,
            }),
          })

          if (selectedVoucherType === VOUCHER_TYPES.DIGITAL) {
            await sendGroupedVouchers(result.id)
            logCreateVouchersAction({
              type: selectedVoucherType,
              timeTaken: getCreateVoucherStopwatchTimeMillis(),
              isUsePrefill: isCreateVoucherAddressUsePrefill,
            })
          } else if (selectedVoucherType === VOUCHER_TYPES.PAPER) {
            const { vouchers: vouchersToPrint } = await onGetVouchersToPrint({
              groupId: result.id,
            })
            await printVouchers({
              vouchers: vouchersToPrint,
              name: result.name,
              campaignName,
              campaignExpiresAt,
              onPrintDialogOpen: () => {
                logCreateVouchersAction({
                  type: selectedVoucherType,
                  timeTaken: getCreateVoucherStopwatchTimeMillis(),
                  isUsePrefill: isCreateVoucherAddressUsePrefill,
                })
              },
              extraQrPrefix,
            })
          }
        } catch (error) {
          toastError(error)
        } finally {
          setIsCreateVoucherModalOpen(false)
          setIsLoadingCreateVoucherOpen(false)
          setIsCreateLoading(false)
          resetCreateModal()
          refreshFetchVouchersByCampaignId()
        }
      },
      1000
    ),
    [
      createCampaignVoucher,
      refreshFetchVouchersByCampaignId,
      resetCreateModal,
      selectedVoucherType,
      sendGroupedVouchers,
      onGetVouchersToPrint,
      toastError,
      getCreateVoucherStopwatchTimeMillis,
    ]
  )

  const onSetLoadingAndCreateCampaignVoucher = useCallback(
    async ({
      voucherLabelParam,
      voucherNameParam,
      voucherContactNumberParam,
      voucherRecipientIdParam,
      voucherBlockNumberParam,
      voucherStreetNameParam,
      voucherPostalCodeParam,
      voucherFloorNumberParam,
      voucherUnitNumberParam,
      voucherGroupDenominationsParam,
    }: CreateVoucherParams) => {
      setIsCreateLoading(true)
      return onCreateCampaignVoucher({
        voucherLabelParam,
        voucherNameParam,
        voucherContactNumberParam,
        voucherRecipientIdParam,
        voucherBlockNumberParam,
        voucherStreetNameParam,
        voucherPostalCodeParam,
        voucherFloorNumberParam,
        voucherUnitNumberParam,
        voucherGroupDenominationsParam,
      })
    },
    [onCreateCampaignVoucher]
  )

  // ============================================ Print Vouchers APIs ============================================
  const onPrintUnusedVouchers = useCallback(
    (name: string, groupId: string) => {
      setIsPrintLoading(true)
      // Adds a delay so that spinner loads before
      // browser processes print.
      setTimeout(() => {
        onGetVouchersToPrint({ groupId }).then(
          ({ vouchers: vouchersToPrint }) => {
            printVouchers({
              vouchers: vouchersToPrint,
              onPrintDialogOpen: () => {
                setIsPrintLoading(false)
              },
              name,
              campaignName,
              campaignExpiresAt,
              extraQrPrefix,
            })
          }
        )
      }, 1000)
    },
    [onGetVouchersToPrint, campaignName, campaignExpiresAt, extraQrPrefix]
  )

  // ============================================ Grouped Voucher Actions APIs & Derived data ============================================
  const { updateGroupedVoucherDetails, isUpdateGroupedVoucherDetailsLoading } =
    useUpdateGroupedVoucherDetails({ campaignId })

  const { groupedVoucherEvents, isFetchingGroupedVoucherEvents } =
    useGroupedVoucherEvents({ groupId: selectedGroupId ?? '' })

  const onSelectGroup = useCallback(
    (group: VoucherType) => setSelectedGroupId(group.id),
    []
  )

  const selectedGroup = useMemo(
    () => _.find(vouchers, (group) => group.id === selectedGroupId),
    [selectedGroupId, vouchers]
  )

  const selectedGroupToUpdate = useMemo(() => {
    const chosenGroup = _.find(
      vouchers,
      (group) => group.id === selectedVoucherGroupIdToUpdate
    )
    return chosenGroup
  }, [selectedVoucherGroupIdToUpdate, vouchers])

  const selectedGroupToSend = useMemo(() => {
    return _.find(
      vouchers,
      (group) => group.id === selectedVoucherGroupIdToSend
    )
  }, [selectedVoucherGroupIdToSend, vouchers])

  const closeUpdateVoucherGroupModal = useCallback(
    () => setSelectedVoucherGroupIdToUpdate(null),
    []
  )

  const updateVoucherGroup = useCallback(
    (updateGroupParams: {
      contactNumber: string | null
      name: string | null
    }) =>
      updateGroupedVoucherDetails({
        groupId: selectedVoucherGroupIdToUpdate ?? '',
        updateGroupParams,
      }).then(() => setSelectedVoucherGroupIdToUpdate(null)),
    [selectedVoucherGroupIdToUpdate]
  )

  const closeSendGroupedVoucherModal = useCallback(() => {
    setSelectedVoucherGroupIdToSend(null)
    resetSendGroupedVouchers()
  }, [resetSendGroupedVouchers])

  const onCloseGroup = useCallback(() => setSelectedGroupId(null), [])

  // ============================================ Campaign Reports APIs ============================================
  const { downloadCampaignVoucherReport: onDownloadCampaignVoucherReport } =
    useCampaignVoucherReportURL(campaignId)

  const {
    downloadCampaignVoucherLinks: onDownloadCampaignVoucherLinks,
    isDownloadCampaignVoucherLinksLoading,
  } = useDownloadCampaignVoucherLinks(campaignId)

  const onCloseDownloadTransactionsModal = useCallback(
    () => setIsDownloadTransactionsModalOpen(false),
    []
  )

  const onOpenDownloadTransactionsModal = useCallback(() => {
    setIsDownloadTransactionsModalOpen(true)
  }, [setIsDownloadTransactionsModalOpen])

  // =========================================== Bulk Create APIs ============================================
  const closeBulkCreateVoucherModal = useCallback(() => {
    setIsBulkCreateVoucherModalOpen(false)
  }, [setIsBulkCreateVoucherModalOpen])

  const onClickBulkCreate = useCallback(() => {
    setIsBulkCreateVoucherModalOpen(true)
    setFilterVouchersValue('')
    setBulkCreateModalKey((prev) => prev + 1)
  }, [])

  // =========================================== Side Effects ============================================
  useEffect(() => {
    if (_.isUndefined(previousFilterVouchersValue)) {
      return
    }
    debouncedSearch(filterVouchersValue)
    // previousFilterVouchersValue should not be a dependency as it depends on filterVouchersValue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, filterVouchersValue])

  return (
    <VouchersTabContext.Provider
      value={{
        // Vouchers Related
        vouchers,
        currentSearchQuery: fetchVouchersByCampaignCurrentSearchQuery,
        getNextPageOfVouchers,
        getPreviousPageOfVouchers,
        isLoadingNextPage: isFetchingVouchersByCampaignIdNextPage,
        isLoadingPreviousPage: isFetchingVouchersByCampaignIdPreviousPage,
        isLoading: isFetchingVouchersByCampaignId,
        filterVouchersValue,
        setFilterVouchersValue,
        refreshFetchVouchersByCampaignId,
        // Create Vouchers related
        advanceStep,
        getIsVoucherGroupsMatchingQueryExists,
        checkIfRecipientNotInWhitelistForCampaign,
        currentCreateStep,
        setCurrentCreateStep,
        isCreateVoucherAddressUsePrefill,
        setIsCreateVoucherAddressUsePrefill,
        selectedVoucherType,
        setSelectedVoucherType,
        onClickCreateNew,
        isCreateVoucherModalOpen,
        closeCreateVoucherModal,
        setIsCreateVoucherModalOpen,
        isCreateLoading,
        isLoadingCreateVoucherOpen,
        setIsLoadingCreateVoucherOpen,
        // Print Vouchers Related
        isPrintLoading,
        onPrintUnusedVouchers,
        setIsPrintLoading,
        // Vouchers table & Create Vouchers Related
        onCreateVoucherModalApplySearch,
        createCampaignVoucher: onSetLoadingAndCreateCampaignVoucher,
        // Grouped related
        onSelectGroup,
        onCloseGroup,
        selectedGroup,
        isUpdateVoucherGroupModalOpen: !!selectedGroupToUpdate,
        selectedGroupToUpdate,
        isSendGroupedVoucherModalOpen: !!selectedGroupToSend,
        selectedGroupToSend,
        groupedVoucherEvents,
        isLoadingGroupedVoucherEvents: isFetchingGroupedVoucherEvents,
        openUpdateVoucherGroupModal: setSelectedVoucherGroupIdToUpdate,
        closeUpdateVoucherGroupModal,
        updateVoucherGroup,
        openSendGroupedVoucherModal: setSelectedVoucherGroupIdToSend,
        closeSendGroupedVoucherModal,
        sendGroupedVouchersStatus,
        sendGroupedVouchersError,
        onSendGroupedVouchers: sendGroupedVouchers,
        isSendGroupedVouchersLoading,
        isUpdateVoucherGroupLoading: isUpdateGroupedVoucherDetailsLoading,
        // Campaign Report related
        isDownloadTransactionsModalOpen,
        onCloseDownloadTransactionsModal,
        onOpenDownloadTransactionsModal,
        onDownloadCampaignVoucherReport,
        onDownloadCampaignVoucherLinks,
        isDownloadCampaignVoucherLinksLoading,
        // Bulk Create related
        isBulkCreateVoucherModalOpen,
        closeBulkCreateVoucherModal,
        bulkCreateModalKey,
        onClickBulkCreate,
      }}
    >
      {children}
    </VouchersTabContext.Provider>
  )
}

export function useVouchersTabContext() {
  const context = useContext(VouchersTabContext)
  if (context === undefined) {
    throw new Error(
      'useVouchersTabContext must be used inside a VouchersTabProvider'
    )
  }
  return context
}
