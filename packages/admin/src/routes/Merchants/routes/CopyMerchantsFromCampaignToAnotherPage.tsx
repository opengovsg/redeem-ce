import { useMutationWithError } from 'hooks/useMutationWithError'
import React, { useCallback, useState } from 'react'
import { copyMerchantsFromCampaignToAnother } from '../api/copyMerchantsFromCampaignToAnother'
import {
  CopyMerchantsFromCampaignToAnotherRequest,
  CopyMerchantsFromCampaignToAnotherResponse,
} from '../types'
import { OperationsPage } from '../components/OperationsPage'
import { OPERATIONS } from '../constants/operations'

export const CopyMerchantsFromCampaignToAnotherPage = () => {
  const [results, setResults] = useState<any[]>([])
  const [campaignIdFrom, setCampaignIdFrom] = useState<string>('')
  const [campaignIdTo, setCampaignIdTo] = useState<string>('')

  const { mutate, isLoading } = useMutationWithError<
    CopyMerchantsFromCampaignToAnotherResponse,
    CopyMerchantsFromCampaignToAnotherRequest
  >(
    {
      mutationKey: ['copyMerchantsFromCampaignToAnother'],
      mutationFn: (variables) => copyMerchantsFromCampaignToAnother(variables),
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
    mutate({
      campaignToCopyFrom: campaignIdFrom,
      campaignToCopyTo: campaignIdTo,
    })
  }, [campaignIdFrom, campaignIdTo])

  return (
    <OperationsPage
      isLoading={isLoading}
      results={results}
      setResults={setResults}
      operation={OPERATIONS.merchant.copy}
      campaignIdFrom={campaignIdFrom}
      setCampaignIdFrom={setCampaignIdFrom}
      campaignIdTo={campaignIdTo}
      setCampaignIdTo={setCampaignIdTo}
      onClick={onClick}
    />
  )
}
