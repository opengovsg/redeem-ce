import {ComponentStyleConfig} from '@chakra-ui/react'

export const Checkbox: ComponentStyleConfig = {
  baseStyle: (props) => ({
    control: {
      borderRadius: '4px',
      borderColor: `${props.colorScheme}.500`,
    },
  }),
  sizes: {
    xl: {
      control: {w: 6, h: 6},
      label: {fontSize: 'lg'},
      icon: {fontSize: '0.75rem'},
    },
  },
}
