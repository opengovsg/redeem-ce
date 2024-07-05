import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
  ButtonGroup,
} from '@chakra-ui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useVouchersTabContext } from '../../../../VouchersTabContext'
import { BulkCreateMetaDataAction } from '../../BulkCreateReducer'

type ConfirmCloseModalProps = {
  isConfirmCloseModalOpen: boolean
  setIsConfirmCloseModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  bulkCreateDispatch: React.Dispatch<BulkCreateMetaDataAction>
  pathName: string
}

const ConfirmCloseModal = ({
  isConfirmCloseModalOpen,
  setIsConfirmCloseModalOpen,
  bulkCreateDispatch: dispatch,
  pathName,
}: ConfirmCloseModalProps): JSX.Element => {
  const history = useHistory()

  const { closeBulkCreateVoucherModal } = useVouchersTabContext()

  const confirmCloseModal = () => {
    // 1. Go back to /vouchers
    history.replace(pathName)

    // 2. Close confirmCloseModal and bulkCreateVoucherModal
    closeBulkCreateVoucherModal()
    setIsConfirmCloseModalOpen(false)

    // 3. Clear the bulk create attachment state
    // NOTE: This isn't actually needed because every modal open we open a new instance with a new key
    dispatch({ type: 'CLEAR' })
  }

  const closeConfirmCloseModal = () => {
    setIsConfirmCloseModalOpen(false)
  }

  return (
    <Modal
      colorScheme="primary"
      isOpen={isConfirmCloseModalOpen}
      onClose={closeConfirmCloseModal}
    >
      <ModalOverlay />
      <ModalContent minWidth="680px">
        <ModalHeader minHeight="64px" />
        <ModalBody paddingY="32px">
          <VStack align="stretch" color="neutral.900" spacing="40px">
            <Text textStyle="h3" color="primary.500">
              You have unsaved changes
            </Text>
            <Text textStyle="body1" color="neutral.900">
              Are you sure you want to leave? Your changes will be lost.
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter padding="0 48px 24px 48px">
          <ButtonGroup alignItems="center" marginLeft="auto" spacing={4}>
            <Button onClick={closeConfirmCloseModal} variant="clear">
              No, stay on page
            </Button>
            <Button
              colorScheme="danger"
              onClick={confirmCloseModal}
              variant="solid"
            >
              Yes, discard changes
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmCloseModal
