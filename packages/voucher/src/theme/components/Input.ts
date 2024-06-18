import {ComponentStyleConfig} from '@chakra-ui/react'
import {textStyles} from 'theme/textStyles'

export const Input: ComponentStyleConfig = {
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
        background: 'white',
        _focus: {
          borderColor: 'primary.500',
          borderWidth: '2px',
          boxShadow: 'none',
        },
        _hover: {
          borderColor: 'primary.500',
          boxShadow: 'none',
        },
        _disabled: {
          background: 'neutral.200',
          opacity: 1,
          color: 'neutral.500',
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
