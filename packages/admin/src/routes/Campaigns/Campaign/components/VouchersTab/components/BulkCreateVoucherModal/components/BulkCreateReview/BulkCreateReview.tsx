import React, { useCallback } from 'react'
import Card from 'components/Card'
import { Button, ModalBody, Text, VStack } from '@chakra-ui/react'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import { useSubmitBulkCreate } from 'hooks/BulkCreate'
import { formatNumberOfVoucherLinks } from 'utils/string'
import {
  BulkCreateAttachmentData,
  BulkCreateMetaDataAction,
} from '../../BulkCreateReducer'
import StickyFooter from '../StickyFooter'
import { BulkCreateStage } from '../../BulkCreateVoucherModal'
import ReviewList from './components/ReviewList'

type BulkCreateUploadProps = {
  bulkCreateState: BulkCreateAttachmentData
  bulkCreateDispatch: React.Dispatch<BulkCreateMetaDataAction>
  setBulkCreateStage: React.Dispatch<React.SetStateAction<BulkCreateStage>>
  onClose: () => void
}

const BulkCreateReview = ({
  bulkCreateState,
  bulkCreateDispatch: dispatch,
  setBulkCreateStage,
  onClose,
}: BulkCreateUploadProps): JSX.Element => {
  const { campaignName, campaignId } = useCampaignContext()

  const {
    numberOfRows,
    numberOfMissingMobileNumber,
    numberOfMissingName,
    numberOfMissingRecipientIds,
    numberOfDuplicateMobileNumber,
    numberOfDuplicateName,
    numberOfDuplicateRecipientIds,
    bulkCreateCsv,
    href,
  } = bulkCreateState

  const hasAnyMissingValues =
    numberOfMissingMobileNumber > 0 ||
    numberOfMissingName > 0 ||
    numberOfMissingRecipientIds > 0
  const hasAnyDuplicateValues =
    numberOfDuplicateMobileNumber > 0 ||
    numberOfDuplicateName > 0 ||
    numberOfDuplicateRecipientIds > 0

  const handleReuploadCSV = () => {
    setBulkCreateStage(BulkCreateStage.UPLOAD)
    dispatch({ type: 'CLEAR' })
  }

  const { submitBulkCreate, isSubmittingBulkCreate } =
    useSubmitBulkCreate(campaignId)
  const onConfirmSubmitBulkCreate = useCallback(async () => {
    if (!bulkCreateCsv) {
      return
    }
    dispatch({ type: 'SUBMITTING' })

    const response = await submitBulkCreate({ bulkCreateCsv })

    dispatch({
      type: 'POLLING',
      payload: {
        jobId: response.jobId,
      },
    })
  }, [bulkCreateCsv])

  return (
    <>
      <ModalBody>
        <Card
          id="bulk-create-review-container-pane"
          width="100%"
          padding="40px 32px"
          spacing="24px"
          minWidth="1064px"
        >
          <Text textStyle="h3" textColor="neutral.900">
            Review your CSV
          </Text>
          <VStack
            alignItems="left"
            width="100%"
            padding="24px 24px"
            borderWidth="1px"
            borderColor="neutral.200"
            borderRadius="4px"
            spacing="8px"
          >
            <Text textStyle="subhead3" textColor="neutral.700">
              {campaignName}
            </Text>
            <Text textStyle="h4" textColor="neutral.900">
              {`${formatNumberOfVoucherLinks(numberOfRows)} will be created`}
            </Text>
          </VStack>
          {hasAnyMissingValues || hasAnyDuplicateValues ? (
            <ReviewList
              numberOfRows={numberOfRows}
              numberOfMissingMobileNumber={numberOfMissingMobileNumber}
              numberOfMissingName={numberOfMissingName}
              numberOfMissingRecipientIds={numberOfMissingRecipientIds}
              numberOfDuplicateMobileNumber={numberOfDuplicateMobileNumber}
              numberOfDuplicateName={numberOfDuplicateName}
              numberOfDuplicateRecipientIds={numberOfDuplicateRecipientIds}
              href={href}
            />
          ) : null}
          <Text textStyle="body1" textColor="neutral.700" fontWeight="700">
            Once created, vouchers cannot be edited or voided.
          </Text>
        </Card>
      </ModalBody>
      <StickyFooter
        backButtonText="Back to upload CSV"
        backButtonOnClick={handleReuploadCSV}
        title={campaignName}
        onClose={onClose}
        nextButton={
          <Button
            isLoading={isSubmittingBulkCreate}
            onClick={onConfirmSubmitBulkCreate}
          >
            {`Confirm: Create ${formatNumberOfVoucherLinks(numberOfRows)}`}
          </Button>
        }
      />
    </>
  )
}

export default BulkCreateReview
