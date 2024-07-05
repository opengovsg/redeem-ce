import { ComponentStyleConfig } from '@chakra-ui/react'
import { textStyles } from 'theme/textStyles'

export type InfoboxVariant = 'info' | 'danger' | 'warning'

const parts = ['messagebox', 'icon']

// For info color, need to change when carina comes up with the design of the color
const variantInfo = {
  messagebox: {
    bg: '#F7F9FE',
    borderColor: '#F7F9FE',
  },
  icon: {
    color: '#505798',
  },
}

const variantWarning = {
  messagebox: {
    bg: '#FDF7F0',
    borderColor: '#E67C18',
  },
  icon: {
    color: '#E67C18',
  },
}

const variantDanger = {
  messagebox: {
    bg: '#fef7f7',
    borderColor: '#C05050',
  },
  icon: {
    color: '#C05050',
  },
}

const variants = {
  info: variantInfo,
  warning: variantWarning,
  danger: variantDanger,
}

export const Infobox: ComponentStyleConfig = {
  parts,
  variants,
  baseStyle: {
    messagebox: {
      display: 'flex',
      justifyContent: 'center',
      color: '#2C2E34',
      border: '1px solid',
      borderRadius: '4px',
      padding: '16px',
    },
    icon: {
      alignSelf: 'flex-start',
    },
  },
  sizes: {
    sm: {
      messagebox: {
        p: '0.625rem',
        ...textStyles.body2,
      },
      icon: {
        my: '0.125rem',
        fontSize: '1rem',
        mr: '0.5rem',
      },
    },
    md: {
      messagebox: {
        padding: '1rem',
        ...textStyles.body1,
      },
      icon: {
        fontSize: '1.5rem',
        mr: '0.5rem',
      },
    },
  },
  defaultProps: {
    variant: 'info',
    size: 'md',
  },
}
