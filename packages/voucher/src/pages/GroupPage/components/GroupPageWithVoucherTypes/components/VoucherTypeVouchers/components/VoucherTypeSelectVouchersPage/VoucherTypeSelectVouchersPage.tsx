import React, {useCallback} from 'react'
import {Flex, VStack} from '@chakra-ui/react'
import GroupPageMain from 'pages/GroupPage/components/GroupPageMain'
import {Voucher, VoucherColorScheme} from 'types/voucher'
import BrandmarkBackground from 'components/BrandmarkBackground'
import {
  useGetIsVoucherSelected,
  useUnselectUsedVouchers,
} from 'pages/GroupPage/hooks'
import {getVouchersAmountLeft} from 'helpers/vouchers'
import GroupPageBottomOverlay from 'pages/GroupPage/components/GroupPageBottomOverlay'
import {useNavigateWithCurrentSearchParams} from 'helpers/navigate'
import VoucherTypeSelectVouchersHeader from './components/VoucherTypeSelectVouchersHeader'
import {useIsShortDeviceInitial} from 'helpers/hooks'

type VoucherTypeSelectVouchersPageProps = {
  vouchersToRender: Voucher[]
  selectedVouchers: Voucher[]
  onBackClick: () => void
  onClickVoucher: (voucher: Voucher) => void
  isLimitReached: boolean
  amountLeft: number
  header: string
  campaignAdvisoryUrl?: string | null
  campaignTncUrl?: string | null
  campaignMerchantListUrl?: string
  colorScheme: VoucherColorScheme
  unselectVouchersById: (voucherIds: string[]) => void
}

const VoucherTypeSelectVouchersPage = ({
  vouchersToRender,
  selectedVouchers,
  onClickVoucher,
  onBackClick,
  isLimitReached,
  amountLeft,
  colorScheme,
  header,
  campaignAdvisoryUrl,
  campaignTncUrl,
  campaignMerchantListUrl,
  unselectVouchersById,
}: VoucherTypeSelectVouchersPageProps) => {
  const getIsVoucherSelected = useGetIsVoucherSelected(selectedVouchers)
  useUnselectUsedVouchers({selectedVouchers, unselectVouchersById})
  const selectedVouchersTotalValue = getVouchersAmountLeft(selectedVouchers)
  const navigateWithCurrentSearchParams = useNavigateWithCurrentSearchParams()
  const onClickShowQr = useCallback(
    () => navigateWithCurrentSearchParams('show'),
    [navigateWithCurrentSearchParams],
  )
  const isShortDevice = useIsShortDeviceInitial()

  return (
    <>
      <Flex
        position='relative'
        justifyContent='center'
        flexGrow={1}
        overflow='hidden'
        width='100%'
        height='100%'
        minHeight={0}
        background={`${colorScheme}.500`}
      >
        <BrandmarkBackground colorScheme={colorScheme} />
        <VStack
          zIndex={1}
          align='center'
          width='100%'
          paddingTop='16px'
          spacing={isShortDevice ? '24px' : '28px'}
        >
          <VoucherTypeSelectVouchersHeader
            campaignMerchantListUrl={campaignMerchantListUrl}
            colorScheme={colorScheme}
            header={header}
            onBackClick={onBackClick}
          />
          <GroupPageMain
            vouchersToRender={vouchersToRender}
            getIsVoucherSelected={getIsVoucherSelected}
            colorScheme={colorScheme}
            onClickVoucher={onClickVoucher}
            isLimitReached={isLimitReached}
            isScrollable
            amountLeft={amountLeft}
            campaignAdvisoryUrl={campaignAdvisoryUrl}
            campaignTncUrl={campaignTncUrl}
          />
          <GroupPageBottomOverlay
            selectedVouchersTotalValue={selectedVouchersTotalValue}
            onClickNext={onClickShowQr}
            showButton={!!selectedVouchers.length}
          />
        </VStack>
      </Flex>
    </>
  )
}

export default React.memo(VoucherTypeSelectVouchersPage)
