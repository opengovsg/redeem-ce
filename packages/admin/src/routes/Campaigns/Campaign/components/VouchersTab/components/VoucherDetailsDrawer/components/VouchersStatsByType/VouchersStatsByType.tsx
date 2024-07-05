import React from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react'
import _ from 'lodash'
import { BiChevronDown, BiChevronRight } from 'react-icons/bi'
import { getLabelForVoucherType } from 'helpers/vouchers'
import { VouchersStatsByTypeAndDenomination } from 'helpers/types'

type VouchersStatsByTypeProps = {
  voucherStatsByTypeAndDenomination: VouchersStatsByTypeAndDenomination
  colorScheme: string
  isGroupVoided: boolean
}

const VouchersStatsByType = ({
  voucherStatsByTypeAndDenomination,
  colorScheme,
  isGroupVoided,
}: VouchersStatsByTypeProps) => {
  return (
    <Accordion width="100%" allowMultiple allowToggle>
      {_.toPairs(voucherStatsByTypeAndDenomination).map(
        ([
          voucherType,
          {
            totalValueRedeemed,
            totalValueVoided,
            totalValueUnused,
            denominations,
          },
        ]) => (
          <AccordionItem key={voucherType}>
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  background="neutral.100"
                  _hover={{ background: `${colorScheme}.100` }}
                  _focus={{ boxShadow: 'none' }}
                  _expanded={{ background: `${colorScheme}.100` }}
                  paddingX="56px"
                  paddingY="18px"
                >
                  <Flex justifyContent="space-between" width="100%">
                    <HStack flexGrow={1} spacing="16px">
                      <Icon
                        as={isExpanded ? BiChevronDown : BiChevronRight}
                        width="1.5rem"
                        height="1.5rem"
                      />
                      <Text
                        textStyle="h5"
                        width="11.5rem"
                        color="neutral.900"
                        whiteSpace="pre-wrap"
                      >
                        {getLabelForVoucherType(voucherType)}
                      </Text>
                      <Text
                        paddingLeft="16px"
                        color={
                          isGroupVoided
                            ? `${colorScheme}.900`
                            : `${colorScheme}.500`
                        }
                      >
                        <Text as="span" textStyle="subhead1">
                          ${totalValueRedeemed}
                        </Text>
                        <Text as="span" textStyle="body1">
                          {` redeemed, `}
                        </Text>
                        <Text as="span" textStyle="subhead1">
                          ${isGroupVoided ? totalValueVoided : totalValueUnused}
                        </Text>
                        <Text as="span" textStyle="body1">
                          {isGroupVoided ? ` voided` : ` not redeemed`}
                        </Text>
                      </Text>
                    </HStack>
                  </Flex>
                </AccordionButton>
                <AccordionPanel
                  paddingTop="0px"
                  paddingRight="56px"
                  paddingLeft="96px"
                  background={`${colorScheme}.100`}
                >
                  <VStack align="start" color="neutral.700" spacing="6px">
                    {denominations.map(
                      ({ denomination, numRedeemed, numUnused, numVoided }) => (
                        <HStack key={denomination} spacing="88px">
                          <Text width="7.875rem">
                            <Text
                              as="span"
                              textStyle="body2"
                            >{`Denomination `}</Text>
                            <Text as="span" textStyle="subhead1">
                              ${denomination}
                            </Text>
                          </Text>
                          <Text textStyle="body2">
                            {numRedeemed} redeemed,{' '}
                            {isGroupVoided
                              ? `${numVoided} voided`
                              : `${numUnused} not redeemed`}
                          </Text>
                        </HStack>
                      )
                    )}
                  </VStack>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        )
      )}
    </Accordion>
  )
}

export default VouchersStatsByType
