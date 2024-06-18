import {textStyles} from '../textStyles'
import {ComponentMultiStyleConfigWithParts} from '../types'
import {anatomy} from '@chakra-ui/theme-tools'

const parts = anatomy('InlineMessage').parts('container', 'icon', 'text')

export const InlineMessage: ComponentMultiStyleConfigWithParts<typeof parts> = {
  parts: parts.keys,
  baseStyle: {
    container: {
      backgroundColor: 'primary.200',
      color: 'primary.500',
      padding: '16px 22px',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    icon: {
      boxSize: '20px',
    },
    text: {
      marginLeft: '8px',
      ...textStyles['subhead2'],
    },
  },
}
