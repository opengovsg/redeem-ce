import {ComponentStyleConfig} from '@chakra-ui/react'
import {textStyles} from 'theme/textStyles'

export const Modal: ComponentStyleConfig = {
  baseStyle: (props) => ({
    header: {
      background: `${props.colorScheme}.500`,
      color: 'white',
      borderRadius: '24px 24px 0 0',
      padding: '20px 48px',
      ...textStyles.subhead3,
    },
    dialog: {
      borderRadius: '24px',
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      paddingY: 0,
      paddingX: '48px',
    },
    footer: {
      padding: '28px 48px 48px 48px',
      justifyContent: 'flex-start',
    },
  }),
  sizes: {
    create: {
      dialog: {maxW: '42.5rem'},
    },
  },
}
