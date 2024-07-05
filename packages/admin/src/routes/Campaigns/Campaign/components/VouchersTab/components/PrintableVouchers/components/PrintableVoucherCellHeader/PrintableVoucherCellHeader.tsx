import React from 'react'
import { Box, HStack, Text, Icon } from '@chakra-ui/react'
import {
  PRINTABLE_VOUCHERS_CONTENT_PADDING_X,
  VOUCHER_TYPES,
} from 'constants/vouchers'
import { getLabelForVoucherType } from 'helpers/vouchers'
import { colors } from 'theme/foundations/colors'

type PrintableVoucherCellHeaderProps = {
  headerName?: string
  voucherType: string
  totalNumVouchers?: number
  voucherNum?: number
}

const PrintableVoucherCellHeader = ({
  headerName,
  voucherType,
  totalNumVouchers,
  voucherNum,
}: PrintableVoucherCellHeaderProps) => {
  return (
    <>
      {!!voucherType && (
        <HStack
          justify="space-between"
          paddingRight={PRINTABLE_VOUCHERS_CONTENT_PADDING_X}
          paddingBottom="8px"
        >
          <Text
            position="relative"
            bottom="6px"
            color="black"
            fontSize="10px"
            fontWeight={700}
            lineHeight="14px"
            textTransform="uppercase"
            opacity={0.7}
          >
            {headerName}
          </Text>

          {!!voucherNum && !!totalNumVouchers && (
            <Text
              position="relative"
              bottom="5px"
              color={colors.neutral[700]}
              fontSize="9px"
              fontWeight={500}
              lineHeight="11px"
              textTransform="uppercase"
            >
              {voucherNum} / {totalNumVouchers}
            </Text>
          )}
        </HStack>
      )}
      <Box width="100%" paddingRight={PRINTABLE_VOUCHERS_CONTENT_PADDING_X}>
        <HStack
          justify="space-between"
          width="100%"
          background={voucherType ? '#000000B3' : 'black'}
          borderRadius="10px"
          paddingX="12px"
          paddingY="6px"
        >
          <Text
            position="relative"
            bottom="6px"
            color="white"
            fontSize="11px"
            fontWeight={800}
            lineHeight="14px"
            letterSpacing="0.02em"
            textTransform="uppercase"
            textOverflow="ellipsis"
          >
            {getLabelForVoucherType(voucherType) || headerName}
          </Text>
          {!!VOUCHER_TYPES[voucherType]?.logo && (
            <Icon
              as={VOUCHER_TYPES[voucherType].logo}
              position="relative"
              right="8px"
              overflow="visible"
              width="14px"
              height="fit-content"
            />
          )}
        </HStack>
      </Box>
    </>
  )
}

export default PrintableVoucherCellHeader
