import {ComponentStyleConfig} from '@chakra-ui/react'

import {layerStyles} from '../layerStyles'

export type BannerVariant = 'info' | 'error' | 'warn'

const parts = ['banner', 'item', 'icon', 'link', 'close']

export const Banner: ComponentStyleConfig = {
  parts,
  sizes: {
    md: {
      item: {
        py: ['1rem', '1rem', '0.5rem'],
        px: '1rem',
      },
      icon: {
        fontSize: '1.5rem',
        mr: '0.5rem',
      },
      close: {
        padding: 0,
        ml: '0.5rem',
        mr: '-0.5rem',
        fontSize: '1.5rem',
        w: '1.5rem',
        h: '1.5rem',
      },
    },
  },
  baseStyle: {
    item: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  variants: {
    info: {
      banner: {
        color: '#fff',
        bg: 'primary.500',
      },
      link: {
        color: '#fff',
        _hover: {
          color: '#fff',
        },
        ...layerStyles.focusRing.inverse,
      },
      close: {
        color: '#fff',
        ...layerStyles.focusRing.inverse,
      },
    },
    error: {
      banner: {
        color: '#fff',
        bg: 'danger.500',
      },
      link: {
        color: '#fff',
        _hover: {
          color: '#fff',
        },
        ...layerStyles.focusRing.default,
      },
      close: {
        color: '#fff',
        ...layerStyles.focusRing.default,
      },
    },
    warn: {
      banner: {
        color: 'neutral.900',
        bg: '#FADF52',
      },
      link: {
        color: 'neutral.900',
        _hover: {
          color: 'neutral.900',
        },
        ...layerStyles.focusRing.inverse,
      },
      close: {
        color: 'neutral.900',
        ...layerStyles.focusRing.inverse,
      },
    },
  },
  defaultProps: {
    variant: 'info',
    size: 'md',
  },
}
