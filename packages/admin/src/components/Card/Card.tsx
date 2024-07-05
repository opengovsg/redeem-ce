import React from 'react'
import { VStack, StackProps } from '@chakra-ui/react'

type CardProps = {
  children?: React.ReactNode
  id?: string
} & StackProps

const Card = ({ children, id, ...props }: CardProps) => {
  return (
    <VStack
      alignItems="flex-start"
      border="1px solid"
      borderColor="neutral.200"
      borderRadius="4px"
      backgroundColor="white"
      id={id}
      spacing={6}
      {...props}
    >
      {children}
    </VStack>
  )
}

export default Card
