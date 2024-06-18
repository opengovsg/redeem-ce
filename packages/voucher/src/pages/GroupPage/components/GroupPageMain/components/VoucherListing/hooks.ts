import {getTextColorForColorScheme} from 'helpers/vouchers'
import _ from 'lodash'
import {colors, ThemeColorScheme} from 'theme/foundations/colors'
import {Voucher, VoucherColorScheme} from 'types/voucher'

type UseVoucherListingValueColorProps = {
  voucher: Voucher
  isSelected: boolean
  isLimitReached: boolean
  colorScheme?: VoucherColorScheme
}

export const useVoucherListingValueColor = ({
  voucher,
  isSelected,
  isLimitReached,
  colorScheme,
}: UseVoucherListingValueColorProps) => {
  if (isSelected) {
    return getTextColorForColorScheme(colorScheme)
  }
  if (voucher.state === 'voided') {
    return 'neutral.300'
  }
  if (voucher.state === 'redeemed' || isLimitReached) {
    return 'neutral.400'
  }
  return 'primary.700'
}

type UseVoucherListingBackgroundColorProps = {
  voucher: Voucher
  isSelected: boolean
  isLimitReached: boolean
  colorScheme?: string
}

export const useVoucherListingBackgroundColor = ({
  voucher,
  isSelected,
  isLimitReached,
  colorScheme,
}: UseVoucherListingBackgroundColorProps) => {
  // Has to be color hex insteado of token as it is used in string
  // interpolation
  if (isSelected) {
    // eslint-disable-next-line prefer-destructuring
    return !_.isUndefined(colorScheme)
      ? colors[colorScheme as ThemeColorScheme][500]
      : colors.primary[500]
  }
  if (voucher.state === 'voided') {
    // eslint-disable-next-line prefer-destructuring
    return colors.neutral[200]
  }
  if (voucher.state === 'redeemed' || (!isSelected && isLimitReached)) {
    // eslint-disable-next-line prefer-destructuring
    return colors.neutral[300]
  }
  return 'neutral.100'
}

export const useVoucherListingBorder = (): {
  borderWidth: string
  borderColor: string
} => {
  return {borderColor: colors.neutral[300], borderWidth: '1px'}
}

export const useVoucherListingHeight = ({
  finalHeight,
  borderWidth,
}: {
  finalHeight: string
  borderWidth?: string
}): string => {
  return `calc(${finalHeight} - 2 * ${borderWidth || '0px'})`
}
