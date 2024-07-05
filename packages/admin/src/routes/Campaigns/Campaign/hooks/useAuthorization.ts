import { UserActions } from 'constants/permissions'
import { useAuthenticationState } from 'data/Authentication'
import { useCampaignContext } from '../context/CampaignContext'

function useAuthorization() {
  const { campaignId } = useCampaignContext()
  const { permissions } = useAuthenticationState()
  const canCreateVouchers = permissions[campaignId]?.actions?.includes(
    UserActions.CreateGroupedVouchers
  )
  const canBulkCreateVouchers = permissions[campaignId]?.actions?.includes(
    UserActions.BulkCreateGroupedVouchers
  )
  const canDownloadVouchers = permissions[campaignId]?.actions?.includes(
    UserActions.DownloadVoucherReport
  )
  const canDownloadTransactions = permissions[campaignId]?.actions?.includes(
    UserActions.ListTransactionReports
  )
  const canDownloadCampaignVoucherLinks = permissions[
    campaignId
  ]?.actions?.includes(UserActions.DownloadCampaignVoucherLinks)
  const canSendVouchers = permissions?.[campaignId]?.actions?.includes(
    UserActions.SendGroupedVouchers
  )
  const canUpdateVouchers = permissions?.[campaignId]?.actions?.includes(
    UserActions.UpdateGroupedVoucherContact
  )
  const canPrintVouchers = permissions?.[campaignId]?.actions?.includes(
    UserActions.PrintGroupedVouchers
  ) // TODO: Switch to print voucher permission once implemented

  return {
    canBulkCreateVouchers,
    canCreateVouchers,
    canDownloadCampaignVoucherLinks,
    canDownloadTransactions,
    canDownloadVouchers,
    canSendVouchers,
    canUpdateVouchers,
    canPrintVouchers,
  }
}

export default useAuthorization
