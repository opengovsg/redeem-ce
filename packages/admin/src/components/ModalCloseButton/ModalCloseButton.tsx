import { CloseButton, CloseButtonProps, Icon } from '@chakra-ui/react'
import React from 'react'
import { BiX } from 'react-icons/bi'

type ModalCloseButtonProps = CloseButtonProps

const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({ ...props }) => {
  return (
    <CloseButton
      position="absolute"
      top="14px"
      right="48px"
      width="2.25rem"
      height="2.25rem"
      {...props}
    >
      <Icon as={BiX} width="2rem" height="2rem" color="white" />
    </CloseButton>
  )
}

export default ModalCloseButton
