import React from 'react'
import Card from 'components/Card'
import { Button, ModalBody, Text } from '@chakra-ui/react'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import {
  BulkCreateAttachmentData,
  BulkCreateMetaDataAction,
} from '../../BulkCreateReducer'
import { BulkCreateAttachment, BulkCreateInformation } from './components'
import StickyFooter from '../StickyFooter'
import { BulkCreateStage } from '../../BulkCreateVoucherModal'

type BulkCreateUploadProps = {
  bulkCreateState: BulkCreateAttachmentData
  bulkCreateDispatch: React.Dispatch<BulkCreateMetaDataAction>
  setBulkCreateStage: React.Dispatch<React.SetStateAction<BulkCreateStage>>
  onClose: () => void
}

const BulkCreateUpload = ({
  bulkCreateState,
  bulkCreateDispatch: dispatch,
  setBulkCreateStage,
  onClose,
}: BulkCreateUploadProps): JSX.Element => {
  const { campaignName } = useCampaignContext()
  const { hasError, bulkCreateCsv } = bulkCreateState

  const handleBackToGuide = () => {
    setBulkCreateStage(BulkCreateStage.GUIDE)
    dispatch({ type: 'CLEAR' })
  }

  const hasPassedValidityChecks = !hasError && !!bulkCreateCsv

  return (
    <>
      <ModalBody>
        <Card
          id="bulk-create-upload-container-pane"
          width="100%"
          minWidth="1064px"
          padding="40px 32px 16px"
        >
          <Text textStyle="h3">Upload the filled CSV template</Text>
          <BulkCreateInformation
            hasPassedValidityChecks={hasPassedValidityChecks}
          />
          <BulkCreateAttachment
            bulkCreateState={bulkCreateState}
            bulkCreateDispatch={dispatch}
          />
        </Card>
      </ModalBody>
      <StickyFooter
        backButtonText="Back to guide"
        backButtonOnClick={handleBackToGuide}
        title={campaignName}
        onClose={onClose}
        nextButton={
          <Button
            disabled={!hasPassedValidityChecks}
            onClick={() => setBulkCreateStage(BulkCreateStage.REVIEW)}
          >
            Next: Review CSV
          </Button>
        }
      />
    </>
  )
}

export default BulkCreateUpload
