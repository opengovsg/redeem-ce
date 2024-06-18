import React from 'react'
import {Icon, Button, Text, HStack} from '@chakra-ui/react'
import {BiChevronLeft} from 'react-icons/bi'

type BackButtonProps = {
  color: string
  activeHoverColor: string
  id: string
  onBackClick: () => void
  text: string
}

const BackButton = ({
  color,
  activeHoverColor,
  id,
  onBackClick,
  text,
}: BackButtonProps) => {
  return (
    <Button
      flexShrink={0}
      padding='8px'
      color={color}
      lineHeight='1.5rem'
      _hover={{
        backgroundColor: activeHoverColor,
      }}
      _active={{
        backgroundColor: activeHoverColor,
      }}
      id={id}
      onClick={onBackClick}
      variant='link'
    >
      <HStack align='center' justify='center' whiteSpace='pre-wrap'>
        <Icon as={BiChevronLeft} width='24px' height='24px' />
        <Text>{text}</Text>
      </HStack>
    </Button>
  )
}

export default BackButton
