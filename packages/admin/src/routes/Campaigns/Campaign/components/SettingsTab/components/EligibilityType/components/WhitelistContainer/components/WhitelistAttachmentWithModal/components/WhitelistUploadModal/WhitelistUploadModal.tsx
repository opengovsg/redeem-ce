import React from 'react'
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
import Infobox from 'components/Infobox'

type WhitelistUploadModalProps = {
  previousNumberOfRows?: string
  numberOfRows: number
  isOpen: boolean
  onClose: () => void
  onPrimaryClick: () => void
  primaryText: string
  isUploading: boolean
}

const WhitelistUploadModal = ({
  previousNumberOfRows,
  numberOfRows,
  isOpen,
  onClose,
  onPrimaryClick,
  primaryText,
  isUploading,
}: WhitelistUploadModalProps) => {
  const hasPrevious = !!previousNumberOfRows
  const overrideOnClose = () => {
    if (isUploading) return
    onClose()
  }

  return (
    <Modal colorScheme="primary" isOpen={isOpen} onClose={overrideOnClose}>
      <ModalOverlay />
      <ModalContent minWidth="680px">
        <ModalCloseButton onClick={overrideOnClose} isDisabled={isUploading} />
        <ModalHeader>Upload Successful</ModalHeader>
        <ModalBody paddingY="48px">
          <VStack align="stretch" color="neutral.900" spacing="40px">
            <Text textStyle="h3" color="primary.500">
              {primaryText}
            </Text>
            <Text textStyle="subhead1" fontWeight={400}>
              {`Your whitelist has been reviewed. `}
              <Text
                as="span"
                textStyle="subhead1"
              >{`${numberOfRows} unique recipients `}</Text>
              will be eligible when they sign up for this campaign using the
              sign-up link. Please confirm to proceed.
            </Text>
            {hasPrevious && (
              <Infobox
                variant="warning"
                text={
                  <Text textStyle="subhead1" fontWeight={400}>
                    This whitelist
                    <Text
                      as="span"
                      textStyle="body1"
                      fontWeight={500}
                    >{` will replace the current whitelist `}</Text>
                    {`containing ${previousNumberOfRows} unique recipients. This is irreversible.`}
                  </Text>
                }
              />
            )}
          </VStack>
        </ModalBody>
        <ModalFooter padding="0 48px 24px 48px">
          <ButtonGroup alignItems="center" marginLeft="auto" spacing={4}>
            <Button
              isDisabled={isUploading}
              onClick={overrideOnClose}
              variant="clear"
            >
              Cancel
            </Button>
            <Button
              isLoading={isUploading}
              onClick={onPrimaryClick}
              variant="solid"
            >
              {primaryText}
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default WhitelistUploadModal
