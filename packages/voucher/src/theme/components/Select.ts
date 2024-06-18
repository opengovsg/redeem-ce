import {ComponentStyleConfig} from '@chakra-ui/react'
import {textStyles} from 'theme/textStyles'

export const Select: ComponentStyleConfig = {
  baseStyle: {
    field: {
      _focus: {
        boxShadow: 'none',
      },
    },
  },
  variants: {
    outline: {
      field: {
        borderColor: 'neutral.400',
        _focus: {
          borderColor: 'primary.500',
          borderWidth: '2px',
        },
        _hover: {
          borderColor: 'primary.500',
        },
      },
    },
  },
  sizes: {
    md: {
      field: {
        ...textStyles.body1,
        px: 4,
        h: '44px',
        borderRadius: 'base',
      },
      addon: {
        ...textStyles.body1,
        px: 4,
        h: '44px',
        borderRadius: 'base',
      },
    },
  },
}
