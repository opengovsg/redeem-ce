import {ComponentStyleConfig} from '@chakra-ui/react'
import {textStyles} from 'theme/textStyles'

export const Stat: ComponentStyleConfig = {
  sizes: {
    text: {
      label: {
        ...textStyles.caption1,
      },
      number: {
        ...textStyles.subhead1,
      },
    },
    md: {
      label: {
        ...textStyles.caption1,
      },
      number: {
        ...textStyles.h3,
      },
    },
  },
  baseStyle: {
    label: {
      color: 'neutral.500',
    },
    number: {
      color: 'neutral.800',
    },
    container: {
      flexShrink: 0,
      flexBasis: 'auto',
    },
  },
}
