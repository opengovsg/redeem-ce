import React, { useEffect } from 'react'

import {
  Box,
  Button,
  CheckboxGroup,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import FormInput from 'components/FormInput'
import InlineMessage from 'components/InlineMessage'
import ModalCloseButton from 'components/ModalCloseButton'
import PermissionsOption from '../../../PermissionsOption'
import { PERMISSION_GROUPS } from '../../../../constants'
import { useSettingsTabContext } from '../../../../SettingsTabContext'

const ManageAdminModal = () => {
  const {
    permissionsModalState: modalState,
    onClickAddAdmin: onClickAdd,
    isAddAdminLoading,
    onClickUpdateAdmin: onClickUpdate,
    isUpdateAdminLoading,
    onCloseManageAdminModal: onCloseClick,
  } = useSettingsTabContext()

  const formMethods = useForm({ mode: 'onTouched' })
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods

  const isCreateMode = modalState.mode === 'create'
  const isEditMode = modalState.mode === 'edit'

  useEffect(() => {
    reset(
      isEditMode
        ? {
            permissionGroups: modalState.currentAdmin.roles,
            email: modalState.currentAdmin.email,
          }
        : { permissionGroups: [], email: '' }
    )
  }, [modalState, reset])

  const onSubmit = (data: any) => {
    if (isCreateMode) {
      onClickAdd(data)
    } else if (isEditMode) {
      onClickUpdate({
        permissionGroups: data.permissionGroups,
        userId: modalState.currentAdmin.actorId,
      })
    }
  }

  return (
    <Modal
      colorScheme="primary"
      isOpen={modalState.mode !== 'closed'}
      onClose={onCloseClick}
    >
      <ModalOverlay />
      <ModalContent minWidth="680px">
        <ModalCloseButton onClick={onCloseClick} />
        <ModalHeader>Manage campaign access</ModalHeader>
        <ModalBody paddingX={0}>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack align="stretch" paddingY="48px" spacing="40px">
                <Text textStyle="h2" color="primary.700" paddingX="48px">
                  {isCreateMode && 'Add new user'}
                  {isEditMode && 'Edit user permissions'}
                </Text>
                <Flex alignItems="stretch" flexDirection="column" width="100%">
                  <VStack align="stretch" spacing="36px">
                    <Box paddingX="48px">
                      {isCreateMode && (
                        <FormInput
                          label={
                            <>
                              <Text
                                textStyle="h5"
                                paddingBottom="8px"
                                color="neutral.900"
                              >
                                Enter new user&apos;s email
                              </Text>
                              <Text textStyle="body2" color="neutral.700">
                                Users who are added will automatically be able
                                to view all vouchers and participating merchants
                                in the campaign.
                              </Text>
                            </>
                          }
                          name="email"
                          transformInput={(input) => input?.toLowerCase()}
                          registerOptions={{
                            required: 'Email is required',
                            pattern: {
                              // eslint-disable-next-line no-useless-escape
                              value:
                                /^(?!\.)(?!.*\.\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i, // Zod regex for email format
                              message: 'Invalid email format',
                            },
                          }}
                        />
                      )}
                      {isEditMode && (
                        <VStack align="stretch">
                          <Text
                            textStyle="h5"
                            paddingBottom="4px"
                            color="neutral.900"
                          >
                            User email
                          </Text>
                          <Text
                            textStyle="h4"
                            paddingBottom="4px"
                            color="primary.500"
                          >
                            {modalState.currentAdmin.email}
                          </Text>
                        </VStack>
                      )}
                    </Box>
                    <VStack align="stretch" spacing="16px">
                      <Box paddingX="48px">
                        <Text
                          textStyle="h5"
                          paddingBottom="8px"
                          color="neutral.900"
                        >
                          Select user permissions
                        </Text>
                        <Text textStyle="body2" color="neutral.800">
                          Choose at least 1 permission group.
                        </Text>
                      </Box>
                      <Controller
                        control={control}
                        name="permissionGroups"
                        defaultValue={
                          isEditMode
                            ? modalState.currentAdmin.permissionGroups
                            : []
                        }
                        rules={{
                          validate: (value) => value.length > 0,
                        }}
                        render={({ field: { onChange, value, onBlur } }) => (
                          <Flex flexDirection="column" width="100%">
                            <CheckboxGroup
                              colorScheme="primary"
                              onChange={(...event: any[]) => {
                                onChange(...event)
                                onBlur() // call onBlur to trigger form validation
                              }}
                              size="xl"
                              value={value}
                            >
                              <Divider colorScheme="neutral" />
                              {Object.entries(PERMISSION_GROUPS).map(
                                ([key, permissionGroup]) => (
                                  <React.Fragment key={key}>
                                    <PermissionsOption
                                      value={key}
                                      isSelected={value?.includes(key)}
                                      label={permissionGroup.label}
                                      description={permissionGroup.description}
                                    />
                                    <Divider colorScheme="neutral" />
                                  </React.Fragment>
                                )
                              )}
                            </CheckboxGroup>
                          </Flex>
                        )}
                      />

                      <InlineMessage
                        type="neutral"
                        color="neutral.700"
                        paddingX="24px"
                        paddingY={0}
                      >
                        Access to updating merchant details can only be granted
                        by the team.
                      </InlineMessage>
                    </VStack>
                  </VStack>
                </Flex>
                <HStack paddingX="48px" spacing="8px">
                  <Button
                    colorScheme="primary"
                    disabled={!isValid}
                    isLoading={isAddAdminLoading || isUpdateAdminLoading}
                    type="submit"
                  >
                    {isCreateMode && 'Add user'}
                    {isEditMode && 'Save user permissions'}
                  </Button>
                  <Button
                    colorScheme="primary"
                    onClick={onCloseClick}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ManageAdminModal
