import React from 'react'
import { useVouchersTabContext } from '../../VouchersTabContext'
import UpdateVoucherGroupModal from './UpdateVoucherGroupModal'

const UpdateVoucherGroupModalContainer = () => {
  const {
    isUpdateVoucherGroupModalOpen,
    closeUpdateVoucherGroupModal,
    updateVoucherGroup,
    isUpdateVoucherGroupLoading,
    selectedGroupToUpdate,
  } = useVouchersTabContext()
  return (
    <UpdateVoucherGroupModal
      isOpen={isUpdateVoucherGroupModalOpen}
      onCloseClick={closeUpdateVoucherGroupModal}
      onPrimaryClick={updateVoucherGroup}
      group={selectedGroupToUpdate}
      isLoading={isUpdateVoucherGroupLoading}
    />
  )
}

export default UpdateVoucherGroupModalContainer
