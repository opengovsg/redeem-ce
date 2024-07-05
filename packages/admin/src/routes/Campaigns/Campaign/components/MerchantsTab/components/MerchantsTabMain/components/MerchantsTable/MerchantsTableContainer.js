import React from 'react'
import PropTypes from 'prop-types'

import { useAuthenticationState } from 'data/Authentication'
import { UserActions } from 'constants/permissions'

import MerchantsTable from './MerchantsTable'

export default function MerchantsTableContainer({
  merchants,
  isLoading,
  isLoadingNextPage,
  isLoadingPreviousPage,
  getNextPage,
  getPreviousPage,
}) {
  const { permissions } = useAuthenticationState()
  const globalPermissions = permissions['*']?.actions
  const canEditMerchants =
    globalPermissions?.includes(UserActions.UpdateMerchant) ||
    globalPermissions?.includes(UserActions.UpdateMerchantPayment)

  return (
    <MerchantsTable
      merchants={merchants}
      canEditMerchants={canEditMerchants}
      isLoading={isLoading}
      isLoadingNextPage={isLoadingNextPage}
      isLoadingPreviousPage={isLoadingPreviousPage}
      getNextPage={getNextPage}
      getPreviousPage={getPreviousPage}
    />
  )
}

MerchantsTableContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  merchants: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  isLoadingNextPage: PropTypes.bool,
  isLoadingPreviousPage: PropTypes.bool,
  getNextPage: PropTypes.func,
  getPreviousPage: PropTypes.func,
}
