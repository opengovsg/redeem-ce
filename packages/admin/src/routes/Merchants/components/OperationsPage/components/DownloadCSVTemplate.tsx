import React from 'react'
import { Button } from '@chakra-ui/react'
import { CSVLink } from 'react-csv'
import { BiDownload } from 'react-icons/bi'
import { DownloadCSVTemplateProps } from '../types'

export const DownloadCSVTemplate = ({
  csv,
  csvName,
}: DownloadCSVTemplateProps): JSX.Element => {
  return (
    <CSVLink data={csv} filename={`${csvName}.csv`}>
      <Button
        minWidth="max-content"
        leftIcon={<BiDownload size={20} />}
        variant="outline"
      >
        Download CSV template
      </Button>
    </CSVLink>
  )
}
