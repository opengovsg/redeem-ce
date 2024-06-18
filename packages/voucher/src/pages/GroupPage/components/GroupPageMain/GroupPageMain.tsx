import React, {useMemo} from 'react'
import _ from 'lodash'
import type {Voucher, VoucherColorScheme} from 'types/voucher'
import VoucherListing from './components/VoucherListing'
import {Center, Flex, HStack, Text, VStack} from '@chakra-ui/react'
import {useTranslation} from 'react-i18next'
import {VOUCHER_SIDE_MARGIN} from 'constants/spacing'
import ViewTermsAndConditionsText from 'components/ViewTermsAndConditionsText'
import TransactionHistoryDrawerButton from '../TransactionHistoryDrawerButton'

type GroupPageMainProps = {
  vouchersToRender: Voucher[]
  getIsVoucherSelected: (voucher: Voucher) => boolean
  onClickVoucher: (voucher: Voucher) => void
  onClickHistory?: () => void
  colorScheme?: VoucherColorScheme
  isLimitReached: boolean
  isScrollable: boolean
  amountLeft: number
  campaignAdvisoryUrl?: string | null
  campaignTncUrl?: string | null
}

type VoucherWithOnClickHandler = Voucher & {
  onClickHandler: () => void
}

// TODO: Refactor isScrollable away from DefaultSelectVouchersPage
// and VoucherTypeSelectVouchersPage
function GroupPageMain({
  vouchersToRender,
  getIsVoucherSelected,
  onClickVoucher,
  onClickHistory,
  colorScheme,
  isLimitReached,
  isScrollable,
  amountLeft,
  campaignTncUrl,
}: GroupPageMainProps) {
  const {t} = useTranslation('subheader')
  const vouchersWithClickHandler = useMemo<VoucherWithOnClickHandler[]>(() => {
    return vouchersToRender.map((voucher) => ({
      ...voucher,
      onClickHandler: () => onClickVoucher(voucher),
    }))
  }, [vouchersToRender, onClickVoucher])
  return (
    <VStack
      flex={1}
      overflowY={isScrollable ? 'auto' : undefined}
      width='100%'
      paddingTop='16px'
      paddingBottom='132px'
      background='neutral.100'
      borderTopRadius='16px'
    >
      <VStack
        align='stretch'
        flexGrow={1}
        flexShrink={0}
        width='100%'
        maxWidth='512px'
        paddingX={{
          base: '20px',
          sm: '24px',
        }}
      >
        <HStack justify='space-between'>
          <HStack color='neutral.800' spacing='8px'>
            <Text textStyle='subhead2'>{t('balance')}</Text>
            <HStack spacing='2px'>
              <Text textStyle='caption1'>$</Text>
              <Text textStyle='h3'>{amountLeft}</Text>
            </HStack>
          </HStack>
          {!!onClickHistory && (
            <TransactionHistoryDrawerButton
              onClickHistoryButton={onClickHistory}
            />
          )}
        </HStack>
        {/* TODO: Refactor to something less hacky. i.e no relative positioning */}
        <Flex
          position='relative'
          right={VOUCHER_SIDE_MARGIN}
          flexWrap='wrap'
          width={`calc(100% + 2 * ${VOUCHER_SIDE_MARGIN})`}
          marginTop='12px'
        >
          {_.map(vouchersWithClickHandler, (voucher) => (
            <VoucherListing
              key={voucher.id}
              voucher={voucher}
              onClick={voucher.onClickHandler}
              isSelected={getIsVoucherSelected(voucher)}
              isLimitReached={isLimitReached}
              colorScheme={colorScheme}
            />
          ))}
        </Flex>
        {!!campaignTncUrl && (
          <Center marginTop='24px !important'>
            <ViewTermsAndConditionsText campaignTncUrl={campaignTncUrl} />
          </Center>
        )}
      </VStack>
    </VStack>
  )
}

export default React.memo(GroupPageMain)
