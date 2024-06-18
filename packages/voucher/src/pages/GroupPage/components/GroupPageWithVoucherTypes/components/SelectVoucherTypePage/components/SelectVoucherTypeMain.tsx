import _ from 'lodash'

import React, {useCallback} from 'react'
import {Flex, Image, HStack, Text, VStack} from '@chakra-ui/react'
import TransactionHistoryDrawerButton from 'pages/GroupPage/components/TransactionHistoryDrawerButton'
import VoucherTypeButton from './VoucherTypeButton'
import {useNavigateWithCurrentSearchParams} from 'helpers/navigate'
import {useTranslation} from 'react-i18next'
import {Voucher} from 'types/voucher'
import {
  getColorSchemeForVoucherType,
  getConfigForVoucherType,
} from 'helpers/vouchers'

type VoucherTypeWithUnusedAmount = {
  type: string
  unusedAmount: number
}

type SelectVoucherTypeMainProps = {
  onClickOpen: () => void
  vouchersGroupedByType: Record<string, Voucher[]>
}

const SelectVoucherTypeMain = ({
  onClickOpen,
  vouchersGroupedByType,
}: SelectVoucherTypeMainProps) => {
  const {t} = useTranslation('subheader')
  const navigateWithCurrentSearchParams = useNavigateWithCurrentSearchParams()
  const onClickVoucherType = useCallback(
    (voucherType: string) =>
      navigateWithCurrentSearchParams(`./${voucherType}/`),
    [navigateWithCurrentSearchParams],
  )
  // Sum up unused voucher value for each voucher type
  const voucherTypesWithUnusedAmount: VoucherTypeWithUnusedAmount[] = _(
    vouchersGroupedByType,
  )
    .toPairs()
    .map(([voucherType, vouchersOfType]) => {
      return {
        type: voucherType,
        unusedAmount: _.sumBy(vouchersOfType, (voucher) => {
          return voucher.state === 'unused' ? voucher.voucherValue : 0
        }),
      }
    })
    .orderBy(['type'], ['asc']) // Sort by ascending order. More explicit than sortBy comparator.
    .value()

  return (
    <Flex
      alignItems='flex-start'
      justifyContent='center'
      flexGrow={1}
      width='100vw'
      padding={0}
      borderTopRadius='16px'
      backgroundColor='primary.100'
    >
      <VStack
        align='stretch'
        width='100%'
        maxWidth='512px'
        padding='20px 24px'
        id='select-voucher-type-container'
        spacing='12px'
      >
        <HStack justify='space-between'>
          <Text textStyle='subhead3' color='neutral.700'>
            {t('tap_to_use')}
          </Text>
          <TransactionHistoryDrawerButton onClickHistoryButton={onClickOpen} />
        </HStack>
        <VStack align='stretch' spacing='12px'>
          {voucherTypesWithUnusedAmount.map((voucherObj) => {
            const voucherType = voucherObj.type
            const voucherTypeConfig = getConfigForVoucherType(voucherType)
            return (
              <VoucherTypeButton
                key={voucherType}
                amountLeft={voucherObj.unusedAmount}
                backgroundColor={`${getColorSchemeForVoucherType(
                  voucherType,
                )}.600`}
                id={voucherTypeConfig.id}
                image={
                  <Image
                    backgroundColor={`${getColorSchemeForVoucherType(
                      voucherType,
                    )}.600`}
                    src={voucherTypeConfig.src}
                  />
                }
                onClick={() => onClickVoucherType(voucherType)}
                type={voucherTypeConfig.text}
              />
            )
          })}
        </VStack>
      </VStack>
    </Flex>
  )
}

export default React.memo(SelectVoucherTypeMain)
