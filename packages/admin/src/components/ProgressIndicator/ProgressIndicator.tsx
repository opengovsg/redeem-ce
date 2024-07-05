import React from 'react'
import _ from 'lodash'
import { Box, HStack } from '@chakra-ui/react'

type ProgressIndicatorProps = {
  activeIndicator: number
  totalNumIndicators: number
}

const ProgressIndicator = ({
  activeIndicator,
  totalNumIndicators,
}: ProgressIndicatorProps): JSX.Element => {
  return (
    <HStack>
      {_.range(totalNumIndicators).map((index) => (
        <Box
          key={`progress-indicator-${index}`}
          width={index === activeIndicator ? '24px' : '8px'}
          height="8px"
          background={index === activeIndicator ? 'neutral.700' : 'neutral.400'}
          borderRadius="4px"
        />
      ))}
    </HStack>
  )
}

export default ProgressIndicator
