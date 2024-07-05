import { MAX_NETWORK_RETRIES } from 'constants/request'
import { QueryClient } from 'react-query'
import { isClientError } from 'services/utils'

const queryClient = new QueryClient()

// TODO: Figure out how to do toast
queryClient.setDefaultOptions({
  queries: {
    // Returns true to indicate should retry
    retry: (failureCount, responseError) => {
      // Will retry when not client error and the number of retries has not reached the max
      return !isClientError(responseError) && failureCount < MAX_NETWORK_RETRIES
    },
    /**
      React Query will keep track of the fields you are using during render, and will use this to compute the list. This is especially useful when
      we are using the selector patterns. This is a default in v4 but unfortunately, we are still at v3 stage
      See more @https://tkdodo.eu/blog/react-query-render-optimizations#tracked-queries
      
      problematic-rest-destructuring: copy code to clipboard
      // 🚨 will track all fields
      const { isLoading, ...queryInfo } = useQuery(...)

      // ✅ this is totally fine
      const { isLoading, data } = useQuery(...)
     */
    notifyOnChangeProps: 'tracked',
  },
})

/**
 TLDR: Never refetch data if you have cached data, but remove data from the cache as soon as ALL OBSERVERS don't use it anymore. To understand more in-depth look at
 - https://stackoverflow.com/a/75265950 
 - https://www.notion.so/opengov/React-Query-TKDODO-f0b3afe9d6a94be9ba429d22b77152d2?pvs=4#82cb333e2a8d4bc9a0f8135c1623d0da
 - https://github.com/TanStack/query/discussions/1685
 */
const FETCH_ONLY_IF_CACHE_DATA_IS_MISSING_CONFIG = {
  cacheTime: 0,
  staleTime: Infinity,
  refetchOnWindowFocus: false, // Disable automatic refetching on window focus
}

export { queryClient, FETCH_ONLY_IF_CACHE_DATA_IS_MISSING_CONFIG }
