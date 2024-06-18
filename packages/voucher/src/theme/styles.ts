import {Theme} from '@chakra-ui/react'

export const styles: Theme['styles'] = {
  global: {
    '#root': {
      minWidth: '100%',
      width: 'fit-content',
    },
    body: {
      background: 'primary.100',
    },
    th: {
      textAlign: 'start',
    },
  },
}
