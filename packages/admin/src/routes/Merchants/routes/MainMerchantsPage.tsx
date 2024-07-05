import React from 'react'
import { ChooseOperationsPage } from '../components/ChooseOperationsPage'
import { OPERATIONS } from '../constants/operations'

export const MainMerchantsPage = (): JSX.Element => {
  const operations = OPERATIONS.merchant

  return <ChooseOperationsPage pathPrefix="merchants" operations={operations} />
}
