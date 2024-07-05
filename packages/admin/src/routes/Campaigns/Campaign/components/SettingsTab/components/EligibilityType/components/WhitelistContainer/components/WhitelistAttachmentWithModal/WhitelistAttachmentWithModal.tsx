import React, { useReducer, useCallback } from 'react'
import { Box, HStack, Text, Button, Image, Link } from '@chakra-ui/react'
import { Attachment } from 'components/Attachment'
import Infobox from 'components/Infobox'
import { useUploadWhitelist, useCheckWhitelist } from 'hooks/Whitelist'
import { BiDownload } from 'react-icons/bi'
import isEmpty from 'lodash/isEmpty'
import errorCircleSolid from 'img/error-circle-solid.svg'
import { useToast } from 'data/Toasts'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import { fileValidation } from 'helpers/csv'
import { openInNewTab } from 'helpers/utils'
import {
  whitelistAttachmentReducer,
  whitelistInitialAttachmentState,
} from './WhitelistReducer'
import WhitelistUploadModal from './components/WhitelistUploadModal'

const getCsvErrorHighlightedStringMessage = ({
  numberOfInvalidIds,
  numberOfDuplicates,
  hasInvalidHeader,
  isEmptyCSV,
}: {
  numberOfInvalidIds: number
  numberOfDuplicates: number
  hasInvalidHeader: boolean
  isEmptyCSV: boolean
}) => {
  if (isEmptyCSV) {
    return 'does not contain any rows'
  }

  if (hasInvalidHeader) {
    return 'does not follow the CSV template'
  }

  let errorMessage = ''
  if (numberOfInvalidIds > 0) {
    errorMessage = `${numberOfInvalidIds} invalid ${
      numberOfInvalidIds === 1 ? 'identifier' : 'identifiers'
    }`
  }

  if (numberOfDuplicates > 0) {
    errorMessage = `${
      isEmpty(errorMessage) ? '' : `${errorMessage} and `
    } ${numberOfDuplicates} ${
      numberOfDuplicates === 1 ? 'Duplicate' : 'Duplicates'
    }`
  }

  return errorMessage
}

type WhitelistAttachmentWithModelProps = {
  primaryTextForModal: string
  onClose?: () => void
  currentNumRecipients?: string
}

const WhitelistAttachmentWithModel = ({
  primaryTextForModal,
  onClose,
  currentNumRecipients,
}: WhitelistAttachmentWithModelProps) => {
  const { campaignId } = useCampaignContext()
  const { toastSuccessWithoutTitle } = useToast()
  const [whitelistState, dispatch] = useReducer(
    whitelistAttachmentReducer,
    whitelistInitialAttachmentState
  )
  const {
    checkingWhitelistProgress: progress,
    hasInvalidHeader,
    isEmptyCSV,
    isUploading,
    fileInfoRelatedErrorMessage,
    href,
    numberOfDuplicates,
    numberOfInvalidIds,
    numberOfRows,
    whitelistCsv,
    hasError,
    isWhitelistSuccessfulUploadModalOpen,
  } = whitelistState

  const { uploadWhitelist } = useUploadWhitelist(campaignId)
  const { checkWhitelist, isCheckingWhitelist } = useCheckWhitelist(dispatch)

  const onUploadAttachment = async (inputFile: File | undefined) => {
    dispatch({ type: 'CLEAR' })
    if (!inputFile) {
      return
    }

    await checkWhitelist({
      campaignId,
      whitelistCsv: inputFile,
    })
  }

  const onConfirmUploadAttachment = useCallback(async () => {
    if (!whitelistCsv) {
      return
    }
    dispatch({ type: 'UPLOADING' })
    await uploadWhitelist({ whitelistCsv })
    dispatch({ type: 'CLEAR' })
    toastSuccessWithoutTitle({
      primaryText: 'Success! ',
      secondaryText: 'The whitelist is uploaded and in use.',
    })
    onClose?.()
  }, [whitelistCsv])

  const csvErrorStringMessage = getCsvErrorHighlightedStringMessage({
    numberOfDuplicates,
    numberOfInvalidIds,
    hasInvalidHeader,
    isEmptyCSV,
  })

  return (
    <Box width="100%" id="whitelist-attachment-with-modal">
      {hasError && !hasInvalidHeader && !isEmptyCSV && (
        <Infobox
          text={
            <Text textStyle="body1" color="neutral.900">
              {'Your whitelist could not be uploaded as it has '}
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
              id="download-csv-errors"
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
              {'Your whitelist could not be uploaded as it '}
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
              {'Your whitelist could not be uploaded as it '}
              <Text as="span" textStyle="subhead1" color="danger.500">
                {csvErrorStringMessage}
              </Text>
              . Please follow the template, which has a single column and uses
              capital letters, then try again.
            </Text>
          }
        />
      )}
      <Text textStyle="subhead1" marginBottom="12px" color="neutral.900">
        Upload whitelist
      </Text>
      <Attachment
        maxSize={30000000}
        name="whitelist"
        onChange={(inputFile) => onUploadAttachment(inputFile)}
        onError={(errMsg) =>
          dispatch({
            type: 'FILE_INFO_RELATED_ERROR',
            payload: { fileInfoRelatedErrorMessage: errMsg },
          })
        }
        onFileValidation={fileValidation}
        showFileSize
        value={whitelistCsv}
        imagePreview="small"
        progress={progress}
        isUploading={isCheckingWhitelist}
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
      {!hasError && !!whitelistCsv && (
        <WhitelistUploadModal
          isOpen={isWhitelistSuccessfulUploadModalOpen}
          onClose={() => dispatch({ type: 'CLEAR' })}
          onPrimaryClick={onConfirmUploadAttachment}
          numberOfRows={numberOfRows}
          primaryText={primaryTextForModal}
          previousNumberOfRows={currentNumRecipients}
          isUploading={isUploading}
        />
      )}
    </Box>
  )
}

export default WhitelistAttachmentWithModel
