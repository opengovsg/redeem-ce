import _ from 'lodash'
import React from 'react'
import {formatAddress} from 'helpers/utils'
import {useClipboard} from 'hooks/useClipboard'
import {Route, Routes} from 'react-router-dom'
import {Campaign} from 'types/campaign'
import {Voucher, GroupedVoucher} from 'types/voucher'
import SelectVoucherTypePage from './components/SelectVoucherTypePage'
import VoucherTypeVouchers from './components/VoucherTypeVouchers'

type GroupPageWithVoucherTypesProps = {
  sortedVouchersGroupedByType: Record<string, Voucher[]>
  groupData: GroupedVoucher
  campaign: Campaign
  errorStatus: unknown
  voucherTypes: string[]
}

const GroupPageWithVoucherTypes = ({
  sortedVouchersGroupedByType,
  groupData,
  campaign,
  errorStatus,
  voucherTypes,
}: GroupPageWithVoucherTypesProps) => {
  const onClickCopy = useClipboard({textToCopy: window.location.href})

  const address = formatAddress(groupData)

  const hasVoidedVoucher = !!_(sortedVouchersGroupedByType)
    .values()
    .flatten()
    .find((voucher) => voucher.state === 'voided')

  return (
    <Routes>
      <Route
        path='/:voucherType/*'
        element={
          <VoucherTypeVouchers
            sortedVouchersGroupedByType={sortedVouchersGroupedByType}
            campaign={campaign}
            errorStatus={errorStatus}
            voucherTypes={voucherTypes}
          />
        }
      />
      <Route
        index
        element={
          <SelectVoucherTypePage
            campaign={campaign}
            groupData={groupData}
            address={address}
            onClickCopy={onClickCopy}
            hasVoidedVoucher={hasVoidedVoucher}
            vouchersGroupedByType={sortedVouchersGroupedByType}
          />
        }
      />
    </Routes>
  )
}

export default React.memo(GroupPageWithVoucherTypes)
