import React, { useCallback } from 'react'
import useAuthorization from 'routes/Campaigns/Campaign/hooks/useAuthorization'
import VoucherDetailsDrawer from './VoucherDetailsDrawer'
import { useVouchersTabContext } from '../../VouchersTabContext'

export default function VoucherDetailsDrawerContainer() {
  const { canSendVouchers, canPrintVouchers, canUpdateVouchers } =
    useAuthorization()
  const {
    selectedGroup,
    onCloseGroup,
    onPrintUnusedVouchers,
    isPrintLoading,
    isSendGroupedVouchersLoading,
    openSendGroupedVoucherModal,
    openUpdateVoucherGroupModal,
    groupedVoucherEvents,
    isLoadingGroupedVoucherEvents,
  } = useVouchersTabContext()

  const onSendClick = useCallback(() => {
    if (!selectedGroup?.id) {
      return
    }
    openSendGroupedVoucherModal(selectedGroup.id)
  }, [openSendGroupedVoucherModal, selectedGroup])
  const onEditClick = useCallback(() => {
    if (!selectedGroup?.id) {
      return
    }
    openUpdateVoucherGroupModal(selectedGroup.id)
  }, [openUpdateVoucherGroupModal, selectedGroup])

  return (
    <VoucherDetailsDrawer
      isOpen={!!selectedGroup}
      onClose={onCloseGroup}
      selectedGroup={selectedGroup}
      onPrintUnusedVouchers={onPrintUnusedVouchers}
      isPrintLoading={isPrintLoading}
      onSendClick={onSendClick}
      isSending={isSendGroupedVouchersLoading}
      onEditClick={onEditClick}
      groupedVoucherEvents={groupedVoucherEvents}
      isLoadingGroupedVoucherEvents={isLoadingGroupedVoucherEvents}
      hasPermissionToSendVouchers={canSendVouchers}
      hasPermissionToPrintVouchers={canPrintVouchers}
      hasPermissionToUpdateVouchers={canUpdateVouchers}
    />
  )
}

VoucherDetailsDrawerContainer.propTypes = {}
