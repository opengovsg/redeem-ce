import { Tr, Td, Button } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'

type DownloadSettlementReportRowProps = {
  date: Date | string
  onClickPrimary: () => void
  isPrimaryLoading: boolean
}

const DownloadSettlementReportRow: React.FC<
  DownloadSettlementReportRowProps
> = ({ date, onClickPrimary, isPrimaryLoading }) => {
  return (
    <Tr background={isPrimaryLoading ? 'primary.100' : 'none'}>
      <Td>{moment(date).format('D MMM YYYY')}</Td>
      <Td>
        <Button
          colorScheme="primary"
          isLoading={isPrimaryLoading}
          loadingText="Downloading"
          onClick={onClickPrimary}
          variant="link"
        >
          Download
        </Button>
      </Td>
    </Tr>
  )
}

export default DownloadSettlementReportRow
