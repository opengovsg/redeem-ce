import { HStack, Image, StackProps, Text } from '@chakra-ui/react'
import React from 'react'
import infoCircleSolid from 'img/info-circle-solid.svg'
import infoCircleSolidNeutral from 'img/info-circle-solid-neutral.svg'
import errorCircleSolidWarning from 'img/error-circle-solid-warning.svg'

const inlineMessageTypes = {
  neutral: {
    background: 'none',
    iconSrc: infoCircleSolidNeutral,
  },
  info: {
    background: 'primary.100',
    iconSrc: infoCircleSolid,
  },
  warning: {
    background: 'warning.100',
    iconSrc: errorCircleSolidWarning,
  },
}

type InlineMessageProps = {
  type: keyof typeof inlineMessageTypes
} & StackProps

const InlineMessage: React.FC<InlineMessageProps> = ({
  type,
  children,
  ...stackProps
}) => {
  return (
    <HStack
      width="100%"
      padding="16px"
      background={inlineMessageTypes[type].background}
      spacing="8px"
      {...stackProps}
    >
      <Image
        width="24px"
        height="24px"
        src={inlineMessageTypes[type].iconSrc}
      />
      <Text as="div" textStyle="body1" width="100%">
        {children}
      </Text>
    </HStack>
  )
}

export default InlineMessage
