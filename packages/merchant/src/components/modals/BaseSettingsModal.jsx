import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  Text,
  Flex,
} from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'
import { useTranslation } from 'react-i18next'
import BREAKPOINTS from 'constants/breakpoints'
import I18N_KEYS from 'constants/i18n-keys'

const BaseSettingsModal = ({
  children,
  title,
  fullWidthBody,
  isOpen,
  primaryActionTitle,
  primaryActionLoading,
  onPrimaryAction,
  showCancel,
  onCancel,
}) => {
  const { KEY, TEXT } = I18N_KEYS.COMMON
  const { t } = useTranslation(KEY)

  return (
    <Modal
      isCentered
      isOpen={isOpen}
    >
      <ModalOverlay />
      <ModalContent
        padding={8}
        maxWidth={BREAKPOINTS.HORIZONTAL_RESPONSIVE.MAX_WIDTH}
      >
        <ModalHeader
          padding={0}
          marginBottom={2}
        >
          <Text
            textStyle='h2'
            lineHeight='32px'
            fontSize={24}
          >
            {title}
          </Text>
        </ModalHeader>
        <ModalBody
          textAlign='center'
          padding={0}
          marginX={fullWidthBody ? -8 : 0}
        >
          {children}
        </ModalBody>
        <ModalFooter
          paddingTop={4}
          paddingX={0}
          paddingBottom={0}
        >
          <Flex
            w='100%'
            flexDir='column'
          >
            <Button
              h={14}
              colorScheme='blue'
              onClick={onPrimaryAction}
            >
              {primaryActionTitle}
            </Button>
            {showCancel && (
              <Button
                w='100%'
                marginTop={4}
                variant='link'
                colorScheme='grey'
                isLoading={primaryActionLoading}
                onClick={onCancel}
              >
                <Text textStyle='subhead-2'>{t(TEXT.CANCEL)}</Text>
              </Button>
            )}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

BaseSettingsModal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  fullWidthBody: PropTypes.bool,
  isOpen: PropTypes.bool,
  primaryActionTitle: PropTypes.string,
  primaryActionLoading: PropTypes.bool,
  onPrimaryAction: PropTypes.func,
  showCancel: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default BaseSettingsModal
