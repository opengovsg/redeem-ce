import { MerchantInfoForResponse } from '../types'

export function convertParsedCsvToMerchantIdsArray(
  parsedCsv: unknown[]
): string[] {
  // Ignore header in index position 0
  return parsedCsv
    .slice(1)
    .map((values: string[] | unknown) => (values as string[])[0] as string)
}

export function convertParsedCsvToMerchantInfoForResponseArray(
  parsedCsv: unknown[]
): MerchantInfoForResponse[] {
  const keys = parsedCsv[0] as string[]
  return (parsedCsv.slice(1) as string[][]).map((row) => {
    return row.reduce(
      (obj, value, index) => {
        if (value !== '') {
          // eslint-disable-next-line no-param-reassign
          obj[keys[index]] = value
        }
        return obj
      },
      {} as { [key: string]: string }
    ) as unknown as MerchantInfoForResponse
  })
}
