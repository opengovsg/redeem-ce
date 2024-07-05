import React from 'react'
import { HStack, Text } from '@chakra-ui/react'
import {
  PRINTABLE_VOUCHERS_CONTENT_PADDING_X,
  VOUCHER_TYPES,
} from 'constants/vouchers'
import moment from 'moment'
import PrintableVoucherCellContainer from '../PrintableVoucherCellContainer/PrintableVoucherCellContainer'
import PrintableVoucherCellHeader from '../PrintableVoucherCellHeader'
import PrintableVoucherTypeCornerLogo from '../PrintableVoucherTypeCornerLogo'

type PrintableVouchersInfoCellProps = {
  voucherType: string
  campaignName?: string
  campaignExpiresAt?: string
  name?: string
}

const PrintableVouchersInfoCell = ({
  voucherType,
  campaignName,
  campaignExpiresAt,
  name,
}: PrintableVouchersInfoCellProps) => {
  return (
    <PrintableVoucherCellContainer backgroundColor="#00000021">
      <PrintableVoucherCellHeader
        voucherType={voucherType}
        headerName={campaignName}
      />
      <Text
        flexShrink={0}
        overflow="hidden"
        // Extra 12px because otherwise the html2canvas renderer
        // cuts off the text at the bottom
        height="100px"
        paddingRight={PRINTABLE_VOUCHERS_CONTENT_PADDING_X}
        color="black"
        fontSize="24px"
        fontWeight={700}
        lineHeight="29px"
        letterSpacing="-0.022em"
        // Preserve spacing even when there is no expiry
        visibility={name ? 'visible' : 'hidden'}
        textOverflow="ellipsis"
      >
        {name}&apos;s vouchers
      </Text>
      {/* Relative positioning to allow logo to overlap into name label */}
      <HStack
        position="relative"
        bottom="20px"
        justify="space-between"
        width="100%"
        height="67px"
      >
        <Text
          position="relative"
          color="#000000B3"
          fontSize="11px"
          fontWeight={500}
          letterSpacing="-0.03em"
          textDecoration="underline"
          // Preserve spacing even when there is no expiry
          visibility={campaignExpiresAt ? 'visible' : 'hidden'}
          // TODO: CHECK IF BREAKING fontHeight="13px"
        >
          Use by {moment(campaignExpiresAt).format('DD MMM YYYY')}
        </Text>
        {!!VOUCHER_TYPES[voucherType]?.logo &&
          VOUCHER_TYPES[voucherType]?.isLargeLogoVisible && (
            <PrintableVoucherTypeCornerLogo
              logo={VOUCHER_TYPES[voucherType].logo}
              size="large"
            />
          )}
      </HStack>
    </PrintableVoucherCellContainer>
  )
}

export default PrintableVouchersInfoCell
