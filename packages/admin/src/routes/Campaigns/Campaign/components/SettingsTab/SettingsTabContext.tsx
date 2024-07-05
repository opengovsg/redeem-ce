import { useToast } from 'data/Toasts'
import { functionStateWrapper } from 'helpers/utils'
import {
  useAddCampaignAdmin,
  useUpdateCampaignAdmin,
  useDeleteCampaignAdmin,
  useFetchCampaignAdmins,
} from 'hooks/Admins'
import {
  useUpdateCampaignDetails,
  useUpdateCampaignVoucherDetails,
} from 'hooks/Campaigns'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import useAdminFilter from 'hooks/AdminFilter'
import _ from 'lodash'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import {
  UpdateCampaignDetailsProp,
  UpdateCampaignVoucherDetailsProp,
} from 'services/RedeemApi/types'
import { PermissionsModalState } from './types'

// TODO: stricter typing
type SettingsTabContextValue = {
  campaignAdmins: any[]
  onUpdateCampaignDetailsClick: (data: UpdateCampaignDetailsProp) => void
  isUpdateCampaignDetailsLoading: boolean
  onUpdateCampaignVoucherDetails: (
    data: UpdateCampaignVoucherDetailsProp
  ) => void
  isUpdateCampaignVoucherDetailsLoading: boolean
  onOpenAddAdminModal: () => void
  isAddAdminLoading: boolean
  onDeleteCampaignAdmin: (params: {
    userId: string
    permissionGroups: string[]
  }) => void
  isDeleteCampaignAdminLoading: boolean
  onClickAddAdmin: (params: {
    email: string
    permissionGroups: string[]
  }) => void
  onClickUpdateAdmin: (params: {
    userId: string
    permissionGroups: string[]
  }) => void
  isUpdateAdminLoading: boolean
  onCloseManageAdminModal: () => void
  filterAdminsValue: string
  setFilterAdminsValue: (newVal: string) => void
  onClickEditAdmin: (admin: any) => void
  onClickDeleteAdmin: (admin: any) => void
  onCloseDeleteAdminModal: () => void
  permissionsModalState: PermissionsModalState
  adminToDelete?: any
}

const SettingsTabContext = createContext<SettingsTabContextValue | null>(null)

export const useSettingsTabContext = () => {
  const context = useContext(SettingsTabContext)
  if (!context) {
    throw new Error('SettingsTabProvider must be an ancestor')
  }
  return context
}

type SettingsTabProviderProps = {
  children: React.ReactNode
}

export const SettingsTabProvider = ({ children }: SettingsTabProviderProps) => {
  const { campaignId } = useCampaignContext()
  const { toastError, toastSuccessWithoutTitle } = useToast()
  const [permissionsModalState, setPermimissionsModalState] =
    useState<PermissionsModalState>({ mode: 'closed' })
  const [adminIdToDelete, setAdminIdToDelete] = useState<string | null>(null)
  const { addCampaignAdmin, isAddCampaignAdminLoading } =
    useAddCampaignAdmin(campaignId)
  const { campaignAdmins, fetchCampaignAdminsError } =
    useFetchCampaignAdmins(campaignId)

  // Show error for fetchAllAdmins when it errors
  useEffect(() => {
    if (fetchCampaignAdminsError) {
      toastError(fetchCampaignAdminsError)
    }
  }, [toastError, fetchCampaignAdminsError])
  const { updateCampaignAdmin, isUpdateCampaignAdminLoading } =
    useUpdateCampaignAdmin(campaignId)
  const {
    admins: filteredAdmins,
    filterValue: filterAdminsValue,
    setFilterValue: setFilterAdminsValue,
  } = useAdminFilter(campaignAdmins)
  const { updateCampaignDetails, isUpdateCampaignDetailsLoading } =
    useUpdateCampaignDetails(campaignId)

  const {
    updateCampaignVoucherDetails,
    isUpdateCampaignVoucherDetailsLoading,
  } = useUpdateCampaignVoucherDetails(campaignId)
  const { deleteCampaignAdmin, isDeleteCampaignAdminLoading } =
    useDeleteCampaignAdmin(campaignId)

  const onSuccess = () =>
    toastSuccessWithoutTitle({
      primaryText: 'Success! ',
      secondaryText: 'Changes have been saved.',
    })

  // NOTE: this currently displays the error message
  // shown from backend
  const onError = (error: Error) => toastError(error)

  const withToast = functionStateWrapper(onSuccess, onError as any) // TODO: Fix type

  const addAdminToCampaign = async (params: {
    email: string
    permissionGroups: string[]
  }) => {
    await withToast(addCampaignAdmin)(params)
    setPermimissionsModalState({ mode: 'closed' })
  }

  const onUpdateAdmin = async (params: {
    userId: string
    permissionGroups: string[]
  }) => {
    await withToast(updateCampaignAdmin)(params)
    setPermimissionsModalState({ mode: 'closed' })
  }

  const deleteAdminFromCampaign = async (params: {
    userId: string
    permissionGroups: string[]
  }) => {
    await withToast(deleteCampaignAdmin)(params)
    setAdminIdToDelete(null)
  }
  const onClickEditAdmin = useCallback(
    (admin: any) =>
      setPermimissionsModalState({ mode: 'edit', currentAdmin: admin }),
    []
  )
  const onClickDeleteAdmin = useCallback(
    (admin: any) => setAdminIdToDelete(admin?.actorId),
    []
  )
  const adminToDelete = useMemo(
    () => _.find(campaignAdmins, (admin) => admin.actorId === adminIdToDelete),
    [campaignAdmins, adminIdToDelete]
  )

  const onOpenAddAdminModal = () =>
    setPermimissionsModalState({ mode: 'create' })

  const onCloseManageAdminModal = () =>
    setPermimissionsModalState({ mode: 'closed' })

  return (
    <SettingsTabContext.Provider
      value={{
        campaignAdmins: filteredAdmins,
        onUpdateCampaignDetailsClick: withToast(updateCampaignDetails),
        isUpdateCampaignDetailsLoading,
        onUpdateCampaignVoucherDetails: withToast(updateCampaignVoucherDetails),
        isUpdateCampaignVoucherDetailsLoading,
        onClickAddAdmin: addAdminToCampaign,
        onClickUpdateAdmin: onUpdateAdmin,
        isUpdateAdminLoading: isUpdateCampaignAdminLoading,
        isAddAdminLoading: isAddCampaignAdminLoading,
        onDeleteCampaignAdmin: deleteAdminFromCampaign,
        isDeleteCampaignAdminLoading,
        onOpenAddAdminModal,
        onCloseManageAdminModal,
        filterAdminsValue,
        setFilterAdminsValue,
        permissionsModalState,
        onClickEditAdmin,
        onClickDeleteAdmin,
        onCloseDeleteAdminModal: () => setAdminIdToDelete(null),
        adminToDelete,
      }}
    >
      {children}
    </SettingsTabContext.Provider>
  )
}
