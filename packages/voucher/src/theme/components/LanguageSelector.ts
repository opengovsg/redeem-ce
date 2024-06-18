import {ComponentMultiStyleConfigWithParts} from '../types'
import {anatomy} from '@chakra-ui/theme-tools'
import {textStyles} from '../textStyles'

const parts = anatomy('LanguageSelector').parts(
  'button',
  'label',
  'icon',
  'dropdown',
  'item',
)

export const LanguageSelector: ComponentMultiStyleConfigWithParts<
  typeof parts
> = {
  parts: parts.keys,
  baseStyle: {
    button: {
      boxSizing: 'border-box',
      width: '139px',
      padding: '8px 12px',
      color: 'white',
      background: 'primary.900',
      borderWidth: '1px',
      borderColor: 'primary.500',
      borderStyle: 'solid',
      borderRadius: '4px',
      _active: {
        boxSizing: 'border-box',
        backgroundColor: 'primary.900',
        borderColor: 'primary.500',
        boxShadow: '0 0 0 1px #505798 !important',
      },
      _hover: {},
    },
    icon: {
      boxSize: '18px',
    },
    dropdown: {
      width: '100%',
      minWidth: '100%',
      paddingTop: '0px',
      color: 'neutral.900',
      borderTopRadius: '2px',
      borderBottomRadius: '0px',
      paddingBottom: '0px',
    },
    item: {
      ...textStyles['body1'],
      alignItems: 'center',
      paddingLeft: '37.5px',
      paddingY: '10px',
      textAlign: 'start',
    },
  },
  variants: {
    light: {
      button: {
        background: 'white',
        color: 'primary.500',
        _active: {
          backgroundColor: 'white',
        },
      },
    },
    primary: {
      button: {
        background: 'primary.200',
        color: 'primary.500',
        _active: {
          backgroundColor: 'primary.200',
        },
      },
    },
  },
}
