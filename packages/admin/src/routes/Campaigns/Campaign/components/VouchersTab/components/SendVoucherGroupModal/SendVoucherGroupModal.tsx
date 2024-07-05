import {
  VStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from '@chakra-ui/react'
import Request from 'constants/request'
import { getAddressFromGroup, removeContactNumberPrefix } from 'helpers/utils'
import React from 'react'
import { VoucherType } from 'services/RedeemApi/types'
import RecipientDetails from '../RecipientDetails'

type SendVoucherGroupModalProps = {
  onPrimaryClick: () => void
  sendStatus: string
  isOpen: boolean
  onCloseClick: () => void
  error: any
  group: VoucherType | undefined
}

const SendVoucherGroupModal: React.FC<SendVoucherGroupModalProps> = ({
  onPrimaryClick,
  sendStatus,
  isOpen,
  onCloseClick,
  group,
  error,
}) => {
  const { name, recipientId, contactNumber } = group || {}
  const isLoading = sendStatus === Request.LOADING
  const isSuccess = sendStatus === Request.SUCCESS
  const isError = sendStatus === Request.ERROR
  const isNotSubmitted = !isError && !isSuccess && !isLoading
  return (
    <Modal
      colorScheme="primary"
      isOpen={isOpen}
      onClose={onCloseClick}
      size="create"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Send voucher to {name || 'recipient'}</ModalHeader>
        <ModalBody>
          <VStack align="stretch" marginTop="48px" spacing="24px">
            <VStack align="stretch" spacing="36px">
              {isLoading && (
                <Spinner width="48px" height="48px" marginBottom="36px" />
              )}
              {isError && (
                <Text textStyle="body1" color="danger.700">
                  {error}
                </Text>
              )}
              <Text textStyle="h2" color="primary.700">
                {isNotSubmitted && 'Confirm Recipient Details'}
                {isLoading && 'Sending vouchers by SMS to:'}
                {isSuccess && 'Successfully sent to the following recipient:'}
                {isError && 'Failed to send to the following recipient:'}
              </Text>
            </VStack>
            <RecipientDetails
              name={name}
              recipientId={recipientId}
              address={getAddressFromGroup(group)}
              contactNumber={removeContactNumberPrefix(contactNumber)}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          {!isLoading && (
            <Button
              marginTop="12px"
              colorScheme="primary"
              onClick={isNotSubmitted ? onPrimaryClick : onCloseClick}
            >
              {isNotSubmitted ? 'Yes, send vouchers via SMS' : 'Back to home'}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default React.memo(SendVoucherGroupModal)
