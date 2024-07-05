import React from 'react'

import {
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
  Link,
} from '@chakra-ui/react'
import ModalCloseButton from 'components/ModalCloseButton'
import PermissionsOption from '../PermissionsOption'
import { PERMISSION_GROUPS } from '../../constants'

type DeleteAdminModalProps = {
  isOpen: boolean
  admin?: any
  isPrimaryLoading: boolean
  onPrimaryClick: () => void
  onCloseClick: () => void
}

const DeleteAdminModal: React.FC<DeleteAdminModalProps> = ({
  isOpen,
  admin,
  onCloseClick,
  onPrimaryClick,
  isPrimaryLoading,
}) => {
  return (
    <Modal colorScheme="primary" isOpen={isOpen} onClose={onCloseClick}>
      <ModalOverlay />
      <ModalContent minWidth="680px">
        <ModalCloseButton onClick={onCloseClick} />
        <ModalHeader>Manage campaign access</ModalHeader>
        <ModalBody paddingX={0}>
          <VStack align="stretch" paddingY="48px" spacing="40px">
            <Text textStyle="h2" color="primary.700" paddingX="48px">
              Delete user access
            </Text>
            <Text
              textStyle="h5"
              display="inline"
              color="neutral.800"
              paddingX="48px"
            >
              Are you sure you want to delete{' '}
              <Link
                color="primary.500"
                textDecoration="none"
                href={`mailto:${admin?.email}`}
              >
                {admin?.email}
              </Link>{' '}
              as a campaign user?
            </Text>
            <VStack align="stretch" spacing="16px">
              <Text textStyle="subhead1" color="neutral.800" paddingX="48px">
                {admin?.email} has the following permissions:
              </Text>
              <Flex flexDirection="column">
                <CheckboxGroup
                  colorScheme="primary"
                  size="xl"
                  value={admin?.roles}
                >
                  <Divider colorScheme="neutral" />
                  {Object.entries(PERMISSION_GROUPS).map(
                    ([key, permissionGroup]) =>
                      admin?.roles?.includes(key) && (
                        <React.Fragment key={key}>
                          <PermissionsOption
                            value={key}
                            isDisabled
                            label={permissionGroup.label}
                            description={permissionGroup.description}
                          />
                          <Divider colorScheme="neutral" />
                        </React.Fragment>
                      )
                  )}
                </CheckboxGroup>
              </Flex>
            </VStack>
            <HStack paddingX="48px" spacing="8px">
              <Button
                colorScheme="danger"
                isLoading={isPrimaryLoading}
                onClick={onPrimaryClick}
                type="submit"
              >
                Delete user&apos;s access
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
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default DeleteAdminModal
