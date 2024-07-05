import React from 'react'
import {
  IconButtonProps as ChakraIconButtonProps,
  IconButton as ChakraIconButton,
  Icon,
} from '@chakra-ui/react'

type IconButtonProps = {
  icon: any
} & Omit<ChakraIconButtonProps, 'icon'>

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, ...rest }, ref) => {
    return (
      <ChakraIconButton
        ref={ref}
        flexShrink={0}
        padding="11px"
        textAlign="center"
        icon={<Icon as={icon} width="1.5rem" height="1.5rem" />}
        {...rest}
      />
    )
  }
)
IconButton.displayName = 'IconButton'

export default IconButton
