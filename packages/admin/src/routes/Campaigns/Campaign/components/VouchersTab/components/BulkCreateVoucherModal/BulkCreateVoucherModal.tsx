import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react'
import { useHistory, useLocation } from 'react-router-dom'
import { useVouchersTabContext } from '../../VouchersTabContext'
import BulkCreateUpload from './components/BulkCreateUpload'
import {
  bulkCreateAttachmentReducer,
  bulkCreateInitialAttachmentState,
} from './BulkCreateReducer'
import ConfirmCloseModal from './components/ConfirmCloseModal'
import SubmittedJobModal from './components/SubmittedJobModal'
import BulkCreateGuide from './components/BulkCreateGuide'
import BulkCreateReview from './components/BulkCreateReview'

export enum BulkCreateStage {
  GUIDE,
  UPLOAD,
  REVIEW,
}

const BulkCreateVoucherModal = () => {
  const history = useHistory()
  const location = useLocation()
  const pathName = location.pathname

  const { isBulkCreateVoucherModalOpen, closeBulkCreateVoucherModal } =
    useVouchersTabContext()

  const [bulkCreateState, dispatch] = useReducer(
    bulkCreateAttachmentReducer,
    bulkCreateInitialAttachmentState
  )

  const [isConfirmCloseModalOpen, setIsConfirmCloseModalOpen] = useState(false)
  const [bulkCreateStage, setBulkCreateStage] = useState<BulkCreateStage>(
    BulkCreateStage.GUIDE
  )

  const {
    checkingBulkCreateProgress,
    bulkCreateCsv,
    hasError,
    jobId,
    isSubmittedJobModalOpen,
  } = bulkCreateState

  // Bulk create state is dirty if:
  // 1. On CSV upload, backend is checking CSV
  // 2. There is a bulkCreateCsv which means it passed checks
  // 3. There is error with uploaded bulkCreateCsv
  const isDirty =
    (checkingBulkCreateProgress > 0 && checkingBulkCreateProgress <= 100) ||
    !!bulkCreateCsv ||
    hasError

  // If bulk create state is dirty, pop up confirm close modal
  // Else, close the modal directly
  const handleCloseBulkCreateVoucherModal = useCallback(() => {
    if (isDirty) {
      setIsConfirmCloseModalOpen(true)
    } else {
      history.replace(pathName)
      closeBulkCreateVoucherModal()
    }
  }, [
    isDirty,
    setIsConfirmCloseModalOpen,
    history,
    pathName,
    closeBulkCreateVoucherModal,
  ])

  useEffect(() => {
    if (isBulkCreateVoucherModalOpen) {
      // Push a new state to the browser history with the current URL of the /vouchers route
      history.push(`${pathName}#bulk-create-voucher`)
    }
  }, [isBulkCreateVoucherModalOpen, history, pathName])

  useEffect(() => {
    // Listen for the popstate event on the window object
    window.addEventListener('popstate', handleCloseBulkCreateVoucherModal)

    // Clean up the effect
    return () => {
      window.removeEventListener('popstate', handleCloseBulkCreateVoucherModal)
    }
  }, [handleCloseBulkCreateVoucherModal])

  return (
    <>
      <Modal
        isOpen={isBulkCreateVoucherModalOpen}
        onClose={handleCloseBulkCreateVoucherModal}
        size="full"
      >
        <ModalOverlay />
        <ModalContent
          alignItems="center"
          borderRadius="0px"
          backgroundColor="neutral.100"
          paddingX="140px"
          paddingY="40px"
        >
          {bulkCreateStage === BulkCreateStage.GUIDE ? (
            <BulkCreateGuide setBulkCreateStage={setBulkCreateStage} />
          ) : null}
          {bulkCreateStage === BulkCreateStage.UPLOAD ? (
            <BulkCreateUpload
              bulkCreateState={bulkCreateState}
              bulkCreateDispatch={dispatch}
              setBulkCreateStage={setBulkCreateStage}
              onClose={handleCloseBulkCreateVoucherModal}
            />
          ) : null}
          {bulkCreateStage === BulkCreateStage.REVIEW ? (
            <BulkCreateReview
              bulkCreateState={bulkCreateState}
              bulkCreateDispatch={dispatch}
              setBulkCreateStage={setBulkCreateStage}
              onClose={handleCloseBulkCreateVoucherModal}
            />
          ) : null}
        </ModalContent>
      </Modal>
      {isDirty && (
        <ConfirmCloseModal
          isConfirmCloseModalOpen={isConfirmCloseModalOpen}
          setIsConfirmCloseModalOpen={setIsConfirmCloseModalOpen}
          bulkCreateDispatch={dispatch}
          pathName={pathName}
        />
      )}
      {jobId && (
        <SubmittedJobModal
          isSubmittedJobModalOpen={isSubmittedJobModalOpen}
          bulkCreateState={bulkCreateState}
          bulkCreateDispatch={dispatch}
        />
      )}
    </>
  )
}

export default BulkCreateVoucherModal
