import type { ComponentStyleConfig } from '@chakra-ui/react'
import { textStyles } from 'theme/textStyles'
import { colors } from '../foundations/colors'

export const Button: ComponentStyleConfig = {
  sizes: {
    md: (props) => ({
      h: 'auto',
      padding: props.isFullWidth ? '16px' : '10px 16px',
      // Override button defaults e.g fontWeight
      ...textStyles.subhead1,
    }),
    sm: {
      h: 'auto',
      padding: '8px',
      borderRadius: '20px',
      ...textStyles.caption1,
    },
  },
  baseStyle: {
    borderRadius: '4px',
    _focus: {
      boxShadow: `0 0 0 4px ${colors.primary[200]}`,
    },
  },
  variants: {
    outline: (props) => {
      const { colorScheme: c } = props
      return {
        padding: '9px 15px',
        borderColor: `${c}.500`,
        color: `${c}.500`,
        _disabled: {
          borderColor: `${c}.300`,
          bg: 'transparent',
        },
        _active: {
          bg: `${c}.200`,
          borderColor: `${c}.500`,
        },
        _hover: {
          bg: `${c}.100`,
          borderColor: `${c}.500`,
        },
      }
    },
    // We have one for warning outline because it's different from the normal outline
    warningOutline: (props) => {
      const { colorScheme: c } = props
      return {
        padding: '9px 15px',
        borderWidth: '1px',
        borderColor: `${c}.600`,
        bg: 'white',
        color: `${c}.600`,
        _disabled: {
          borderColor: `${c}.300`,
          bg: 'transparent',
        },
        _active: {
          bg: `${c}.200`,
          borderColor: `${c}.600`,
        },
        _hover: {
          bg: `${c}.200`,
          borderColor: `${c}.600`,
        },
      }
    },
    neutralOutline: {
      padding: '9px 15px',
      borderColor: 'neutral.700',
      color: 'neutral.700',
      bg: 'white',
      border: '1px solid',
      _hover: {
        bg: 'neutral.200',
      },
      _active: {
        bg: 'neutral.300',
      },
      _focus: {
        bg: 'white',
      },
      _disabled: {
        bg: 'white',
        color: 'neutral.300',
        borderColor: 'neutral.300',
      },
    },
    clear: {
      padding: '9px 15px',
      color: 'neutral.700',
      bg: 'transparent',
      _hover: {
        bg: 'primary.100',
      },
      _active: {
        bg: 'primary.200',
      },
      _focus: {
        outline: '4px solid',
        outlineColor: 'primary.300',
        bg: 'transparent',
      },
      _disabled: {
        color: 'primary.300',
      },
    },
    stretch: {
      width: '100%',
      paddingTop: '16px',
      paddingBottom: '16px',
    },
    inlineLink: (props) => {
      const { colorScheme: c } = props
      return {
        padding: 0,
        height: 'auto',
        lineHeight: 'normal',
        verticalAlign: 'baseline',
        color: `${c}.500`,
        paddingInline: 0,
        textDecoration: 'underline',
        _active: {
          color: `${c}.700`,
        },
      }
    },
  },
}
