import {ComponentStyleConfig} from '@chakra-ui/react'

export const Switch: ComponentStyleConfig = {
  baseStyle: (props) => ({
    track: {
      _disabled: {
        _checked: {
          opacity: 1,
          background: `${props.colorScheme}.400`,
        },
      },
    },
  }),
  variants: {
    coloredThumb: (props) => ({
      thumb: {
        background: `${props.colorScheme}.200`,
      },
    }),
  },
}
