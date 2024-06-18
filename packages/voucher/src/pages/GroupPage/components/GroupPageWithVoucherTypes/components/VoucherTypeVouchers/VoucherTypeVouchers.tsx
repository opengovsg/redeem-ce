import React, {useEffect} from 'react'
import {AxiosError} from 'axios'
import RedemptionPage from 'pages/GroupPage/components/RedemptionPage'
import {useSelectableVouchers} from 'pages/GroupPage/hooks'
import {useCallback} from 'react'
import {Route, Routes, useParams} from 'react-router-dom'
import {Campaign} from 'types/campaign'
import {Voucher} from 'types/voucher'
import VoucherTypeSelectVouchersPage from './components/VoucherTypeSelectVouchersPage'
import {useNavigateWithCurrentSearchParams} from 'helpers/navigate'
import {
  getColorSchemeForVoucherType,
  getConfigForVoucherType,
} from 'helpers/vouchers'
import {getVouchersAmountLeft} from 'helpers/vouchers'
import _ from 'lodash'
import {REDEMPTION_PAGE_ROUTE_RELATIVE} from 'constants/routes'

type VoucherTypeVouchersProps = {
  sortedVouchersGroupedByType: Record<string, Voucher[]>
  campaign: Campaign
  errorStatus: unknown
  voucherTypes: string[]
}

const VoucherTypeVouchers = ({
  sortedVouchersGroupedByType,
  campaign,
  errorStatus,
  voucherTypes,
}: VoucherTypeVouchersProps) => {
  const navigateWithCurrentSearchParams = useNavigateWithCurrentSearchParams()
  const navigateToHome = useCallback(
    () => navigateWithCurrentSearchParams('..'),
    [navigateWithCurrentSearchParams],
  )
  const navigateHere = useCallback(
    () => navigateWithCurrentSearchParams('.'),
    [navigateWithCurrentSearchParams],
  )

  const {voucherType} = useParams()

  // Navigate back to main page if invalid voucher type passed in
  useEffect(() => {
    if (_.isUndefined(voucherType) || !voucherTypes.includes(voucherType)) {
      return navigateWithCurrentSearchParams('..')
    }
  }, [voucherType, navigateWithCurrentSearchParams])

  // TODO: Error boundary handle if passed in voucher type is not string
  if (!_.isString(voucherType)) {
    throw Error('Voucher type is not a string')
  }

  const vouchersToRender = sortedVouchersGroupedByType[voucherType] || []
  const amountLeft = getVouchersAmountLeft(vouchersToRender)
  const {
    selectedVouchers,
    toggleSelectVoucher: onClickVoucher,
    isLimitReached,
    unselectVouchersById,
  } = useSelectableVouchers({
    vouchers: vouchersToRender,
  })

  const colorScheme = getColorSchemeForVoucherType(voucherType)
  const voucherTypeText = getConfigForVoucherType(voucherType).text

  return (
    <Routes>
      <Route
        path={REDEMPTION_PAGE_ROUTE_RELATIVE}
        element={
          <RedemptionPage
            onBackClick={navigateHere}
            vouchers={selectedVouchers}
            errorStatus={errorStatus as AxiosError}
            campaign={campaign}
            colorScheme={colorScheme}
            header={voucherTypeText}
          />
        }
      />
      <Route
        path='*'
        element={
          <VoucherTypeSelectVouchersPage
            amountLeft={amountLeft}
            onBackClick={navigateToHome}
            header={voucherTypeText}
            vouchersToRender={vouchersToRender}
            selectedVouchers={selectedVouchers}
            onClickVoucher={onClickVoucher}
            colorScheme={colorScheme}
            isLimitReached={isLimitReached}
            campaignAdvisoryUrl={campaign?.advisoryUrl}
            campaignTncUrl={campaign?.tncUrl}
            campaignMerchantListUrl={campaign?.merchantListUrl || ''}
            unselectVouchersById={unselectVouchersById}
          />
        }
      />
    </Routes>
  )
}

export default React.memo(VoucherTypeVouchers)
