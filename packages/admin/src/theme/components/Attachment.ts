import { ComponentStyleConfig } from '@chakra-ui/react'
import { textStyles } from 'theme/textStyles'

import attachmentCustomBorder from '../../img/attachment-custom-border.svg'
import attachmentCustomBorderWarning from '../../img/attachment-custom-border-warning.svg'

// Default parts.
const parts = [
  'container',
  'dropzone',
  'icon',
  'fileInfoContainer',
  'fileInfo',
  'fileInfoDescription',
  'fileInfoImage',
]

const getOutlineColours = () => {
  return {
    dropzone: {
      borderColor: 'neutral.700',
      bg: 'neutral.100',
      _hover: {
        bg: 'primary.100',
      },
      _active: {
        bg: 'neutral.200',
      },
    },
  }
}

export const Attachment: ComponentStyleConfig = {
  parts,
  sizes: {
    md: (props) => ({
      icon: {
        fontSize: '3.5rem',
      },
      dropzone: {
        px: '3rem',
        py: '4rem',
        ...textStyles.body1,
      },
      fileInfoContainer: {
        maxHeight: props.imagePreview === 'small' ? '4.5rem' : undefined,
        flexDir: props.imagePreview === 'large' ? 'column' : 'row',
      },
      fileInfo: {
        py: '0.875rem',
        px: '1rem',
      },
      fileInfoImage: {
        p: '0.25rem',
        maxW: props.imagePreview === 'large' ? '100%' : '6rem',
        objectFit: 'contain',
      },
    }),
  },
  baseStyle: {
    dropzone: {
      transitionProperty: 'common',
      transitionDuration: 'normal',
    },
    fileInfoContainer: {
      borderRadius: '4px',
      border: '1px solid',
      borderColor: '#EDEDED',
      bg: '#F6F7FA',
      color: '#454953',
      _disabled: {
        bg: '#F6F7FA',
        borderColor: '#EDEDED',
        cursor: 'initial',
        color: '#48494B',
      },
    },
    fileInfo: {
      display: 'inline-flex',
      justifyContent: 'space-between',
      flex: 1,
    },
    fileInfoDescription: {
      color: '#666C7A',
      _disabled: {
        color: '#48494B',
      },
      ...textStyles.caption1,
    },
    fileInfoImage: {
      borderRight: '1px solid',
      borderColor: 'inherit',
      bg: 'white',
    },
  },
  variants: {
    outline: () => {
      const colorProps = getOutlineColours()

      return {
        dropzone: {
          ...colorProps.dropzone,
          color: '#454953',
          display: 'flex',
          flexDir: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          borderRadius: '4px',
          outline: 'none',
          _invalid: {
            // Remove extra 1px of outline.
            boxShadow: 'none',
            _before: {
              content: '""',
              position: 'absolute',
              top: '-1px',
              right: '-1px',
              bottom: '-1px',
              left: '-1px',
              backgroundImage: attachmentCustomBorderWarning,
              borderRadius: '4px',
            },
          },
          _focus: {
            zIndex: 1,
            borderStyle: 'solid',
          },
          _disabled: {
            bg: '#EDEDED',
            color: '#A0A4AD',
            cursor: 'not-allowed',
            opacity: 1,
            _hover: {
              bg: '#EDEDED',
            },
            _active: {
              bg: '#EDEDED',
            },
          },
          _before: {
            content: '""',
            position: 'absolute',
            top: '-1px',
            right: '-1px',
            bottom: '-1px',
            left: '-1px',
            backgroundImage: attachmentCustomBorder,
            borderRadius: '4px',
          },
        },
      }
    },
  },
  defaultProps: {
    variant: 'outline',
    colorScheme: 'main',
    size: 'md',
    errorBorderColor: '#c03434',
  },
}
