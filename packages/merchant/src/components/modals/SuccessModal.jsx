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
import { useTranslation } from 'react-i18next'
import BREAKPOINTS from 'constants/breakpoints'
import I18N_KEYS from 'constants/i18n-keys'

const SuccessModal = ({ children, isOpen, onClose }) => {
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
        alignItems='center'
        padding={8}
        maxWidth={BREAKPOINTS.HORIZONTAL_RESPONSIVE.MAX_WIDTH}
      >
        <Icon
          w={20}
          h={20}
          as={BxsCheckCircle}
          color='green'
        />
        <ModalHeader
          paddingTop={4}
          paddingBottom={2}
          color='green'
        >
          <Text
            textStyle='h2'
            fontSize={28}
          >
            {t(TEXT.SUCCESS)}
          </Text>
        </ModalHeader>
        <ModalBody
          textAlign='center'
          paddingY={0}
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

SuccessModal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export default SuccessModal
