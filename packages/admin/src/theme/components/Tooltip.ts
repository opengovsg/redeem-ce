import { ComponentStyleConfig } from '@chakra-ui/react'
import { textStyles } from 'theme/textStyles'

export const Tooltip: ComponentStyleConfig = {
  baseStyle: {
    paddingX: '12px',
    paddingY: '8px',
    color: 'white',
    background: 'neutral.900',
    borderRadius: '4px',
    ...textStyles.body2,
  },
}
