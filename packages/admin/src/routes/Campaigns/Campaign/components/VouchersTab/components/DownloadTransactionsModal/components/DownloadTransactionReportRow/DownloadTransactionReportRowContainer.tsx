import { useDownloadCampaignTransactionReport } from 'hooks/CampaignReports'
import React from 'react'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import DownloadTransactionReportRow from './DownloadTransactionReportRow'

type DownloadTransactionReportRowContainerProps = {
  report: any // TODO: Stricter typing
}

const DownloadTransactionReportRowContainer = ({
  report,
}: DownloadTransactionReportRowContainerProps) => {
  const { campaignId } = useCampaignContext()
  const {
    downloadCampaignTransactionReport,
    isDownloadCampaignTransactionReportLoading,
  } = useDownloadCampaignTransactionReport({ campaignId, key: report.key })
  return (
    <DownloadTransactionReportRow
      date={report.reportDate}
      onPrimaryClick={downloadCampaignTransactionReport}
      isPrimaryLoading={isDownloadCampaignTransactionReportLoading}
    />
  )
}

export default DownloadTransactionReportRowContainer
