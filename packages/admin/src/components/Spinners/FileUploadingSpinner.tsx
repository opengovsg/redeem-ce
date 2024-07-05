import React from 'react'
import range from 'lodash/range'
import { Box, keyframes } from '@chakra-ui/react'

type SpinnerProps = {
  color?: string
} & React.HTMLAttributes<HTMLDivElement>

const circleAnimation = keyframes`
  from { opacity: 1; }
  to { opacity: 0.25; }
`

const FileUploadingSpinner = ({ color = '#2C2E34' }: SpinnerProps) => {
  const opacityAnimation = `${circleAnimation} infinite 1s linear`
  const circles = [...range(8)].map((i) => {
    return (
      <Box
        key={i}
        as="div"
        position="absolute"
        top="calc(16px - 3.5px)"
        left="calc(16px - 1.5px) "
        display="block"
        width="3px"
        height="7px"
        animation={opacityAnimation}
        transform={`rotate(${((i + 1) * 45) % 360}deg) translateY(-10px)`}
        style={{
          background: color,
          animationDelay: `${(-1 + 0.125 * i) % 1}s`,
        }}
      />
    )
  })

  return (
    <Box position="relative" display="inline-block" width="32px" height="32px">
      {circles}
    </Box>
  )
}

export default FileUploadingSpinner
