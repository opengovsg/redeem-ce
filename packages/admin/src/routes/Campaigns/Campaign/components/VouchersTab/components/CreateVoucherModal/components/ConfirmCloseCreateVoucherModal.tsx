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
import { useVouchersTabContext } from '../../../VouchersTabContext'

type ConfirmCloseCreateVoucherModalProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  pathName: string
  handleCloseCreateVoucherModal: () => void
}

const ConfirmCloseCreateVoucherModal = ({
  isOpen,
  setIsOpen,
  pathName,
  handleCloseCreateVoucherModal,
}: ConfirmCloseCreateVoucherModalProps): JSX.Element => {
  const history = useHistory()
  const { closeCreateVoucherModal } = useVouchersTabContext()

  const closeAllModal = () => {
    closeCreateVoucherModal()
    handleCloseCreateVoucherModal()
    setIsOpen(false)
    history.replace(pathName)
  }

  const closeCurrentModal = () => {
    setIsOpen(false)
  }

  return (
    <Modal colorScheme="primary" isOpen={isOpen} onClose={closeCurrentModal}>
      <ModalOverlay />
      <ModalContent minWidth="680px">
        <ModalHeader minHeight="64px" />
        <ModalBody paddingY="32px">
          <VStack align="stretch" color="neutral.900" spacing="40px">
            <Text textStyle="h3" color="primary.500">
              The voucher has not been created
            </Text>
            <Text textStyle="body1" color="neutral.900">
              If you exit now, the voucher will not be created and you will need
              to start again. Do you want to exit?
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter padding="0 48px 24px 48px">
          <ButtonGroup alignItems="center" marginLeft="auto" spacing={4}>
            <Button onClick={closeCurrentModal} variant="clear">
              No, stay on page
            </Button>
            <Button
              colorScheme="danger"
              onClick={closeAllModal}
              variant="solid"
            >
              Yes, exit page
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmCloseCreateVoucherModal
