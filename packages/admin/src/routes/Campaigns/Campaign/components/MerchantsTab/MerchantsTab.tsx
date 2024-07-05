import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import { Route, Switch, useRouteMatch } from 'react-router-dom'
import useCampaignMerchants from 'hooks/Merchants'
import { useAuthenticationState } from 'data/Authentication'
import { useToast } from 'data/Toasts'
import { usePrevious } from '@chakra-ui/react'
import { useDebouncedCallback } from 'use-debounce'
import { hasViewSettlementReportsPermission } from 'helpers/permissions'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import EditMerchant from './components/EditMerchant'
import MerchantsTabMain from './components/MerchantsTabMain'

export default function MerchantsTab() {
  const { path } = useRouteMatch()
  const { campaignId, totalNumberOfMerchants } = useCampaignContext()
  const { permissions } = useAuthenticationState()
  const [searchedValue, setSearchedValue] = useState('')
  const { toastError } = useToast()
  const previousSearchedValue = usePrevious(searchedValue)

  const {
    campaignMerchants,
    isFetchingCampaignMerchants,
    isFetchingCampaignMerchantsNextPage,
    isFetchingCampaignMerchantsPreviousPage,
    fetchCampaignMerchantsError,
    getNextPageOfCampaignMerchants,
    getPreviousPageOfCampaignMerchants,
    updateFetchCampaignMerchantsSearchQuery,
  } = useCampaignMerchants(campaignId)

  const debouncedSearch = useDebouncedCallback(
    updateFetchCampaignMerchantsSearchQuery,
    500
  )

  useEffect(() => {
    if (_.isUndefined(previousSearchedValue)) {
      return
    }
    debouncedSearch(searchedValue)
    // previousFilterVouchersValue should not be a dependency as it depends on filterVouchersValue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, searchedValue])

  // Show error for fetchCampaignMerchants when it errors
  // TODO: To remove in the correct pattern. Pre-requisties, make the global toast error working first
  useEffect(() => {
    if (fetchCampaignMerchantsError) {
      toastError(fetchCampaignMerchantsError)
    }
  }, [toastError, fetchCampaignMerchantsError])

  const canViewSettlementReports = hasViewSettlementReportsPermission({
    campaignId,
    permissions,
  })

  return (
    <Switch>
      <Route path={`${path}/:merchantId`}>
        <EditMerchant />
      </Route>
      <Route>
        <MerchantsTabMain
          totalNumberOfMerchants={totalNumberOfMerchants}
          campaignMerchants={campaignMerchants ?? []}
          searchedValue={searchedValue}
          setSearchedValue={setSearchedValue}
          canViewSettlementReports={canViewSettlementReports}
          isLoading={isFetchingCampaignMerchants}
          isLoadingNextPage={isFetchingCampaignMerchantsNextPage}
          isLoadingPreviousPage={isFetchingCampaignMerchantsPreviousPage}
          getNextPage={getNextPageOfCampaignMerchants}
          getPreviousPage={getPreviousPageOfCampaignMerchants}
        />
      </Route>
    </Switch>
  )
}
