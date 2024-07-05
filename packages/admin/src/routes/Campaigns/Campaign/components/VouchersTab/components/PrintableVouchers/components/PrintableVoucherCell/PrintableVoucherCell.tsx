import React from 'react'
import DOMPurify from 'dompurify'
import moment from 'moment'
import { HStack, Center, VStack, Text, Icon } from '@chakra-ui/react'
import {
  PRINTABLE_VOUCHERS_CONTENT_PADDING_Y,
  PRINTABLE_VOUCHERS_CONTENT_PADDING_X,
  VOUCHER_TYPES,
} from 'constants/vouchers'
import { theme } from 'theme'
import { BiTrash } from 'react-icons/bi'
import { colors } from 'theme/foundations/colors'
import PrintableVoucherCellContainer from '../PrintableVoucherCellContainer'
import PrintableVoucherCellHeader from '../PrintableVoucherCellHeader'
import PrintableVoucherTypeCornerLogo from '../PrintableVoucherTypeCornerLogo'

type PrintableVoucherCellProps = {
  voucherType: string
  campaignName?: string
  campaignExpiresAt?: string
  totalNumVouchers: number
  voucherNum: number
  voucher: {
    voucherValue: number
    qrCodeSvgString: string
  }
}

const PrintableVoucherCell = ({
  voucherType,
  campaignName,
  campaignExpiresAt,
  totalNumVouchers,
  voucherNum,
  voucher,
}: PrintableVoucherCellProps) => {
  const cellHeaderNameToUse = campaignName

  return (
    <PrintableVoucherCellContainer>
      <PrintableVoucherCellHeader
        voucherType={voucherType}
        headerName={cellHeaderNameToUse}
        totalNumVouchers={totalNumVouchers}
        voucherNum={voucherNum}
      />
      <HStack
        align={voucherType ? 'start' : 'end'}
        justify="space-between"
        paddingTop={voucherType ? '7px' : '18px'}
      >
        <Center
          position="relative"
          alignSelf={voucherType ? 'start' : 'end'}
          width={voucherType ? '120px' : '132px'}
          height={voucherType ? '120px' : '132px'}
          marginTop={voucherType ? '7px' : '0'}
          marginBottom={PRINTABLE_VOUCHERS_CONTENT_PADDING_Y}
        >
          <Center
            // Sanitize raw string to be converted to HTML to prevent XSS attacks.
            // eslint-disable-next-line react/no-danger
            sx={{
              svg: {
                width: '100%',
                height: '100%',
              },
            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(voucher.qrCodeSvgString, {
                USE_PROFILES: { svg: true },
              }),
            }}
          />
        </Center>
        <VStack align="end" justify="space-between" height="100%" spacing={0}>
          {!voucherType && (
            <Text
              position="relative"
              bottom="5px"
              paddingRight={PRINTABLE_VOUCHERS_CONTENT_PADDING_X}
              color={colors.neutral[700]}
              fontSize="9px"
              fontWeight={500}
              lineHeight="11px"
              letterSpacing="-0.006em"
            >
              {voucherNum} / {totalNumVouchers}
            </Text>
          )}
          <VStack
            align="end"
            width="100%"
            paddingBottom={
              !VOUCHER_TYPES[voucherType]?.logo ||
              !VOUCHER_TYPES[voucherType]?.isLargeLogoVisible
                ? PRINTABLE_VOUCHERS_CONTENT_PADDING_Y
                : '0'
            }
            spacing={0}
          >
            <HStack
              position="relative"
              bottom={voucherType ? '10px' : '0px'}
              align="center"
              justify="flex-end"
              paddingRight={PRINTABLE_VOUCHERS_CONTENT_PADDING_X}
              color={theme.colors.neutral[900]}
              spacing={0}
            >
              <Text
                position="relative"
                fontSize="24px"
                fontWeight={600}
                lineHeight="29px"
                letterSpacing="-0.02em"
              >
                $
              </Text>
              <Text
                position="relative"
                bottom="10px"
                fontSize="42px"
                fontWeight={600}
                lineHeight="51px"
                letterSpacing="-0.06em"
              >
                {voucher.voucherValue}
              </Text>
            </HStack>
            <Text
              position="relative"
              bottom={voucherType ? '12px' : '4px'}
              paddingRight={PRINTABLE_VOUCHERS_CONTENT_PADDING_X}
              color="black"
              fontSize="11px"
              fontWeight={500}
              lineHeight="13px"
              // Preserve spacing even when there is no expiry
              visibility={campaignExpiresAt ? 'visible' : 'hidden'}
            >
              Use by {moment(campaignExpiresAt).format('DD MMM YYYY')}
            </Text>
            <HStack
              position="relative"
              bottom={voucherType ? '4px' : '0px'}
              align="center"
              paddingTop="6px"
              color={theme.colors.neutral[700]}
              spacing="4px"
            >
              <Icon as={BiTrash} width="12px" height="12px" />
              <Text
                position="relative"
                bottom={voucherType ? '5px' : '4px'}
                paddingRight={PRINTABLE_VOUCHERS_CONTENT_PADDING_X}
                fontSize="8px"
                fontWeight={500}
                lineHeight="10px"
                letterSpacing="-0.006em"
              >
                Throw after use
              </Text>
            </HStack>
          </VStack>
          {!!VOUCHER_TYPES[voucherType]?.logo &&
            VOUCHER_TYPES[voucherType]?.isLargeLogoVisible && (
              <PrintableVoucherTypeCornerLogo
                logo={VOUCHER_TYPES[voucherType].logo}
                size="small"
              />
            )}
        </VStack>
      </HStack>
    </PrintableVoucherCellContainer>
  )
}

export default PrintableVoucherCell
