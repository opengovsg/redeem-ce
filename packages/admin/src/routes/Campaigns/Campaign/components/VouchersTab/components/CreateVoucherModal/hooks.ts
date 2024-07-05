import { addresses } from 'constants/street-addresses'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

type UseSearchVouchersForCreateFormProps<T> = {
  valueToSearch: T
  apiCall: (
    // Not very sure whats a better typing
    queryParameters: T
  ) => Promise<boolean>
}

// Search state is either 'loading', 'done' (has result) or 'idle' (not searching)
type SearchState<T> =
  | {
      state: 'loading'
      query: T
    }
  | {
      state: 'done'
      query: T
      result: boolean
    }
  | {
      state: 'idle'
    }

export function useDebouncedSearch<T>({
  valueToSearch,
  apiCall,
}: UseSearchVouchersForCreateFormProps<T>) {
  const [searchState, setSearchState] = useState<SearchState<T>>({
    state: 'idle',
  })

  const debouncedApiCall = useDebouncedCallback(async (query) => {
    const result = await apiCall(query)
    setSearchState((currentSearchState) => {
      // Search result is outdated
      if (
        currentSearchState.state !== 'loading' ||
        currentSearchState.query !== query
      ) {
        return currentSearchState
      }
      return { state: 'done', query, result }
    })
  }, 200)
  useEffect(() => {
    setSearchState(
      !valueToSearch
        ? { state: 'idle' }
        : { state: 'loading', query: valueToSearch }
    )
    if (valueToSearch) {
      debouncedApiCall(valueToSearch)
    } else {
      debouncedApiCall.cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueToSearch])

  return {
    searchResult: searchState.state === 'done' ? searchState.result : null,
    isLoading: searchState.state === 'loading',
    isHidden: searchState.state !== 'done' || !searchState.result,
  }
}

export function useValidateRecipientIdWhenFilled(
  recipientId: string,
  triggerValidation: () => void
) {
  useEffect(() => {
    // TODO: Consider if your recipient identifiers
    // are of fixed length. If so, you may uncomment the
    // if block below so that validation happens only when
    // recipientId is an exact length
    // if (recipientId?.length !== LENGTH) {
    //   return
    // }
    triggerValidation()
  }, [recipientId])
}

// TODO: If implementing address autocomplete, implement
export function useAddresses() {
  return addresses
}
