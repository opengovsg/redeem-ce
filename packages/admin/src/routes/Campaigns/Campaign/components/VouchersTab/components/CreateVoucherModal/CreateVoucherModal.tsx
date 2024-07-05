import React, { useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import {
  Modal,
  ModalContent,
  ModalBody,
  Spinner,
  Flex,
  HStack,
  Box,
} from '@chakra-ui/react'
import { useHistory, useLocation } from 'react-router-dom'

import { useVouchersTabContext } from '../../VouchersTabContext'

import {
  CreateVoucherStoredFormContent,
  VoucherRecipientModalFocusState,
} from './types'
import VoucherTypeStep from './components/VoucherTypeStep'
import CreateVoucherStickyHeader from './components/CreateVoucherStickyHeader'
import CreateVoucherStepSideBar from './components/CreateVoucherStepSideBar'
import PersonalDetailsStep from './components/PersonalDetailsStep'
import ConfirmationStep from './components/ConfirmationStep'
import CreateVoucherFinalStepModal from './components/CreateVoucherFinalStepModal'
import ConfirmCloseCreateVoucherModal from './components/ConfirmCloseCreateVoucherModal'

const VoucherRecipientStep = React.lazy(
  () => import('./components/VoucherRecipientStep')
)

const defaultValues: CreateVoucherStoredFormContent = {
  voucherNameParam: '',
  voucherContactNumberParam: '',
  voucherCountryCodeParam: '65',
  voucherRecipientIdParam: '',
  voucherBlockNumberParam: '',
  voucherStreetNameParam: '',
  voucherPostalCodeParam: '',
  voucherFloorNumberParam: '',
  voucherUnitNumberParam: '',
  addressValueToSearch: null,
}

const CreateVoucherModal = () => {
  const history = useHistory()
  const location = useLocation()
  const pathName = location.pathname

  const {
    currentCreateStep,
    isCreateVoucherModalOpen,
    closeCreateVoucherModal,
    selectedVoucherType,
  } = useVouchersTabContext()
  const [isConfirmCloseModalOpen, setIsConfirmCloseModalOpen] = useState(false)

  const [storedFormContent, setStoredFormContent] =
    useState<CreateVoucherStoredFormContent>(defaultValues)
  const onAddFormContent = useCallback(
    (data: Partial<CreateVoucherStoredFormContent>) =>
      setStoredFormContent((initalValue) => _.merge({}, initalValue, data)),
    []
  )

  // This state is to control the focus on the voucher recipient steps.
  // By default, the recipient identifier is the focused state.
  const [voucherRecipientModalFocusState, setVoucherRecipientModalFocusState] =
    useState<VoucherRecipientModalFocusState>('recipientId')

  // If form contains some input or user have already selected a create voucher method
  const isDirty =
    !_.isEqual(storedFormContent, defaultValues) ||
    !_.isNull(selectedVoucherType)

  const handleCloseCreateVoucherModal = useCallback(() => {
    if (isDirty) {
      setIsConfirmCloseModalOpen(true)
    } else {
      history.replace(pathName)
      closeCreateVoucherModal()
    }
  }, [
    isDirty,
    setIsConfirmCloseModalOpen,
    history,
    pathName,
    closeCreateVoucherModal,
  ])

  useEffect(() => {
    if (isCreateVoucherModalOpen) {
      setStoredFormContent(defaultValues)
    }
  }, [isCreateVoucherModalOpen])

  useEffect(() => {
    if (isCreateVoucherModalOpen) {
      history.push(`${pathName}#create-voucher`)
    }
  }, [isCreateVoucherModalOpen, history, pathName])

  useEffect(() => {
    // Listen for the popstate event on the window object
    window.addEventListener('popstate', handleCloseCreateVoucherModal)

    // Clean up the effect
    return () => {
      window.removeEventListener('popstate', handleCloseCreateVoucherModal)
    }
  }, [handleCloseCreateVoucherModal])

  return (
    <>
      <Modal
        isOpen={isCreateVoucherModalOpen}
        onClose={handleCloseCreateVoucherModal}
        size="full"
      >
        <ModalContent
          position="relative"
          alignItems="center"
          paddingTop="64px"
          borderRadius="0px"
          backgroundColor="neutral.100"
        >
          <CreateVoucherStickyHeader
            handleCloseCreateVoucherModal={handleCloseCreateVoucherModal}
          />
          <HStack align="start" flexGrow={1} width="100%" paddingY="44px">
            <CreateVoucherStepSideBar />
            <Box width="100%" height="max-content">
              {currentCreateStep === 0 && <VoucherTypeStep />}
              {currentCreateStep === 1 && (
                <React.Suspense
                  fallback={
                    <ModalBody minHeight="512px">
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        minHeight="inherit"
                      >
                        <Spinner colorScheme="primary" size="xl" />
                      </Flex>
                    </ModalBody>
                  }
                >
                  <VoucherRecipientStep
                    storedFormContent={storedFormContent}
                    onAddFormContent={onAddFormContent}
                    setStoredFormContent={setStoredFormContent}
                    voucherRecipientModalFocusState={
                      voucherRecipientModalFocusState
                    }
                  />
                </React.Suspense>
              )}
              {currentCreateStep === 2 && (
                <PersonalDetailsStep
                  storedFormContent={storedFormContent}
                  onAddFormContent={onAddFormContent}
                  setStoredFormContent={setStoredFormContent}
                />
              )}
              {currentCreateStep === 3 && (
                <ConfirmationStep
                  storedFormContent={storedFormContent}
                  setVoucherRecipientModalFocusState={
                    setVoucherRecipientModalFocusState
                  }
                />
              )}
              <CreateVoucherFinalStepModal />
            </Box>
          </HStack>
        </ModalContent>
      </Modal>
      {isDirty && (
        <ConfirmCloseCreateVoucherModal
          isOpen={isConfirmCloseModalOpen}
          setIsOpen={setIsConfirmCloseModalOpen}
          handleCloseCreateVoucherModal={handleCloseCreateVoucherModal}
          pathName={pathName}
        />
      )}
    </>
  )
}

export default React.memo(CreateVoucherModal)
