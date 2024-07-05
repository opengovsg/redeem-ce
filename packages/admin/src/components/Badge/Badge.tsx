import React from 'react'
import { Text, TextProps } from '@chakra-ui/react'

type BadgeProps = {
  color: string
  backgroundColor: string
  children: React.ReactNode
} & TextProps
/**
 * Basic Badge component that uses Text instead of Badge from Chakra Ui or Design System. This is to match the old style that was used
 */
const Badge = ({ color, backgroundColor, children, ...rest }: BadgeProps) => {
  return (
    <Text
      textStyle="subhead2"
      padding="4px 8px"
      color={color}
      borderRadius="4px"
      backgroundColor={backgroundColor}
      {...rest}
    >
      {children}
    </Text>
  )
}

export default Badge
