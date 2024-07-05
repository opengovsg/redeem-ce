import React, { useCallback } from 'react'
import { getErrorMessage } from 'services/utils'
import SendVoucherGroupModal from './SendVoucherGroupModal'
import { useVouchersTabContext } from '../../VouchersTabContext'

const SendVoucherGroupModalContainer = () => {
  const {
    isSendGroupedVoucherModalOpen,
    selectedGroupToSend,
    closeSendGroupedVoucherModal,
    sendGroupedVouchersStatus,
    sendGroupedVouchersError,
    onSendGroupedVouchers,
  } = useVouchersTabContext()
  const onPrimaryClick = useCallback(() => {
    if (selectedGroupToSend?.id) {
      onSendGroupedVouchers(selectedGroupToSend.id)
    }
  }, [onSendGroupedVouchers, selectedGroupToSend])
  return (
    <SendVoucherGroupModal
      onPrimaryClick={onPrimaryClick}
      sendStatus={sendGroupedVouchersStatus}
      isOpen={isSendGroupedVoucherModalOpen}
      onCloseClick={closeSendGroupedVoucherModal}
      group={selectedGroupToSend}
      error={getErrorMessage(sendGroupedVouchersError)}
    />
  )
}

export default SendVoucherGroupModalContainer
