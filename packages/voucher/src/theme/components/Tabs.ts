import {ComponentStyleConfig} from '@chakra-ui/react'
import {textStyles} from 'theme/textStyles'

export const Tabs: ComponentStyleConfig = {
  sizes: {
    md: {
      tab: {
        ...textStyles.subhead3,
        mx: '16px',
        px: 0,
        pt: 0,
        pb: '4px',
        _first: {
          ml: '32px',
        },
      },
    },
  },
  baseStyle: {
    tabpanel: {p: 0},
    tab: {
      _focus: {
        boxShadow: 'none',
      },
    },
  },
  variants: {
    line: (props) => ({
      tablist: {
        paddingBottom: '2px',
        borderColor: 'neutral.300',
      },
      tab: {
        color: `${props.colorScheme}.300`,
        _selected: {
          color: `${props.colorScheme}.500`,
        },
      },
    }),
  },
}
