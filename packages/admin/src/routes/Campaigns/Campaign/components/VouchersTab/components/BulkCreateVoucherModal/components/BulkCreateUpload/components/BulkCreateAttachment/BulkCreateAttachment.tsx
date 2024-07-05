import React from 'react'
import { Box, HStack, Text, Button, Image, Link } from '@chakra-ui/react'
import { Attachment } from 'components/Attachment'
import Infobox from 'components/Infobox'
import { useCheckBulkCreate } from 'hooks/BulkCreate'
import { BiDownload } from 'react-icons/bi'
import errorCircleSolid from 'img/error-circle-solid.svg'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import { fileValidation } from 'helpers/csv'
import {
  formatErrorStringsWithCommaAndAnd,
  formatNumberOfEmptyRows,
  formatNumberOfInvalidMobileNumbers,
  formatNumberOfInvalidIdentifiers,
} from 'utils/string'
import { openInNewTab } from 'helpers/utils'
import {
  BulkCreateAttachmentData,
  BulkCreateMetaDataAction,
} from '../../../../BulkCreateReducer'

const getCsvErrorHighlightedStringMessage = ({
  isEmptyCSV,
  hasInvalidHeader,
  numberOfEmptyRows,
  numberOfInvalidRecipientIds,
  numberOfInvalidMobileNumber,
}: {
  isEmptyCSV: boolean
  hasInvalidHeader: boolean
  numberOfEmptyRows: number
  numberOfInvalidRecipientIds: number
  numberOfInvalidMobileNumber: number
}) => {
  if (isEmptyCSV) {
    return 'does not contain any rows'
  }

  if (hasInvalidHeader) {
    return 'does not follow the CSV template'
  }

  const errorMessage: string[] = []
  if (numberOfEmptyRows > 0) {
    errorMessage.push(formatNumberOfEmptyRows(numberOfEmptyRows))
  }

  if (numberOfInvalidRecipientIds > 0) {
    errorMessage.push(
      formatNumberOfInvalidIdentifiers(numberOfInvalidRecipientIds)
    )
  }

  if (numberOfInvalidMobileNumber > 0) {
    errorMessage.push(
      formatNumberOfInvalidMobileNumbers(numberOfInvalidMobileNumber)
    )
  }

  return formatErrorStringsWithCommaAndAnd(errorMessage)
}

type BulkCreateAttachmentProps = {
  bulkCreateState: BulkCreateAttachmentData
  bulkCreateDispatch: React.Dispatch<BulkCreateMetaDataAction>
}

const BulkCreateAttachment = ({
  bulkCreateState,
  bulkCreateDispatch: dispatch,
}: BulkCreateAttachmentProps) => {
  const { campaignId } = useCampaignContext()
  const {
    checkingBulkCreateProgress: progress,
    isEmptyCSV,
    hasInvalidHeader,
    fileInfoRelatedErrorMessage,
    href,
    numberOfInvalidRecipientIds,
    numberOfInvalidMobileNumber,
    numberOfEmptyRows,
    bulkCreateCsv,
    hasError,
  } = bulkCreateState

  const { checkBulkCreate, isCheckingBulkCreate } = useCheckBulkCreate(dispatch)

  const onUploadAttachment = async (inputFile: File | undefined) => {
    dispatch({ type: 'CLEAR' })

    if (!inputFile) {
      return
    }

    await checkBulkCreate({
      campaignId,
      bulkCreateCsv: inputFile,
    })
  }

  const csvErrorStringMessage = getCsvErrorHighlightedStringMessage({
    isEmptyCSV,
    hasInvalidHeader,
    numberOfEmptyRows,
    numberOfInvalidRecipientIds,
    numberOfInvalidMobileNumber,
  })

  return (
    <Box width="100%" paddingBottom="16px" id="bulk-create-attachment">
      {hasError && !hasInvalidHeader && !isEmptyCSV && (
        <Infobox
          text={
            <Text textStyle="body1" color="neutral.900">
              {'Your CSV was not uploaded as it has '}
              <Text as="span" textStyle="subhead1" color="danger.500">
                {csvErrorStringMessage}
              </Text>
              {'. Please '}
              <Link
                textStyle="subhead1"
                color="danger.500"
                download="test-csv"
                href={href}
                isExternal
                rel="noopener noreferrer"
              >
                download the CSV with the errors
              </Link>
              {' and fix them before re-uploading it.'}
            </Text>
          }
          button={
            <Button
              as="a"
              minWidth="max-content"
              marginLeft="16px"
              colorScheme="danger"
              download="test-csv"
              id="download-bulk-create-csv-errors"
              leftIcon={<BiDownload size={20} />}
              onClick={() => openInNewTab(href)}
              rel="noopener noreferrer"
              variant="solid"
            >
              Download CSV displaying errors
            </Button>
          }
          variant="danger"
          marginBottom="24px"
        />
      )}
      {hasError && isEmptyCSV && (
        <Infobox
          variant="danger"
          marginBottom="24px"
          text={
            <Text textStyle="body1" color="neutral.900">
              {'Your CSV could not be uploaded as it '}
              <Text as="span" textStyle="subhead1" color="danger.500">
                {csvErrorStringMessage}
              </Text>
              . Please fill in at least 1 row, then try again.
            </Text>
          }
        />
      )}
      {hasError && hasInvalidHeader && (
        <Infobox
          variant="danger"
          marginBottom="24px"
          text={
            <Text textStyle="body1" color="neutral.900">
              {'Your CSV could not be uploaded as it '}
              <Text as="span" textStyle="subhead1" color="danger.500">
                {csvErrorStringMessage}
              </Text>
              . Please follow the template, which has 3 columns and is case
              sensitive, then try again.
            </Text>
          }
        />
      )}
      <Text textStyle="subhead1" marginBottom="12px" color="neutral.900">
        Upload CSV
      </Text>
      <Attachment
        maxSize={30000000}
        name="bulk-create"
        onChange={(inputFile) => onUploadAttachment(inputFile)}
        onError={(errMsg) =>
          dispatch({
            type: 'FILE_INFO_RELATED_ERROR',
            payload: { fileInfoRelatedErrorMessage: errMsg },
          })
        }
        onFileValidation={fileValidation}
        showFileSize
        value={bulkCreateCsv}
        imagePreview="small"
        progress={progress}
        isUploading={isCheckingBulkCreate}
        isInvalid={Boolean(fileInfoRelatedErrorMessage) || hasError}
      />
      {fileInfoRelatedErrorMessage ? (
        <HStack align="start" marginTop="8px" spacing="8px">
          <Image
            width="1rem"
            height="1rem"
            marginTop="2px"
            src={errorCircleSolid}
          />
          <Text textStyle="body2" color="danger.500">
            {fileInfoRelatedErrorMessage}
          </Text>
        </HStack>
      ) : null}
    </Box>
  )
}

export default BulkCreateAttachment
