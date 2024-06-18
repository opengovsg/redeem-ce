import type {ComponentStyleConfig} from '@chakra-ui/react'
import {textStyles} from 'theme/textStyles'
import {colors} from '../foundations/colors'

export const Button: ComponentStyleConfig = {
  sizes: {
    md: (props) => ({
      h: 'auto',
      padding:
        props.width === 'full' || props.width === '100%' ? '16px' : '10px 16px',
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
      const {colorScheme: c} = props
      return {
        padding: '9px 15px',
        borderColor: `${c}.500`,
        color: `${c}.500`,
      }
    },
    stretch: {
      width: '100%',
      paddingTop: '16px',
      paddingBottom: '16px',
    },
    inlineLink: (props) => {
      const {colorScheme: c} = props
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
    link: {
      _hover: {textDecoration: 'none'},
      _active: {textDecoration: 'none'},
    },
    solid: {
      _hover: {textDecoration: 'none'},
      _active: {textDecoration: 'none'},
    },
  },
}
