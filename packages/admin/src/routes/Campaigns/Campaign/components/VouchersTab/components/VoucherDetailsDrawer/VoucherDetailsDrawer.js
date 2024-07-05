import React from 'react'
import PropTypes from 'prop-types'

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  BiChevronDown,
  BiChevronRight,
  BiEditAlt,
  BiMailSend,
  BiPrinter,
} from 'react-icons/bi'
import IconButton from 'components/IconButton'
import _ from 'lodash'
import {
  getAddressFromGroup,
  isVoided,
  removeContactNumberPrefix,
} from 'helpers/utils'
import moment from 'moment'
import MaskedOnMonitoring from 'components/MaskedOnMonitoring'
import MaskedIdDisplay from 'components/MaskedIdDisplay'
import { getVouchersStatsByTypeAndDenomination } from 'helpers/vouchers'
import Badge from 'components/Badge'
import VoucherEventLabel from './components/VoucherEventLabel'
import VoucherEventDetails from './components/VoucherEventDetails'
import VouchersStatsDefault from './components/VouchersStatsDefault'
import VouchersStatsByType from './components/VouchersStatsByType'

// TODO: Further split into child components and convert to ts
function VoucherDetailsDrawer({
  isOpen,
  onClose,
  selectedGroup,
  onPrintUnusedVouchers,
  isPrintLoading,
  onSendClick,
  isSending,
  onEditClick,
  groupedVoucherEvents,
  isLoadingGroupedVoucherEvents,
  hasPermissionToSendVouchers,
  hasPermissionToPrintVouchers,
  hasPermissionToUpdateVouchers,
}) {
  const vouchers = selectedGroup?.vouchers || []
  const isGroupVoided = isVoided(selectedGroup)
  const colorScheme = isGroupVoided ? 'neutral' : 'primary'
  const voucherStatsByTypeAndDenomination =
    getVouchersStatsByTypeAndDenomination(vouchers)
  const hasVoucherTypes = _.keys(voucherStatsByTypeAndDenomination).some(
    (voucherType) => !!voucherType
  )

  const canSend = hasPermissionToSendVouchers && !isGroupVoided
  const canPrint = hasPermissionToPrintVouchers && !isGroupVoided
  const canUpdate = hasPermissionToUpdateVouchers && !isGroupVoided

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent minWidth="44.5rem">
        <DrawerCloseButton top="52px" right="52px" />
        <DrawerHeader paddingX="56px">
          <Flex alignItems="flex-start" justifyContent="space-between">
            <VStack align="start" spacing="8px">
              <HStack spacing="8px">
                <Badge
                  color={`${colorScheme}.700`}
                  backgroundColor={`${colorScheme}.200`}
                >
                  {selectedGroup?.id}
                </Badge>
                {isGroupVoided && (
                  <Badge color="white" backgroundColor={`${colorScheme}.700`}>
                    Void
                  </Badge>
                )}
              </HStack>
              <HStack>
                <Text color={`${colorScheme}.700`}>
                  {selectedGroup?.name || '-'}
                </Text>
                {canUpdate && (
                  <IconButton
                    colorScheme={colorScheme}
                    variant="ghost"
                    icon={BiEditAlt}
                    onClick={onEditClick}
                    isDisabled={isGroupVoided}
                  />
                )}
              </HStack>
            </VStack>
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <VStack align="start" spacing="48px">
            <HStack align="start" paddingX="56px" spacing="48px">
              <Stat flexBasis="16rem" maxWidth="16rem" size="text">
                <StatLabel>Address</StatLabel>
                <StatNumber height="3rem" noOfLines={2}>
                  {getAddressFromGroup(selectedGroup) || '-'}
                </StatNumber>
              </Stat>
              <Stat flexBasis="6.75rem" maxWidth="6.75rem" size="text">
                <StatLabel>Identifier</StatLabel>
                <StatNumber>
                  <MaskedIdDisplay
                    recipientId={selectedGroup?.recipientId}
                    fallbackElement="-"
                  />
                </StatNumber>
              </Stat>
              <Stat size="text">
                <StatLabel>Mobile number</StatLabel>
                <MaskedOnMonitoring>
                  <StatNumber>
                    {removeContactNumberPrefix(selectedGroup?.contactNumber) ||
                      '-'}
                  </StatNumber>
                </MaskedOnMonitoring>
              </Stat>
            </HStack>
            <HStack paddingX="56px" spacing="16px">
              {canPrint && (
                <Button
                  colorScheme={colorScheme}
                  isDisabled={isGroupVoided}
                  isLoading={isPrintLoading}
                  leftIcon={
                    <Icon as={BiPrinter} width="1.5rem" height="1.5rem" />
                  }
                  onClick={() => {
                    if (selectedGroup) {
                      onPrintUnusedVouchers(
                        selectedGroup.name,
                        selectedGroup.id
                      )
                    }
                  }}
                  variant="outline"
                >
                  Print vouchers
                </Button>
              )}

              {canSend && (
                <Button
                  colorScheme={colorScheme}
                  isDisabled={!selectedGroup?.contactNumber || isGroupVoided}
                  isLoading={isSending}
                  leftIcon={
                    <Icon as={BiMailSend} width="1.5rem" height="1.5rem" />
                  }
                  onClick={onSendClick}
                  variant="outline"
                >
                  Send vouchers by SMS
                </Button>
              )}
            </HStack>
            <VStack
              align="stretch"
              width="100%"
              spacing={hasVoucherTypes ? '32px' : '24px'}
            >
              <Text
                textStyle="h5"
                marginLeft="56px"
                color={`${colorScheme}.700`}
              >
                Remaining vouchers
              </Text>
              {/* Show vouchers stats as a whole if no vouchers have type */}
              {!hasVoucherTypes && (
                <VouchersStatsDefault
                  voucherStatsByDenomination={
                    voucherStatsByTypeAndDenomination['']?.denominations || []
                  }
                  colorScheme={colorScheme}
                  isGroupVoided={isGroupVoided}
                  totalValueRedeemed={
                    voucherStatsByTypeAndDenomination['']?.totalValueRedeemed ||
                    0
                  }
                  totalValueVoided={
                    voucherStatsByTypeAndDenomination['']?.totalValueVoided || 0
                  }
                  totalValueUnused={
                    voucherStatsByTypeAndDenomination['']?.totalValueUnused || 0
                  }
                />
              )}
              {/* Show vouchers by type if any vouchers have type */}
              {hasVoucherTypes && (
                <VouchersStatsByType
                  voucherStatsByTypeAndDenomination={
                    voucherStatsByTypeAndDenomination
                  }
                  colorScheme={colorScheme}
                  isGroupVoided={isGroupVoided}
                />
              )}
            </VStack>
            <VStack align="stretch" width="100%" spacing="24px">
              <Text textStyle="h5" color={`${colorScheme}.700`} paddingX="56px">
                Timeline
              </Text>
              {!!groupedVoucherEvents && (
                <Accordion width="100%" allowMultiple allowToggle>
                  {groupedVoucherEvents?.map((event) => (
                    <AccordionItem key={event.id} width="100%">
                      {({ isExpanded }) => (
                        <>
                          <AccordionButton
                            _hover={{ background: `${colorScheme}.100` }}
                            _focus={{ boxShadow: 'none' }}
                            _expanded={{ background: `${colorScheme}.100` }}
                            paddingX="56px"
                            paddingY="18px"
                          >
                            <Flex justifyContent="space-between" width="100%">
                              <HStack flexGrow={1} spacing="16px">
                                <Icon
                                  as={
                                    isExpanded ? BiChevronDown : BiChevronRight
                                  }
                                  width="1.5rem"
                                  height="1.5rem"
                                />
                                <Box
                                  flexWrap="wrap"
                                  display="inline"
                                  width="100%"
                                  whiteSpace="pre-wrap"
                                >
                                  <VoucherEventLabel
                                    event={event}
                                    group={selectedGroup}
                                  />
                                </Box>
                              </HStack>
                              <Text
                                textStyle="body1"
                                flexShrink={0}
                                flexBasis="11rem"
                                marginLeft="1rem"
                                color="neutral.700"
                                textAlign="end"
                              >
                                {moment(event.createdAt).format(
                                  'Do MMM YY, HH:mm:ss'
                                )}
                              </Text>
                            </Flex>
                          </AccordionButton>
                          <AccordionPanel
                            paddingRight="56px"
                            paddingLeft="96px"
                            background={`${colorScheme}.100`}
                          >
                            <VoucherEventDetails event={event} />
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
              {!groupedVoucherEvents?.length &&
                isLoadingGroupedVoucherEvents && <Spinner />}
            </VStack>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

VoucherDetailsDrawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectedGroup: PropTypes.objectOf(PropTypes.any),
  onPrintUnusedVouchers: PropTypes.func.isRequired,
  isPrintLoading: PropTypes.bool,
  onSendClick: PropTypes.func.isRequired,
  isSending: PropTypes.bool,
  onEditClick: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  groupedVoucherEvents: PropTypes.arrayOf(PropTypes.any),
  isLoadingGroupedVoucherEvents: PropTypes.bool,
  hasPermissionToSendVouchers: PropTypes.bool,
  hasPermissionToPrintVouchers: PropTypes.bool,
  hasPermissionToUpdateVouchers: PropTypes.bool,
}

export default React.memo(VoucherDetailsDrawer)
