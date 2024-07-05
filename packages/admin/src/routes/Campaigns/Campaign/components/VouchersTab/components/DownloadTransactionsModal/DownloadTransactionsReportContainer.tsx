import { useCampaignTransactionReports } from 'hooks/CampaignReports'
import React from 'react'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import { useVouchersTabContext } from '../../VouchersTabContext'
import DownloadTransactionsModal from './DownloadTransactionsModal'

const DownloadTransactionsReportContainer = () => {
  const { campaignId } = useCampaignContext()
  const {
    isDownloadTransactionsModalOpen: isOpen,
    onCloseDownloadTransactionsModal: onClose,
  } = useVouchersTabContext()

  const { campaignTransactionReports } = useCampaignTransactionReports(
    campaignId,
    null
  )

  return (
    <DownloadTransactionsModal
      isOpen={isOpen}
      onClose={onClose}
      reports={campaignTransactionReports}
    />
  )
}

export default DownloadTransactionsReportContainer
