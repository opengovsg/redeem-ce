/* eslint-disable react/jsx-props-no-spreading */
// react-table utilizes prop spreading

import React from 'react'
import _ from 'lodash'
import { VoucherType } from 'services/RedeemApi/types'

import {
  BiDotsHorizontalRounded,
  BiEditAlt,
  // BiEditAlt,
  BiPrinter,
  BiSend,
  BiShow,
} from 'react-icons/bi'

import {
  Box,
  Center,
  Tr,
  Td,
  Text,
  Icon,
  Flex,
  Tooltip,
} from '@chakra-ui/react'
import IconButton from 'components/IconButton'
import { TABLE_CONFIG } from '../../constants'

type VoucherRowProps = {
  groupedVoucher: VoucherType
  config: typeof TABLE_CONFIG
  isPrintLoading: boolean
  isSending: boolean
  canSend: boolean
  canPrint: boolean
  canUpdate: boolean
  onSendClick: () => void
  onPrintClick: () => void
  onSelectGroup: (group: VoucherType) => void
  onEditClick: () => void
}

function VoucherRow({
  groupedVoucher,
  config,
  isPrintLoading,
  isSending,
  canSend,
  canPrint,
  canUpdate,
  onSendClick,
  onPrintClick,
  onSelectGroup,
  onEditClick,
}: VoucherRowProps) {
  return (
    <Tr
      _hover={{
        background: 'primary.100',
      }}
      role="group"
    >
      {_.map(config, (col) => (
        <Td
          key={col.key}
          _groupHover={{
            display: col.hideOnHover ? 'none' : 'table-cell',
          }}
        >
          <Box width={col.width}>
            <Text as="div" textStyle="subhead2" color="neutral.900">
              {col.headerFn(groupedVoucher)}
            </Text>
            <Text as="div" textStyle="body2" color="neutral.700">
              {col.bodyFn(groupedVoucher)}
            </Text>
          </Box>
        </Td>
      ))}
      <Td
        display="none"
        padding="16px 32px"
        _groupHover={{
          display: 'table-cell',
        }}
        colSpan={2}
      >
        {/* Hack to ensure it doesn't cause table cell size to change */}
        <Flex width="1px">
          {canPrint && (
            <Tooltip hasArrow label="Print voucher" placement="top">
              <IconButton
                aria-label="voucher row print voucher"
                key="print"
                variant="outline"
                colorScheme="primary"
                onClick={onPrintClick}
                isLoading={isPrintLoading}
                icon={BiPrinter}
              />
            </Tooltip>
          )}
          {canSend && (
            <Tooltip hasArrow label="Send vouchers by SMS" placement="top">
              <IconButton
                aria-label="voucher row send voucher"
                key="send"
                variant="outline"
                colorScheme="primary"
                marginLeft="8px"
                onClick={() => {
                  onSendClick()
                }}
                isDisabled={!groupedVoucher.contactNumber}
                isLoading={isSending}
                icon={BiSend}
              />
            </Tooltip>
          )}

          {canUpdate && (
            <Tooltip hasArrow label="Edit details" placement="top">
              <IconButton
                aria-label="voucher row edit details"
                key="edit"
                variant="outline"
                marginLeft="8px"
                colorScheme="primary"
                onClick={onEditClick}
                icon={BiEditAlt}
              />
            </Tooltip>
          )}
          <Tooltip hasArrow label="View more" placement="top">
            <IconButton
              aria-label="voucher row more details"
              key="more-info"
              variant="outline"
              colorScheme="primary"
              marginLeft="8px"
              icon={BiShow}
              data-dd-action-name="View voucher details button"
              onClick={() => onSelectGroup(groupedVoucher)}
            />
          </Tooltip>
        </Flex>
      </Td>
      <Td
        _groupHover={{
          display: 'none',
        }}
      >
        <Center padding="8px">
          <Icon as={BiDotsHorizontalRounded} width="1.5rem" height="1.5rem" />
        </Center>
      </Td>
    </Tr>
  )
}

export default React.memo(VoucherRow)
