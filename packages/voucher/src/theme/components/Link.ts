import {ComponentStyleConfig} from '@chakra-ui/react'

export const Link: ComponentStyleConfig = {
  baseStyle: {
    _hover: {textDecoration: 'none'},
    _active: {textDecoration: 'none'},
  },
  variants: {
    underline: {
      textDecoration: 'underline',
    },
  },
}
