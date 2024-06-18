import React from 'react'
import {Box, Image} from '@chakra-ui/react'
import {VoucherColorScheme} from 'types/voucher'
import redeemLogoBrandmark from 'images/redeem-logo-brandmark.svg'
import {colors} from 'theme/foundations/colors'

type RedemptionPageBackgroundProps = {
  colorScheme: VoucherColorScheme
}

const RedemptionPageBackground = ({
  colorScheme,
}: RedemptionPageBackgroundProps) => {
  return (
    <Box
      position='absolute'
      zIndex='base'
      top={0}
      alignSelf='stretch'
      width='100%'
      maxWidth='512px'
      height='300px'
    >
      <Image
        position='absolute'
        zIndex='base'
        top='-32px'
        right='-40px'
        width='190px'
        opacity={0.2}
        transform='rotate(-15deg)'
        mixBlendMode='multiply'
        src={redeemLogoBrandmark}
      />
      <Box
        position='absolute'
        zIndex={1}
        width='100%'
        height='100%'
        background={`linear-gradient(109deg, ${colors[colorScheme][500]} 33.32%, #0000 86.07%)`}
      />
    </Box>
  )
}

export default React.memo(RedemptionPageBackground)
