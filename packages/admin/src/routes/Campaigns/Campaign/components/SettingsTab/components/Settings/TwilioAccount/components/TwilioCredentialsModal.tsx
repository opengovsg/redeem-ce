import React, { useEffect } from 'react'
import {
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  ModalFooter,
  Button,
  ButtonGroup,
} from '@chakra-ui/react'
import ModalCloseButton from 'components/ModalCloseButton'
import FormInput from 'components/FormInput'
import Infobox from 'components/Infobox'
import { FormProvider, useForm } from 'react-hook-form'

import { ActorRefFrom } from 'xstate'
import { useActor } from '@xstate/react'
import { useTwilioContext } from '../../context/TwilioContext'
import { MachineType } from '../../machine/TwilioCredentialsModalMachine'

import { twilioRegex } from '../constants'
import TwilioCredentialsInfoBox from './TwilioCredentialsInfoBox'
import FindTwilioCredentials from './FindTwilioCredentials'
import useTwilio from '../../hooks/useTwilio'

type InputType =
  | 'FORM_INPUT_CHANGE_accountSid'
  | 'FORM_INPUT_CHANGE_authToken'
  | 'FORM_INPUT_CHANGE_messagingServiceSid'

const onInputChange =
  (type: InputType, send: ActorRefFrom<MachineType>['send']) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    send({
      type,
      value: e.target.value,
    })
  }

// I didnt create each specific component for the modal body as it will be quite messy to pass each state.
// Overall design is abit wonky. There is 2 source of truth in text of the input. Not very sure how to decouple as both xstate and react-form-hook needs the input
// to perform validation on input via react-form-hook and transition guard in xstate
const TwilioCredentialsModal = () => {
  const { showShouldSmsInfoBox, smsUsed } = useTwilio()
  const { twilioService } = useTwilioContext()
  const [state, send] = useActor(twilioService)

  const formMethods = useForm()
  const { handleSubmit, watch, reset } = formMethods
  // Observing the fields
  watch()

  // UI Modal values
  const {
    primaryButtonText,
    secondaryButtonText,
    primaryButtonColorScheme,
    modalPrimaryText,
    accountSid,
    authToken,
    messagingServiceSid,
  } = state.context

  // Controls of the modal
  const onExit = () => send({ type: 'ON_EXIT' })
  const onPrimaryClick = () => send({ type: 'ON_PRIMARY_CLICK' })
  const onSecondaryClick = () => send({ type: 'ON_SECONDARY_CLICK' })
  const onSubmit = handleSubmit(() => onPrimaryClick())

  // Modal state
  // is modal open consist of openMode, draftMode and confirmMode
  const isOpenMode = state.matches('openMode')
  const isDraftMode = state.matches('draftMode')
  const isConfirmMode = state.matches('confirmMode')
  const isClosedMode = state.matches('closedMode')
  const isModalOpen = !isClosedMode
  const isAnyFieldNotFilled = [accountSid, authToken, messagingServiceSid].some(
    (field) => field.length === 0
  )

  // Simply to clear the modal everyime we mount. Because react-hook-form is using a uncontrolled method, all the states are being stored
  // in useForm which might retain the memory (which i think it does when implementing)
  useEffect(() => {
    if (isClosedMode) {
      reset({
        accountSID: '',
        authToken: '',
        messagingServiceSID: '',
      })
    }
  }, [state.value])

  return (
    <Modal colorScheme="primary" isOpen={isModalOpen} onClose={onExit}>
      <ModalOverlay />
      <ModalContent minWidth="680px">
        <ModalCloseButton onClick={onExit} />
        <ModalHeader>use your own sms account</ModalHeader>
        <ModalBody paddingY="48px">
          <VStack align="stretch" color="neutral.900" spacing="40px">
            <Text textStyle="h3" color="primary.500">
              {modalPrimaryText}
            </Text>
            {/* Open mode to be disabled here */}
            {isOpenMode && (
              <VStack align="stretch" spacing="24px">
                {showShouldSmsInfoBox && (
                  <TwilioCredentialsInfoBox
                    showButton={false}
                    smsUsed={smsUsed}
                  />
                )}
                <Text textStyle="body1" color="neutral.700">
                  {
                    'Please add your own Twilio credentials to send more than 3,000 SMSes. '
                  }
                  <FindTwilioCredentials />
                </Text>
                {/* TODO: See if the rendering is an issue. This is a known issue for FormProvider */}
                <FormProvider {...formMethods}>
                  <form onSubmit={onSubmit}>
                    <VStack spacing={8}>
                      <FormInput
                        name="accountSID"
                        label="Account SID"
                        inputProps={{
                          placeholder: 'Enter Account SID starting with AC',
                          autoFocus: true,
                        }}
                        registerOptions={{
                          pattern: {
                            value: twilioRegex.accountSidRegex,
                            message:
                              'Please enter a valid Account SID starting with AC',
                          },
                        }}
                        onChange={onInputChange(
                          'FORM_INPUT_CHANGE_accountSid',
                          send
                        )}
                      />
                      <FormInput
                        name="authToken"
                        label="Auth Token"
                        inputProps={{
                          placeholder: 'Enter Auth Token',
                          type: 'password',
                        }}
                        registerOptions={{
                          pattern: {
                            value: twilioRegex.authTokenRegex,
                            message: 'Please enter a valid Auth Token',
                          },
                        }}
                        onChange={onInputChange(
                          'FORM_INPUT_CHANGE_authToken',
                          send
                        )}
                      />
                      <FormInput
                        name="messagingServiceSID"
                        label="Messaging service SID"
                        inputProps={{
                          placeholder:
                            'Enter Messaging Service SID starting with MG',
                        }}
                        registerOptions={{
                          pattern: {
                            value: twilioRegex.messagingServiceSidRegex,
                            message:
                              'Please enter a valid Messaging Service SID starting with MG',
                          },
                        }}
                        onChange={onInputChange(
                          'FORM_INPUT_CHANGE_messagingServiceSid',
                          send
                        )}
                      />
                    </VStack>
                  </form>
                </FormProvider>
              </VStack>
            )}
            {isDraftMode && (
              <Text textStyle="body1" color="neutral.900">
                Are you sure you want to leave? Your changes will be lost.
              </Text>
            )}
            {isConfirmMode && (
              <VStack spacing="24px">
                <Text textStyle="body1" color="neutral.900">
                  Are you sure you want to use these Twilio credentials to send
                  SMSes for your campaign?
                </Text>
                <Infobox
                  variant="warning"
                  width="100%"
                  text={
                    <Text textStyle="body1" color="neutral.900">
                      Once you confirm these Twilio credentials, you will be
                      unable to change them for this campaign. This action is
                      irreversible.
                    </Text>
                  }
                />
              </VStack>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter padding="0 48px 24px 48px">
          <ButtonGroup alignItems="center" marginLeft="auto" spacing={4}>
            <Button onClick={onSecondaryClick} variant="clear">
              {secondaryButtonText}
            </Button>
            <Button
              colorScheme={primaryButtonColorScheme}
              disabled={isOpenMode && isAnyFieldNotFilled}
              onClick={onSubmit}
              variant="solid"
            >
              {primaryButtonText}
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default TwilioCredentialsModal
