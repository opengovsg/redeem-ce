import React, { useCallback } from 'react'
import { useGetVouchersToPrint } from 'hooks/Voucher'
import { printVouchers } from 'hooks/Print'
import { isVoided } from 'helpers/utils'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import useAuthorization from 'routes/Campaigns/Campaign/hooks/useAuthorization'
import { VoucherType } from 'services/RedeemApi/types'
import { useVouchersTabContext } from '../../../../VouchersTabContext'
import VoucherRow from './VoucherRow'

import { TABLE_CONFIG } from '../../constants'

type VoucherRowContainerProps = {
  groupedVoucher: VoucherType
  config: typeof TABLE_CONFIG
}

export default function VoucherRowContainer({
  groupedVoucher,
  config,
}: VoucherRowContainerProps) {
  const { campaignName, extraQrPrefix, campaignExpiresAt } =
    useCampaignContext()
  const { canSendVouchers, canUpdateVouchers, canPrintVouchers } =
    useAuthorization()
  const {
    isPrintLoading,
    setIsPrintLoading,
    onSelectGroup,
    openUpdateVoucherGroupModal,
    isSendGroupedVouchersLoading,
    openSendGroupedVoucherModal,
  } = useVouchersTabContext()

  const onSendClick = useCallback(
    () => openSendGroupedVoucherModal(groupedVoucher.id),
    [openSendGroupedVoucherModal, groupedVoucher]
  )
  const onEditClick = useCallback(
    () => openUpdateVoucherGroupModal(groupedVoucher.id),
    [openUpdateVoucherGroupModal, groupedVoucher]
  )
  const isGroupVoided = isVoided(groupedVoucher)
  const onGetPrintVouchers = useGetVouchersToPrint()
  const onPrintClick = useCallback(() => {
    setIsPrintLoading(true)
    // Adds a delay so that spinner loads before
    // browser processes print.
    setTimeout(async () => {
      const { vouchers: vouchersToPrint } = await onGetPrintVouchers({
        groupId: groupedVoucher.id,
      })
      printVouchers({
        vouchers: vouchersToPrint,
        onPrintDialogOpen: () => {
          setIsPrintLoading(false)
        },
        name: groupedVoucher.name,
        campaignName,
        campaignExpiresAt,
        extraQrPrefix,
      })
    }, 1000)
  }, [groupedVoucher, onGetPrintVouchers, setIsPrintLoading, campaignName])
  return (
    <VoucherRow
      config={config}
      groupedVoucher={groupedVoucher}
      isPrintLoading={isPrintLoading}
      onSendClick={onSendClick}
      isSending={isSendGroupedVouchersLoading}
      onPrintClick={onPrintClick}
      onSelectGroup={onSelectGroup}
      onEditClick={onEditClick}
      canSend={canSendVouchers && !isGroupVoided}
      canUpdate={canUpdateVouchers && !isGroupVoided}
      canPrint={canPrintVouchers && !isGroupVoided}
    />
  )
}
