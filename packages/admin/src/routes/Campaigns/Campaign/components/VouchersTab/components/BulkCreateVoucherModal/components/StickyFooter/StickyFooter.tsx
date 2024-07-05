import React from 'react'
import {
  HStack,
  Text,
  ModalFooter,
  Button,
  ButtonGroup,
  Box,
} from '@chakra-ui/react'
import { BiChevronLeft } from 'react-icons/bi'

type StickyFooterProps = {
  backButtonText: string
  backButtonOnClick: () => void
  title: string
  nextButton: React.ReactNode
  onClose?: () => void
}

const StickyFooter = ({
  onClose,
  backButtonText,
  backButtonOnClick,
  title,
  nextButton,
}: StickyFooterProps): JSX.Element => {
  return (
    <Box
      zIndex={9999}
      display="block"
      width="100%"
      height="84px"
      id="phantom-footer-container"
    >
      <ModalFooter
        position="fixed"
        bottom="0"
        left="0"
        width="100%"
        padding="20px 32px"
        boxShadow="0px 0px 10px 0px rgba(216, 222, 235, 0.50)"
        backgroundColor="white"
      >
        <HStack
          position="relative"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Button
            leftIcon={<BiChevronLeft size={24} />}
            onClick={backButtonOnClick}
            variant="neutralOutline"
          >
            {backButtonText}
          </Button>
          <Text
            textStyle="subhead3"
            position="absolute"
            top="50%"
            left="50%"
            textColor="primary.500"
            transform="translate(-50%, -50%)"
          >
            {title}
          </Text>
          <ButtonGroup>
            {onClose ? (
              <Button onClick={onClose} variant="neutralOutline">
                Exit
              </Button>
            ) : null}
            {nextButton}
          </ButtonGroup>
        </HStack>
      </ModalFooter>
    </Box>
  )
}

export default StickyFooter
