import React from 'react'
import { Box, Icon } from '@chakra-ui/react'

type PrintableVoucherTypeCornerLogoProps = {
  logo: React.FunctionComponent
  size: 'large' | 'small'
}

const PrintableVoucherTypeCornerLogo = ({
  logo,
  size,
}: PrintableVoucherTypeCornerLogoProps) => {
  let visibleWidth: string
  let visibleHeight: string
  let circleSize: string
  let iconSize: string
  let iconMargin: string
  // Type checking ensures it is exhaustive
  // eslint-disable-next-line default-case
  switch (size) {
    case 'large':
      visibleWidth = '72px'
      visibleHeight = '67px'
      circleSize = '82px'
      iconSize = '44px'
      iconMargin = '18px'
      break
    case 'small':
      visibleWidth = '63px'
      visibleHeight = '58px'
      circleSize = '76px'
      iconSize = '38px'
      iconMargin = '16px'
      break
  }
  return (
    <Box
      alignSelf="end"
      overflow="hidden"
      width={visibleWidth}
      height={visibleHeight}
    >
      <Box
        width={circleSize}
        height={circleSize}
        borderRadius={`calc(${circleSize} / 2)`}
        backgroundColor="black"
      >
        <Box
          position="relative"
          top={`calc(${iconSize} / 1.7)`}
          left={`calc(${iconSize} / 1.7)`}
        >
          <Icon
            as={logo}
            position="relative"
            right={`calc(${iconSize} / 2)`}
            bottom={`calc(${iconSize} / 2)`}
            width={iconSize}
            height={iconSize}
            marginTop={iconMargin}
            marginLeft={iconMargin}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default PrintableVoucherTypeCornerLogo
