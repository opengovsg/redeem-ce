import React from 'react'
import moment from 'moment'
import { Tr, Td, Button } from '@chakra-ui/react'

type DownloadTransactionReportRowProps = {
  date: string | Date
  onPrimaryClick: () => void
  isPrimaryLoading: boolean
}

const DownloadTransactionReportRow: React.FC<
  DownloadTransactionReportRowProps
> = ({ date, onPrimaryClick, isPrimaryLoading }) => {
  return (
    <Tr background={isPrimaryLoading ? 'primary.100' : 'none'}>
      <Td>{moment(date).format('D MMM YYYY')}</Td>
      <Td>
        <Button
          colorScheme="primary"
          isLoading={isPrimaryLoading}
          loadingText="Downloading"
          onClick={onPrimaryClick}
          variant="link"
        >
          Download
        </Button>
      </Td>
    </Tr>
  )
}

export default React.memo(DownloadTransactionReportRow)
