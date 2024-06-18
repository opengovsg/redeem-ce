import {ComponentMultiStyleConfigWithParts} from '../types'
import {anatomy} from '@chakra-ui/theme-tools'

const parts = anatomy('GroupPageHeader').parts(
  'container',
  'logoImage',
  'contentContainer',
)

export const GroupPageHeader: ComponentMultiStyleConfigWithParts<typeof parts> =
  {
    parts: parts.keys,
    baseStyle: {
      container: {
        color: 'white',
        backgroundColor: 'primary.800',
      },
      logoImage: {
        maxWidth: '138px',
        maxHeight: '48px',
      },
      contentContainer: {
        color: 'primary.100',
      },
    },
    variants: {
      interactionDisabled: {
        container: {
          color: 'neutral.800',
          backgroundColor: 'neutral.200',
        },
        contentContainer: {
          color: 'neutral.800',
        },
      },
    },
  }
