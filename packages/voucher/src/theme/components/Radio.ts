import {ComponentStyleConfig} from '@chakra-ui/react'
import {textStyles} from 'theme/textStyles'

export const Radio: ComponentStyleConfig = {
  baseStyle: (props) => ({
    label: {
      color: 'neutral.900',
    },
    control: {
      borderColor: `${props.colorScheme}.500`,
      _checked: {
        background: 'none',
        _before: {
          background: `${props.colorScheme}.500`,
        },
      },
    },
  }),
  sizes: {
    md: {
      label: {
        ...textStyles.body1,
        py: '10px',
        pl: '16px',
      },
      control: {
        height: '24px',
        width: '24px',
        _checked: {
          _before: {
            height: '16px',
            width: '16px',
          },
        },
      },
    },
  },
}
