import {ComponentMultiStyleConfig} from '@chakra-ui/react'
import {textStyles} from 'theme/textStyles'

// Default parts.
const parts = [
  'overlay',
  'dialogContainer',
  'dialog',
  'header',
  'closeButton',
  'body',
  'footer',
]

export const Drawer: ComponentMultiStyleConfig = {
  parts,
  baseStyle: {
    header: {
      px: 0,
      pt: '56px',
      pb: 0,
      color: 'primary.700',
      ...textStyles.h3,
    },
    body: {
      px: 0,
      py: '24px',
    },
    dialog: {
      borderTopRadius: '16px',
    },
  },
}
