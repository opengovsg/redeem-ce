import React from 'react'

import VoucherSearch from './VoucherSearch'
import { useVouchersTabContext } from '../../VouchersTabContext'

// TODO: Clean up the remaining toast examples
// import { useToast } from 'data/Toasts'
// import { TYPE } from 'components/Toast'

export default function VoucherSearchContainer() {
  const {
    filterVouchersValue: searchValue,
    setFilterVouchersValue: updateSearchValue,
  } = useVouchersTabContext()
  return (
    <VoucherSearch
      searchValue={searchValue}
      onPrimaryClick={updateSearchValue}
    />
  )
}

VoucherSearchContainer.propTypes = {}
