import {ComponentStyleConfig} from '@chakra-ui/react'

export const Progress: ComponentStyleConfig = {
  baseStyle: (props) => ({
    filledTrack: {
      bgColor: `${props.colorScheme}.300`,
    },
    track: {
      bgColor: 'neutral.200',
    },
  }),
}
