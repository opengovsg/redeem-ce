import { useDownloadCampaignSettlementReport } from 'hooks/CampaignReports'
import React from 'react'
import DownloadSettlementReportRow from './DownloadSettlementReportRow'

type DownloadSettlementReportRowContainerProps = {
  report: any // TODO: Stricter typing
  campaignId: string
}

const DownloadSettlementReportRowContainer: React.FC<
  DownloadSettlementReportRowContainerProps
> = ({ report, campaignId }) => {
  const {
    downloadCampaignSettlementReport,
    isDownloadCampaignSettlementReportLoading,
  } = useDownloadCampaignSettlementReport({ campaignId, key: report.key })
  return (
    <DownloadSettlementReportRow
      date={report.reportDate}
      onClickPrimary={downloadCampaignSettlementReport}
      isPrimaryLoading={isDownloadCampaignSettlementReportLoading}
    />
  )
}

export default DownloadSettlementReportRowContainer
