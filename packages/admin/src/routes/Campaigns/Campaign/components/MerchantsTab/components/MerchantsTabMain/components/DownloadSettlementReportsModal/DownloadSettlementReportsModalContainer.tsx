import React from 'react'
import DownloadSettlementReportsModal from './DownloadSettlementReportsModal'

type DownloadSettlementReportsModalContainerProps = {
  isOpen: boolean
  onClose: () => void
  reports: any[]
  campaignId: string
}

const DownloadSettlementReportsModalContainer: React.FC<
  DownloadSettlementReportsModalContainerProps
> = ({ isOpen, onClose, reports, campaignId }) => {
  return (
    <DownloadSettlementReportsModal
      isOpen={isOpen}
      onClose={onClose}
      reports={reports}
      campaignId={campaignId}
    />
  )
}

export default DownloadSettlementReportsModalContainer
