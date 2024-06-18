import React, {useCallback} from 'react'
import {AxiosError} from 'axios'
import {formatAddress} from 'helpers/utils'
import {useSelectableVouchers} from 'pages/GroupPage/hooks'
import {Voucher, GroupedVoucher} from 'types/voucher'
import {Route, Routes, useNavigate} from 'react-router-dom'
import RedemptionPage from '../RedemptionPage'
import DefaultSelectVouchersPage from './components/DefaultSelectVouchersPage'
import {Campaign} from 'types/campaign'
import {REDEMPTION_PAGE_ROUTE_RELATIVE} from 'constants/routes'

type GroupPageDefaultProps = {
  vouchersToRender: Voucher[]
  groupData: GroupedVoucher
  campaign: Campaign
  errorStatus: unknown
}

const GroupPageDefault = ({
  vouchersToRender,
  groupData,
  campaign,
  errorStatus,
}: GroupPageDefaultProps) => {
  const navigate = useNavigate()
  const navigateFromRedemptionToVouchers = useCallback(
    () => navigate(-1),
    [navigate],
  )
  const {
    selectedVouchers,
    toggleSelectVoucher: onClickVoucher,
    isLimitReached,
    unselectVouchersById,
  } = useSelectableVouchers({
    vouchers: vouchersToRender,
  })
  const address = formatAddress(groupData)

  return (
    <Routes>
      <Route
        path={REDEMPTION_PAGE_ROUTE_RELATIVE}
        element={
          <RedemptionPage
            onBackClick={navigateFromRedemptionToVouchers}
            vouchers={selectedVouchers}
            errorStatus={errorStatus as AxiosError}
            campaign={campaign}
            header={campaign?.name || undefined}
          />
        }
      />
      <Route
        path='*'
        element={
          <DefaultSelectVouchersPage
            vouchersToRender={vouchersToRender}
            selectedVouchers={selectedVouchers}
            onClickVoucher={onClickVoucher}
            isLimitReached={isLimitReached}
            address={address}
            groupId={groupData.id}
            campaign={campaign}
            unselectVouchersById={unselectVouchersById}
          />
        }
      />
    </Routes>
  )
}

export default React.memo(GroupPageDefault)
