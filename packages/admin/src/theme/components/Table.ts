import { ComponentStyleConfig } from '@chakra-ui/react'
import { textStyles } from 'theme/textStyles'

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
    campaigns: {
      th: {
        paddingY: '18px',
        paddingX: '18px',
        color: 'primary.600',
        ...textStyles.subhead2,
        _first: {
          paddingLeft: '36px',
        },
        _last: {
          paddingRight: '36px',
        },
      },
      td: {
        paddingY: '16px',
        paddingX: '18px',
        ...textStyles.subhead2,
        _first: {
          paddingLeft: '36px',
        },
        _last: {
          paddingRight: '36px',
        },
        borderBottomWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'neutral.300',
      },
    },
  },
}
