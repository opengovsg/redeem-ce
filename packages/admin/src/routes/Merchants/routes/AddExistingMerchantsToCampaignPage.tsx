import { useMutationWithError } from 'hooks/useMutationWithError'
import React, { useCallback, useState } from 'react'
import { addMerchantsToCampaign } from '../api/addMerchantsToCampaign'
import { convertParsedCsvToMerchantIdsArray } from '../helpers/csv'
import {
  AddMerchantsToCampaignRequest,
  AddMerchantsToCampaignResponse,
} from '../types'
import { OperationsPage } from '../components/OperationsPage'
import { OPERATIONS } from '../constants/operations'

export const AddExistingMerchantsToCampaignPage = () => {
  const [results, setResults] = useState<any[]>([])
  const [campaignId, setCampaignId] = useState<string>('')
  const [parsedCsv, setParsedCsv] = useState<unknown[]>([])
  const [merchantType, setMerchantType] = useState<string>('')

  const { mutate, isLoading } = useMutationWithError<
    AddMerchantsToCampaignResponse,
    AddMerchantsToCampaignRequest
  >(
    {
      mutationKey: ['addMerchantsToCampaign'],
      mutationFn: (variables) => addMerchantsToCampaign(variables),
      onSuccess: (data) => {
        // Spreading metadata object which would be otherwise nested
        const newResults = data.data.map(({ metadata, ...rest }) => {
          if (!metadata) {
            return rest
          }
          return {
            ...rest,
            ...metadata,
          }
        })

        setResults(newResults)
      },
    },
    setResults
  )

  const onClick = useCallback(() => {
    const parsedData: string[] = convertParsedCsvToMerchantIdsArray(parsedCsv)
    mutate({
      campaignId,
      merchantIds: parsedData,
      campaignMerchantType: merchantType,
    })
  }, [campaignId, parsedCsv, merchantType])

  return (
    <OperationsPage
      isLoading={isLoading}
      results={results}
      setResults={setResults}
      operation={OPERATIONS.merchant.addExisting}
      campaignId={campaignId}
      setCampaignId={setCampaignId}
      parsedCsv={parsedCsv}
      setParsedCsv={setParsedCsv}
      onClick={onClick}
      merchantType={merchantType}
      setMerchantType={setMerchantType}
    />
  )
}
