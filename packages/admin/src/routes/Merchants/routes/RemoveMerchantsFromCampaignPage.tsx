import { useMutationWithError } from 'hooks/useMutationWithError'
import React, { useCallback, useState } from 'react'
import { removeMerchantsFromCampaign } from '../api/removeMerchantsFromCampaign'
import { convertParsedCsvToMerchantIdsArray } from '../helpers/csv'
import {
  RemoveMerchantsFromCampaignRequest,
  RemoveMerchantsFromCampaignResponse,
} from '../types'
import { OperationsPage } from '../components/OperationsPage'
import { OPERATIONS } from '../constants/operations'

export const RemoveMerchantsFromCampaignPage = () => {
  const [results, setResults] = useState<any[]>([])
  const [campaignId, setCampaignId] = useState<string>('')
  const [parsedCsv, setParsedCsv] = useState<unknown[]>([])

  const { mutate, isLoading } = useMutationWithError<
    RemoveMerchantsFromCampaignResponse,
    RemoveMerchantsFromCampaignRequest
  >(
    {
      mutationKey: ['removeMerchantsFromCampaign'],
      mutationFn: (variables) => removeMerchantsFromCampaign(variables),
      onSuccess: (data) => {
        setResults(data.data)
      },
    },
    setResults
  )

  const onClick = useCallback(() => {
    const parsedData: string[] = convertParsedCsvToMerchantIdsArray(parsedCsv)
    mutate({ campaignId, merchantIds: parsedData })
  }, [campaignId, parsedCsv])

  return (
    <OperationsPage
      isLoading={isLoading}
      results={results}
      setResults={setResults}
      operation={OPERATIONS.merchant.remove}
      campaignId={campaignId}
      setCampaignId={setCampaignId}
      parsedCsv={parsedCsv}
      setParsedCsv={setParsedCsv}
      onClick={onClick}
    />
  )
}
