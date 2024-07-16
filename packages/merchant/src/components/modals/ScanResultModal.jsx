import React from 'react'
import PropTypes from 'prop-types'
import {
  Icon,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react'
import { Button, BxsCheckCircle } from '@opengovsg/design-system-react'
import BREAKPOINTS from 'constants/breakpoints'
import { BiSolidXCircle } from 'react-icons/bi'
import { useTranslation } from 'react-i18next'

import I18N_KEYS from 'constants/i18n-keys'

const ScanResultModal = ({ children, isOpen, onClose, errorTitle }) => {
  const { KEY, TEXT } = I18N_KEYS.COMMON
  const { t } = useTranslation(KEY)

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent
        maxWidth={BREAKPOINTS.HORIZONTAL_RESPONSIVE.MAX_WIDTH}
        padding={8}
        paddingTop={0}
        alignItems='center'
      >
        <Icon
          w='120px'
          h='120px'
          padding='1px'
          marginTop='-60px'
          as={!errorTitle ? BxsCheckCircle : BiSolidXCircle}
          borderRadius='60px'
          backgroundColor='white'
          color={!errorTitle ? 'green' : 'red'}
        />
        <ModalHeader
          paddingTop={4}
          paddingBottom={2}
          color={!errorTitle ? 'green' : 'red'}
        >
          <Text
            textStyle='h2'
            fontSize={!errorTitle ? 28 : 24}
          >
            {errorTitle ?? t(TEXT.SUCCESS)}
          </Text>
        </ModalHeader>
        <ModalBody
          textAlign='center'
          padding={0}
          w='100%'
        >
          {children}
        </ModalBody>
        <ModalFooter
          w='100%'
          paddingTop={4}
          paddingX={0}
          paddingBottom={0}
        >
          <Button
            w='100%'
            h={14}
            colorScheme='blue'
            onClick={onClose}
          >
            {t(TEXT.CLOSE)}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

ScanResultModal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  errorTitle: PropTypes.string,
}

export default ScanResultModal
