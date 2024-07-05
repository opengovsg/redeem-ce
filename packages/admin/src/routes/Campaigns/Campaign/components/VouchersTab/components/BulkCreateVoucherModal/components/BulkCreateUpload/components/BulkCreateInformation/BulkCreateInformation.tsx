import React, { useCallback } from 'react'
import { Divider, Text } from '@chakra-ui/react'
import Infobox from 'components/Infobox'
import { useDownloadTemplateBulkCreate } from 'hooks/BulkCreate'
import FieldsTextAndDownloadTemplate from 'components/FieldsTextAndDownloadTemplate'

const AVAILABLE_FIELDS = [
  {
    title: 'Recipient Identifier',
    description:
      'This could be from a recipients identification documents, such as a passport or a social security card. Must be capitalised. e.g. S9123456A ',
  },
  {
    title: 'Mobile Number',
    description: 'Must consist solely of digits. e.g. 6591234567',
  },
  {
    title: 'Name',
    description:
      'Name of the recipient or other information e.g. staff ID, student number',
  },
]

type BulkCreateInformationProps = {
  hasPassedValidityChecks: boolean
}

const BulkCreateInformation = ({
  hasPassedValidityChecks,
}: BulkCreateInformationProps): JSX.Element => {
  const { downloadTemplateBulkCreate, isDownloadTemplateBulkCreateLoading } =
    useDownloadTemplateBulkCreate()

  const onClickDownload = useCallback(() => {
    downloadTemplateBulkCreate()
  }, [downloadTemplateBulkCreate])

  return (
    <>
      <Infobox
        text={
          <Text textStyle="body1" textColor="neutral.900">
            <Text as="span" fontWeight="700">
              We do not remove duplicate recipients
            </Text>
            {
              '  as some organisers want multiple voucher links for a recipient. If you only want one link per recipient, remove duplicates before uploading the CSV.'
            }
          </Text>
        }
      />
      <FieldsTextAndDownloadTemplate
        fields={AVAILABLE_FIELDS}
        downloadFunction={onClickDownload}
        isLoading={isDownloadTemplateBulkCreateLoading}
        headerText="AVAILABLE FIELDS"
        isDownloadButtonDisabled={hasPassedValidityChecks}
      />
      <Divider />
    </>
  )
}

export default BulkCreateInformation
