import { useMutationWithError } from 'hooks/useMutationWithError'
import React, { useCallback, useState } from 'react'
import { createAndAddMerchantsToCampaign } from '../api/createAndAddMerchantsToCampaign'
import { convertParsedCsvToMerchantInfoForResponseArray } from '../helpers/csv'
import {
  CreateAndAddMerchantRequest,
  CreateAndAddMerchantsResponse,
  MerchantInfoForResponse,
} from '../types'
import { OperationsPage } from '../components/OperationsPage'
import { OPERATIONS } from '../constants/operations'

export const CreateAndAddMerchantsToCampaignPage = () => {
  const [results, setResults] = useState<any[]>([])
  const [campaignId, setCampaignId] = useState<string>('')
  const [parsedCsv, setParsedCsv] = useState<unknown[]>([])

  const { mutate, isLoading } = useMutationWithError<
    CreateAndAddMerchantsResponse,
    CreateAndAddMerchantRequest
  >(
    {
      mutationKey: ['createAndAddMerchantsToCampaign'],
      mutationFn: (variables) => createAndAddMerchantsToCampaign(variables),
      onSuccess: (data) => {
        // Spreading merchant object which would be otherwise nested
        const newResults = data.data.map(({ merchant, ...rest }) => ({
          ...rest,
          ...merchant,
        }))
        setResults(newResults)
      },
    },
    setResults
  )

  const onClick = useCallback(() => {
    const parsedData: MerchantInfoForResponse[] =
      convertParsedCsvToMerchantInfoForResponseArray(parsedCsv)
    mutate({ campaignId, merchants: parsedData })
  }, [campaignId, parsedCsv])

  return (
    <OperationsPage
      isLoading={isLoading}
      results={results}
      setResults={setResults}
      operation={OPERATIONS.merchant.createAndAdd}
      campaignId={campaignId}
      setCampaignId={setCampaignId}
      parsedCsv={parsedCsv}
      setParsedCsv={setParsedCsv}
      onClick={onClick}
    />
  )
}
