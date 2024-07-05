import React from 'react'
import { VStack, HStack, Text } from '@chakra-ui/react'

type VouchersStatsDefaultProps = {
  voucherStatsByDenomination: {
    denomination: number
    numVoided: number
    numUnused: number
    numRedeemed: number
  }[]
  colorScheme: string
  isGroupVoided: boolean
  totalValueRedeemed: number
  totalValueVoided: number
  totalValueUnused: number
}

const VouchersStatsDefault = ({
  voucherStatsByDenomination,
  colorScheme,
  isGroupVoided,
  totalValueRedeemed,
  totalValueVoided,
  totalValueUnused,
}: VouchersStatsDefaultProps) => {
  return (
    <VStack align="stretch" spacing={0}>
      {voucherStatsByDenomination.map(
        ({ denomination, numVoided, numRedeemed, numUnused }) => (
          <HStack
            key={denomination}
            background="neutral.100"
            borderStyle="solid"
            borderColor={`${colorScheme}.200`}
            borderTopWidth="1px"
            paddingX="56px"
            paddingY="12px"
            spacing="32px"
          >
            <HStack align="center" width="3.125rem" spacing="2px">
              <Text textStyle="caption2" color={`${colorScheme}.700`}>
                $
              </Text>
              <Text textStyle="h3" color={`${colorScheme}.700`}>
                {denomination}
              </Text>
            </HStack>
            <Text
              textStyle="body1"
              color={
                isGroupVoided ? `${colorScheme}.800` : `${colorScheme}.500`
              }
            >
              {numRedeemed} redeemed,{' '}
              {isGroupVoided
                ? `${numVoided} voided`
                : `${numUnused} not redeemed`}
            </Text>
          </HStack>
        )
      )}
      <HStack
        background={`${colorScheme}.200`}
        borderStyle="solid"
        borderColor={`${colorScheme}.200`}
        borderTopWidth="1px"
        paddingX="56px"
        paddingY="12px"
        spacing="32px"
      >
        <HStack align="center" width="3.125rem" spacing="2px">
          <Text textStyle="subhead3" color={`${colorScheme}.700`}>
            Total
          </Text>
        </HStack>
        <Text
          textStyle="body1"
          color={isGroupVoided ? `${colorScheme}.900` : `${colorScheme}.500`}
        >
          ${totalValueRedeemed} redeemed,{' '}
          {isGroupVoided
            ? `$${totalValueVoided} voided`
            : `$${totalValueUnused} not
    redeemed`}
        </Text>
      </HStack>
    </VStack>
  )
}

export default VouchersStatsDefault
