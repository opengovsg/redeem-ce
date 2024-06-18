import {ComponentStyleConfig} from '@chakra-ui/react'
import {textStyles} from 'theme/textStyles'

export const Table: ComponentStyleConfig = {
  baseStyle: {
    th: {
      textTransform: 'none',
      background: 'primary.200',
    },
    td: {
      verticalAlign: 'top',
      _first: {
        paddingLeft: '32px',
      },
    },
  },
  variants: {
    simple: {
      th: {
        padding: '18px 32px',
        color: 'primary.600',
        ...textStyles.subhead2,
      },
      td: {
        padding: '20px 32px',
      },
    },
  },
}
