import { ComponentStyleConfig } from '@chakra-ui/react'

// currently hardcoded since no other component has this
export const Progress: ComponentStyleConfig = {
  baseStyle: {
    filledTrack: {
      bgColor: 'primary.400',
    },
    track: {
      bgColor: 'neutral.300',
    },
  },
}
