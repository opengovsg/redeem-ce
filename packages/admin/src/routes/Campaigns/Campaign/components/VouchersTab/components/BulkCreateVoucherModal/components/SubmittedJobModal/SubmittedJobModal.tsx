import React, { useCallback, useEffect } from 'react'
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react'
import { useCheckBulkCreateJobStatus } from 'hooks/BulkCreate'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import { BulkCreateJobStatus } from 'services/RedeemApi/types'
import { useVouchersTabContext } from '../../../../VouchersTabContext'
import {
  BulkCreateAttachmentData,
  BulkCreateMetaDataAction,
} from '../../BulkCreateReducer'
import JobLoading from './components/JobLoading'
import JobCompleted from './components/JobCompleted'

type SubmittedJobModalProps = {
  isSubmittedJobModalOpen: boolean
  bulkCreateState: BulkCreateAttachmentData
  bulkCreateDispatch: React.Dispatch<BulkCreateMetaDataAction>
}

const SubmittedJobModal = ({
  isSubmittedJobModalOpen,
  bulkCreateState,
  bulkCreateDispatch: dispatch,
}: SubmittedJobModalProps): JSX.Element => {
  const { campaignId } = useCampaignContext()
  const { closeBulkCreateVoucherModal } = useVouchersTabContext()

  const { jobId } = bulkCreateState

  const closeAllModals = useCallback(() => {
    closeBulkCreateVoucherModal()
    dispatch({ type: 'CLEAR' }) // Also closes the SubmittedJobModal
  }, [closeBulkCreateVoucherModal, dispatch])

  const closeSubmittedJobModal = () => {
    dispatch({ type: 'CLEAR' }) // Also closes the SubmittedJobModal
  }

  const { bulkCreateJobStatus, numVouchersCreated } =
    useCheckBulkCreateJobStatus(campaignId, jobId)

  const isJobLoading =
    bulkCreateJobStatus === BulkCreateJobStatus.not_started ||
    bulkCreateJobStatus === BulkCreateJobStatus.started

  const isJobCompleted =
    bulkCreateJobStatus === BulkCreateJobStatus.success ||
    bulkCreateJobStatus === BulkCreateJobStatus.failure

  // To alert user on refresh/exit
  useEffect(() => {
    const confirmExit = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      // eslint-disable-next-line no-param-reassign
      event.returnValue = '' // This is required for older browsers
    }

    window.addEventListener('beforeunload', confirmExit)

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', confirmExit)
    }
  }, [])

  return (
    <Modal
      closeOnEsc={false}
      closeOnOverlayClick={false}
      colorScheme="primary"
      isCentered
      isOpen={isSubmittedJobModalOpen}
      onClose={closeSubmittedJobModal}
    >
      <ModalOverlay />
      <ModalContent minWidth="680px">
        {isJobLoading ? <JobLoading jobState={bulkCreateJobStatus} /> : null}
        {isJobCompleted ? (
          <JobCompleted
            numVouchersCreated={numVouchersCreated}
            onClickClose={closeAllModals}
          />
        ) : null}
      </ModalContent>
    </Modal>
  )
}

export default SubmittedJobModal
