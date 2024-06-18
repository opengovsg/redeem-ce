import _ from 'lodash'
import {Voucher} from 'types/voucher'
import {ReactComponent as BxsCheckCircle} from 'images/bxs-check-circle.svg'
import {ReactComponent as BxsCheckCircleBlack} from 'images/bxs-check-circle-black.svg'
import {ReactComponent as BxsCheckCircleDisabled} from 'images/bxs-check-circle-disabled.svg'
import {Icon} from '@chakra-ui/react'
import {BiCircle} from 'react-icons/bi'

const YELLOW = 'yellow'

type VoucherListingCheckBoxProps = {
  voucherState: Voucher['state']
  isSelected: boolean
  isLimitReached: boolean
  colorScheme?: string
}

const VoucherListingCheckBox = ({
  voucherState,
  isSelected,
  isLimitReached,
  colorScheme,
}: VoucherListingCheckBoxProps) => {
  if (voucherState === 'redeemed') {
    return (
      <Icon as={BxsCheckCircleDisabled} boxSize={{base: '28px', sm: '32px'}} />
    )
  }
  if (voucherState === 'voided') {
    return (
      <Icon
        as={BiCircle}
        boxSize={{base: '28px', sm: '32px'}}
        color='neutral.300'
      />
    )
  }
  if (isSelected) {
    return _.isEqual(colorScheme, YELLOW) ? (
      <Icon as={BxsCheckCircleBlack} boxSize={{base: '28px', sm: '32px'}} />
    ) : (
      <Icon as={BxsCheckCircle} boxSize={{base: '28px', sm: '32px'}} />
    )
  }
  if (isLimitReached) {
    return (
      <Icon
        as={BiCircle}
        boxSize={{base: '28px', sm: '32px'}}
        color='neutral.500'
      />
    )
  }

  return (
    <Icon
      as={BiCircle}
      boxSize={{base: '28px', sm: '32px'}}
      color='primary.700'
    />
  )
}

export default VoucherListingCheckBox
