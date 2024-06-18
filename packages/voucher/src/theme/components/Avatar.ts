import {ComponentStyleConfig} from '@chakra-ui/react'

export const Avatar: ComponentStyleConfig = {
  baseStyle: (props) => ({
    container: {
      bg: `${props.colorScheme}.500`,
      color: 'white',
    },
  }),
}
