import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  Spinner,
  VStack,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react'
import { useVouchersTabContext } from '../../../VouchersTabContext'
import { VOUCHER_TYPES } from '../constants'

const CreateVoucherFinalStep = () => {
  const {
    selectedVoucherType,
    isLoadingCreateVoucherOpen,
    setIsLoadingCreateVoucherOpen,
  } = useVouchersTabContext()

  return (
    <Modal
      closeOnEsc={false}
      closeOnOverlayClick={false}
      colorScheme="primary"
      isCentered
      isOpen={isLoadingCreateVoucherOpen}
      onClose={() => setIsLoadingCreateVoucherOpen(false)}
    >
      <ModalOverlay />
      <ModalContent minWidth="680px">
        <ModalHeader minHeight="64px" />
        <ModalBody padding="48px">
          <VStack align="start" width="100%" spacing="32px">
            <Spinner size="lg" />
            <Text textStyle="h2" color="primary.500">
              {selectedVoucherType === VOUCHER_TYPES.DIGITAL &&
                'Sending voucher by SMS'}
              {selectedVoucherType === VOUCHER_TYPES.PAPER &&
                'Printing voucher'}
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CreateVoucherFinalStep
