import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

import { components } from './components'
import { foundations } from './foundations'
import { textStyles } from './textStyles'
import { styles } from './styles'
import { breakpoints } from './breakpoints'

export const theme = extendTheme(
  {
    ...foundations,
    components,
    textStyles,
    styles,
    breakpoints,
  },
  withDefaultColorScheme({ colorScheme: 'primary' })
)
