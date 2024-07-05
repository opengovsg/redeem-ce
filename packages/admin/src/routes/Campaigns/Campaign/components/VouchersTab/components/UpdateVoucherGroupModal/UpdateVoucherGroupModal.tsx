import {
  Text,
  ModalOverlay,
  ModalContent,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  VStack,
} from '@chakra-ui/react'
import FormInput from 'components/FormInput'
import ModalCloseButton from 'components/ModalCloseButton'
import { CONTACT_NUMBER_PREFIX } from 'constants/string'
import { getAddressFromGroup, removeContactNumberPrefix } from 'helpers/utils'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { VoucherType } from 'services/RedeemApi/types'

type UpdateVoucherGroupModalProps = {
  isOpen: boolean
  group: VoucherType | undefined | null
  onCloseClick: () => void
  onPrimaryClick: (data: {
    contactNumber: string | null
    name: string | null
  }) => void
  isLoading?: boolean
}

const UpdateVoucherGroupModal: React.FC<UpdateVoucherGroupModalProps> = ({
  isOpen,
  onCloseClick,
  onPrimaryClick,
  group,
  isLoading,
}) => {
  const { name, recipientId, contactNumber } = group || {}
  const formMethods = useForm()
  const { handleSubmit, reset } = formMethods
  // Only if there is a change in contact number or existing contact number which we will then append +65, otherwise return back null
  const onSubmit = handleSubmit((data) =>
    onPrimaryClick({
      contactNumber: data.contactNumber
        ? `${CONTACT_NUMBER_PREFIX}${data.contactNumber}`
        : null,
      name: data.name || null,
    })
  )
  useEffect(() => {
    reset({
      name,
      recipientId,
      address: getAddressFromGroup(group),
      contactNumber: removeContactNumberPrefix(contactNumber),
    })
  }, [name, recipientId, group, contactNumber, reset])
  return (
    <Modal
      colorScheme="primary"
      isOpen={isOpen}
      onClose={onCloseClick}
      size="create"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit {name}&apos;s Profile</ModalHeader>
        <ModalCloseButton onClick={onCloseClick} />
        <ModalBody>
          <VStack align="stretch" spacing="40px">
            <Text textStyle="h2" marginTop="48px" color="primary.700">
              Recipient Details
            </Text>
            <form onSubmit={onSubmit}>
              <FormProvider {...formMethods}>
                <VStack align="stretch" spacing="24px">
                  <FormInput
                    name="name"
                    label="Name"
                    inputProps={{
                      placeholder: 'John Doe',
                      autoFocus: true,
                    }}
                  />
                  <FormInput
                    name="recipientId"
                    label="Recipient Identifier"
                    inputProps={{ isDisabled: true, isReadOnly: true }}
                  />
                  <FormInput
                    name="address"
                    label="Address"
                    inputProps={{ isDisabled: true, isReadOnly: true }}
                  />
                  <FormInput
                    name="contactNumber"
                    label="Mobile Number"
                    inputProps={{
                      placeholder: '91234567',
                    }}
                    registerOptions={{
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Please enter a valid phone number',
                      },
                    }}
                  />
                </VStack>
              </FormProvider>
            </form>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            marginTop="12px"
            colorScheme="primary"
            isLoading={isLoading}
            onClick={onSubmit}
          >
            Save details
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default React.memo(UpdateVoucherGroupModal)
