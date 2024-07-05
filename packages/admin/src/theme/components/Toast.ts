import { ComponentStyleConfig } from '@chakra-ui/react'
import { StyleFunctionProps } from '@chakra-ui/theme-tools'

import { textStyles } from 'theme/textStyles'

const parts = ['close', 'content', 'wrapper']

const getSubtleColors = ({ colorScheme: c }: StyleFunctionProps) => {
  switch (c) {
    case 'error':
      return {
        bg: 'danger.100',
        border: '1px solid',
        borderColor: 'danger.500',
        iconFill: 'danger.500',
      }
    case 'success':
      return {
        bg: 'success.100',
        border: '1px solid',
        borderColor: 'success.500',
        iconFill: 'success.500',
      }
    case 'warning':
      return {
        bg: 'secondary.100',
        border: '1px solid',
        borderColor: 'secondary.500',
        iconFill: 'secondary.500',
      }
    default:
      return {
        bg: 'primary.100',
        border: '1px solid',
        borderColor: 'primary.500',
        iconFill: 'primary.500',
      }
  }
}

export const Toast: ComponentStyleConfig = {
  parts,
  sizes: {
    md: {
      icon: {
        left: '1.125rem',
        top: '1.125rem',
        boxSize: '1.25rem',
      },
      content: {
        // NOTE: This is because the outer container already has padding.
        // So the padding here is icon width + outer padding
        ml: '1.875rem',
      },
      wrapper: {
        width: {
          base: 'auto',
          lg: '42.5rem',
        },
        maxW: '100%',
        margin: '0 auto',
        transition: 'all 0.5s linear',
        transform: 'translateY(-100px)',
      },
      container: {
        padding: '1rem',
        // Padding right is 1rem + 1rem (normal padding) + width of the button.
        // This is to prevent the button overlapping the text on resize.
        pr: '3.5rem',
      },
      close: {
        w: '1.5rem',
        h: '1.5rem',
        insetEnd: '1rem',
        top: '1rem',
        fontSize: '1.5rem',
      },
    },
  },
  baseStyle: {
    title: {
      ...textStyles.subhead1,
    },
    description: {
      ...textStyles.body1,
    },
    icon: {
      position: 'absolute',
    },
    wrapper: {
      borderRadius: 'base',
      boxSizing: 'border-box',
    },
    container: {
      borderRadius: 'base',
      background: 'inherit',
    },
    close: {
      position: 'absolute',
    },
  },
  variants: {
    subtle: (props) => {
      const { bg, border, iconFill, borderColor } = getSubtleColors(props)
      return {
        wrapper: {
          color: 'neutral.900',
          bg,
          border,
          borderColor,
        },
        icon: {
          fill: iconFill,
        },
      }
    },
  },
  defaultProps: {
    variant: 'subtle',
    size: 'md',
  },
}
