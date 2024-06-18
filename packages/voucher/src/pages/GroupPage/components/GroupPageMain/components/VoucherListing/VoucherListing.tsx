import React from 'react'
import {Voucher, VoucherColorScheme} from 'types/voucher'
import {Box, Button, Flex, HStack, Text} from '@chakra-ui/react'
import RedeemedStampSmall from './components/RedeemedStampSmall'
import VoidStamp from './components/VoidStamp'
import {
  useVoucherListingBackgroundColor,
  useVoucherListingBorder,
  useVoucherListingHeight,
  useVoucherListingValueColor,
} from './hooks'
import VoucherListingCheckBox from './components/VoucherListingCheckBox'
import {VOUCHER_SIDE_MARGIN} from 'constants/spacing'

const VOUCHER_BORDER_RADIUS = '4px'

type VoucherProps = {
  voucher: Voucher
  onClick: () => void
  colorScheme?: VoucherColorScheme
  isSelected: boolean
  isLimitReached: boolean
}

const VoucherListing = ({
  voucher,
  onClick,
  colorScheme,
  isSelected,
  isLimitReached,
}: VoucherProps) => {
  // TODO: Consider use of useMultiStyleConfig
  const voucherValueColor = useVoucherListingValueColor({
    voucher,
    isSelected,
    isLimitReached,
    colorScheme,
  })

  const backgroundColor = useVoucherListingBackgroundColor({
    voucher,
    isSelected,
    isLimitReached,
    colorScheme,
  })

  const border = useVoucherListingBorder()

  // As border is implemented as drop-shadow, it is not included in height calculations. To compensate for it, we must subtract the
  // border width from the button height in order to keep the height consistent across different states.
  const height = {
    base: useVoucherListingHeight({
      finalHeight: '4rem',
      borderWidth: border?.borderWidth,
    }),
    sm: useVoucherListingHeight({
      finalHeight: '4.5rem',
      borderWidth: border?.borderWidth,
    }),
  }

  return (
    <Button
      sx={{WebkitTapHighlightColor: 'transparent'}}
      position='relative'
      zIndex={0}
      alignItems='stretch'
      flexShrink={0}
      width={`calc(50% - 2 * ${VOUCHER_SIDE_MARGIN})`}
      height='fit-content'
      margin={VOUCHER_SIDE_MARGIN}
      color='white'
      background={backgroundColor}
      border='1px solid'
      borderColor='neutral.300'
      // Important is to ensure that when the user focus on the button, the box shadow will not disappear
      // This is to prevent the override from app.tsx (GlobalStyles)
      boxShadow='0px 0px 10px 0px rgba(216, 222, 235, 0.50) !important'
      _disabled={{opacity: 1}}
      aria-checked={isSelected}
      id={`voucher-button_${voucher.id}`}
      isDisabled={voucher.state !== 'unused' || (!isSelected && isLimitReached)}
      onClick={onClick}
      type='button'
      variant='unstyled'
    >
      <HStack
        align='stretch'
        width='100%'
        height={height}
        background='none'
        spacing={0}
      >
        {voucher.state === 'redeemed' && <RedeemedStampSmall />}
        {voucher.state === 'voided' && <VoidStamp />}
        <Flex
          position='relative'
          flexGrow={1}
          flexShrink={0}
          flexBasis='84px'
          height='100%'
          backgroundSize='60% 60%'
          backgroundRepeat='no-repeat'
          borderLeftRadius={VOUCHER_BORDER_RADIUS}
        >
          <HStack
            align='center'
            justify='center'
            marginLeft='16px'
            spacing='0.125rem'
          >
            <Text textStyle='h5' color={voucherValueColor}>
              $
            </Text>
            <Text textStyle='display2' color={voucherValueColor}>
              {voucher.voucherValue}
            </Text>
          </HStack>
        </Flex>
        <Box
          position='relative'
          zIndex={1}
          alignSelf='center'
          // Each semi circle have a height of 5px. Each semi circle distance to this line is 3.5px.
          // Thus to total height to reduce is 2 * (5 + 3.5) = 17px
          height={`calc(100% - 17px)`}
          borderStyle='dashed'
          borderColor='neutral.300'
          borderLeftWidth='1px'
          // Even though there are some duplicate for before and after, would prefer to keep them separate instead
          // of having a common object for their styling. This is for clarity purposes.
          // before is for the semi circle below
          _before={{
            position: 'absolute',
            bottom: '-8.5px',
            content: '""',
            width: '11px',
            height: '5px',
            background: 'transparent',
            borderRadius: '5px 5px 0 0',
            right: '-5px',
            borderLeft: '1px solid',
            borderRight: '1px solid',
            borderTop: '1px solid',
            borderColor: 'neutral.300',
            borderStyle: 'dashed',
          }}
          // after is for the semi circle above
          _after={{
            position: 'absolute',
            top: '-8.5px',
            content: '""',
            width: '11px',
            height: '5px',
            background: 'transparent',
            borderRadius: '0 0 5px 5px',
            right: '-5px',
            borderLeft: '1px solid',
            borderRight: '1px solid',
            borderBottom: '1px solid',
            borderColor: 'neutral.300',
            borderStyle: 'dashed',
          }}
        />
        <Flex
          position='relative'
          alignItems='center'
          justifyContent='center'
          flexGrow={0}
          flexShrink={0}
          flexBasis='48px'
          height='100%'
          backgroundSize='60% 60%'
          backgroundRepeat='no-repeat'
          borderRightRadius={VOUCHER_BORDER_RADIUS}
          backgroundColor='transparent'
        >
          <VoucherListingCheckBox
            voucherState={voucher.state}
            isLimitReached={isLimitReached}
            isSelected={isSelected}
            colorScheme={colorScheme}
          />
        </Flex>
      </HStack>
    </Button>
  )
}

export default React.memo(VoucherListing)
