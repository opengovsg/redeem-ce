import React, {ReactNode} from 'react'
import {IoMdInformationCircle} from 'react-icons/io'
import {Text, HStack, useMultiStyleConfig, Icon} from '@chakra-ui/react'

interface InlineMessageProps {
  isHidden: boolean
  children: ReactNode
}

const InlineMessage = ({isHidden, children}: InlineMessageProps) => {
  const styles = useMultiStyleConfig('InlineMessage', {})

  return (
    <HStack sx={styles.container} display={isHidden ? 'none' : 'flex'}>
      <Icon as={IoMdInformationCircle} sx={styles.icon} />
      <Text sx={styles.text}>{children}</Text>
    </HStack>
  )
}

export default InlineMessage
