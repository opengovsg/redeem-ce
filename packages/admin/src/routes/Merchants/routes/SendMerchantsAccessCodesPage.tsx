import { useMutationWithError } from 'hooks/useMutationWithError'
import React, { useCallback, useState } from 'react'
import { sendMerchantsAccessCode } from '../api/sendMerchantsAccessCode'
import { convertParsedCsvToMerchantIdsArray } from '../helpers/csv'
import {
  SendMerchantsAccessCodeRequest,
  SendMerchantsAccessCodeResponse,
} from '../types'
import { OperationsPage } from '../components/OperationsPage'
import { OPERATIONS } from '../constants/operations'

export const SendMerchantsAccessCodesPage = () => {
  const [results, setResults] = useState<any[]>([])
  const [parsedCsv, setParsedCsv] = useState<unknown[]>([])

  const { mutate, isLoading } = useMutationWithError<
    SendMerchantsAccessCodeResponse,
    SendMerchantsAccessCodeRequest
  >(
    {
      mutationKey: ['sendMerchantsAccessCode'],
      mutationFn: (variables) => sendMerchantsAccessCode(variables),
      onSuccess: (data) => {
        setResults(data.data)
      },
    },
    setResults
  )

  const onClick = useCallback(() => {
    const parsedData: string[] = convertParsedCsvToMerchantIdsArray(parsedCsv)
    mutate({ merchantIds: parsedData })
  }, [parsedCsv])

  return (
    <OperationsPage
      isLoading={isLoading}
      results={results}
      setResults={setResults}
      operation={OPERATIONS.merchant.sendAccessCode}
      parsedCsv={parsedCsv}
      setParsedCsv={setParsedCsv}
      onClick={onClick}
    />
  )
}
