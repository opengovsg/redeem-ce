import {ComponentStyleConfig} from '@chakra-ui/react'

export const Menu: ComponentStyleConfig = {
  baseStyle: {
    item: {
      paddingTop: '12px',
      paddingBottom: '12px',

      _focus: {
        background: 'primary.200',
      },

      _hover: {
        background: 'primary.100',
      },
    },
  },
}
