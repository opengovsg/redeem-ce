// Libraries
import _ from 'lodash'
import {Navigate, useLocation, useParams} from 'react-router-dom'

// Hooks
import useGroupWithRefetchInterval from 'hooks/useGroupWithRefetchInterval'

import {ERROR, LOADING, PENDING, SUCCESS} from 'constants/requests'

// General Components
import VoucherError from 'components/VoucherError'

import {
  REFETCH_GROUP_INTERVAL,
  REFETCH_GROUP_ON_REDEMPTION_PAGE_INTERVAL,
} from 'constants/intervals'
import {NO_MATCH_ROUTE, REDEMPTION_PAGE_ROUTE_RELATIVE} from 'constants/routes'
import GroupPageDefault from './components/GroupPageDefault'
import GroupPageWithVoucherTypes from './components/GroupPageWithVoucherTypes'
import {useSortedVouchersGroupedByType} from './hooks'
import {Voucher} from 'types/voucher'

function getVoucherTypes(vouchers: Voucher[]): string[] {
  const voucherTypes = vouchers.map((voucher) => voucher.type)
  if (_.some(voucherTypes, voucherTypes === null)) {
    return []
  }
  return _.uniq(voucherTypes as string[])
}

const GroupPage = () => {
  const {groupId} = useParams<{groupId: string}>()
  if (!groupId) {
    // Should never reach here due to enforcement on top level router. But
    // redirect if a bug ever causes it to reach here without an id.
    return <Navigate to={NO_MATCH_ROUTE} />
  }
  const {pathname} = useLocation()
  const isOnRedemptionPage = pathname.endsWith(
    `/${REDEMPTION_PAGE_ROUTE_RELATIVE}`,
  )
  const {
    voucherGroup,
    groupData,
    campaign,
    fetchGroupByIdStatus,
    fetchGroupByIdError,
  } = useGroupWithRefetchInterval(
    groupId,
    isOnRedemptionPage
      ? REFETCH_GROUP_ON_REDEMPTION_PAGE_INTERVAL
      : REFETCH_GROUP_INTERVAL,
  )
  const sortedVouchersGroupedByType =
    useSortedVouchersGroupedByType(voucherGroup)
  const sortedVouchersWithNoType = sortedVouchersGroupedByType['null'] || []
  // If there are no vouchers or only null as voucher type, then use default (i.e no types)
  // variant of the GroupPage.
  const isUseMultipleVoucherTypesPage =
    _.size(sortedVouchersGroupedByType) > 1 || !sortedVouchersWithNoType.length
  // Rationale of not using sortedVouchersGroupedByType to get the keys is because the value "lags" behind as it maintains the previous sorted order
  // Thus, when voucherGroup has value, sortedVouchersGroupedByType might not have a value yet because the previous sort order is still null.
  const voucherTypes = getVoucherTypes(voucherGroup)

  return (
    <>
      {fetchGroupByIdStatus === ERROR && (
        <VoucherError error={fetchGroupByIdError} />
      )}
      {/* If voucher sorting is not yet done, continue showing loading spinner */}
      {/* The state should not be LOADING if vouchers are already sorted, but */}
      {/* leaving both conditions here for clarity. */}
      {(fetchGroupByIdStatus === LOADING ||
        fetchGroupByIdStatus === PENDING ||
        !sortedVouchersGroupedByType) && (
        <div className='loading-container'>
          <p className='loading-text'>loading...</p>
          <div className='loader' />
        </div>
      )}
      {fetchGroupByIdStatus === SUCCESS && (
        <>
          {isUseMultipleVoucherTypesPage && (
            <GroupPageWithVoucherTypes
              sortedVouchersGroupedByType={sortedVouchersGroupedByType}
              groupData={groupData}
              campaign={campaign}
              errorStatus={fetchGroupByIdError}
              voucherTypes={voucherTypes}
            />
          )}
          {!isUseMultipleVoucherTypesPage && (
            <GroupPageDefault
              vouchersToRender={sortedVouchersWithNoType}
              groupData={groupData}
              campaign={campaign}
              errorStatus={fetchGroupByIdError}
            />
          )}
        </>
      )}
    </>
  )
}

export default GroupPage
