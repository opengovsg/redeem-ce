import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Attachment } from '@opengovsg/design-system-react'
import { parse } from 'papaparse'
import toast from 'react-hot-toast'
import { AttachmentInputProps } from '../types'

const fileValidation = (file: File) => {
  return /.+\.csv/.test(file.name)
    ? null
    : toast.error(
        'You have uploaded an incorrect file type, please try again and upload a csv file type.'
      )
}

export const AttachmentInput = ({
  csvFile,
  setCsvFile,
  setParsedCsv,
}: AttachmentInputProps): JSX.Element => {
  const onFileUpload = (input: File | undefined) => {
    if (!input) {
      setCsvFile(undefined)
      setParsedCsv([])
    } else {
      // TODO: Sanitise input csv before parsing
      parse(input as Papa.LocalFile, {
        worker: true,
        // TODO: Handle parsing errors from result.errors
        complete(results) {
          setCsvFile(input)
          setParsedCsv(results.data)
        },
      })
    }
  }

  return (
    <>
      <Text textStyle="subhead1" marginBottom="12px" color="neutral.900">
        Upload CSV
      </Text>
      <Box width="100%">
        <Attachment
          maxSize={30000000}
          name="attachment-zone"
          onChange={(input) => onFileUpload(input)}
          onError={(errMsg) => console.log(errMsg)}
          onFileValidation={fileValidation}
          showFileSize
          value={csvFile}
          imagePreview="small"
        />
      </Box>
    </>
  )
}
