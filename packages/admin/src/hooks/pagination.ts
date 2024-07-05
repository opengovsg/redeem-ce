import _ from 'lodash'
import { useState, useCallback, useMemo, SetStateAction } from 'react'
import { QueryFunctionContext, QueryKey, useInfiniteQuery } from 'react-query'
import { scrollToTop } from 'helpers/utils'
import { PaginatedResponse } from 'services/RedeemApi/types'

type PageParams = {
  before?: string
  after?: string
}

type UsePaginatedQueryParams<ResponseObject> = {
  apiFunction: (params: {
    limit: number
    search?: string
    after?: string
    before?: string
  }) => Promise<PaginatedResponse<ResponseObject>>
  queryKey: QueryKey
  enabled?: boolean | (({ search }: { search: string }) => boolean)
}

export default function usePaginatedQuery<ResponseObject>({
  apiFunction,
  queryKey,
  enabled = true,
}: UsePaginatedQueryParams<ResponseObject>) {
  const [searchQuery, setCurrentSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  // When search query is updated, include all recently
  // created entries.
  const updateSearch = useCallback((newSearchVal: SetStateAction<string>) => {
    setCurrentPage(0)
    setCurrentSearchQuery(newSearchVal)
  }, [])

  // To include all recently created entries.
  // e.g After creating a new entry, users expect
  // all new entries to show up.
  const refresh = useCallback(() => {
    setCurrentPage(0)
  }, [])

  const fetchEntries = async (
    fetchOptions: QueryFunctionContext<QueryKey, PageParams>
  ) => {
    const { pageParam } = fetchOptions
    const queryResponse = await apiFunction({
      limit: 10,
      search: searchQuery || undefined, // If search == '', then put undefined as well
      after: pageParam?.after,
      before: pageParam?.before,
    })
    return queryResponse
  }

  const query = useInfiniteQuery<PaginatedResponse<ResponseObject>>(
    [...queryKey, searchQuery],
    fetchEntries,
    {
      getNextPageParam: (lastPage): PageParams | undefined =>
        lastPage.pageInfo.hasNextPage
          ? { after: lastPage?.pageInfo?.endCursor }
          : undefined, // Return value undefined to indicate that there is no page
      getPreviousPageParam: (lastPage): PageParams | undefined =>
        lastPage.pageInfo.hasPreviousPage
          ? { before: lastPage?.pageInfo?.startCursor }
          : undefined,
      // Disable auto refetching
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: _.isFunction(enabled)
        ? enabled({ search: searchQuery })
        : enabled,
    }
  )
  const {
    data,
    error,
    refetch,
    fetchNextPage,
    hasNextPage: hasRemoteNextPage,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    status,
  } = query

  const entries = data?.pages?.[currentPage]?.data

  const hasNextPage = useMemo(() => {
    const dataPageLength = data?.pages?.length
    if (dataPageLength && currentPage + 1 < dataPageLength) {
      return true // Has next page cached locally
    }
    return hasRemoteNextPage
  }, [currentPage, data, hasRemoteNextPage])

  const hasPreviousPage = useMemo(() => {
    return currentPage > 0
  }, [currentPage])

  // If there is no next page, then getNextPage is null
  const getNextPage = useMemo(
    () =>
      hasNextPage
        ? async () => {
            // If the next page is not cached, then fetch it from the server
            const dataPageLength = data?.pages?.length
            if (dataPageLength && currentPage + 1 >= dataPageLength) {
              await fetchNextPage()
            }

            setCurrentPage(currentPage + 1)
            scrollToTop()
          }
        : null,
    [fetchNextPage, currentPage, data, hasNextPage]
  )

  // If there is no previous page, then getPreviousPage is null
  const getPreviousPage = useMemo(
    () =>
      hasPreviousPage
        ? () => {
            setCurrentPage(Math.max(currentPage - 1, 0))
            scrollToTop()
          }
        : null,
    [currentPage, hasPreviousPage]
  )

  return {
    entries,
    fetchEntriesStatus: status,
    isFetchingEntries: isFetching,
    isFetchingEntriesNextPage: isFetchingNextPage,
    isFetchingEntriesPreviousPage: isFetchingPreviousPage,
    fetchEntriesError: error,
    fetchEntriesCurrentSearchQuery: searchQuery,
    getNextPageOfEntries: getNextPage,
    getPreviousPageOfEntries: getPreviousPage,
    refreshFetchEntries: refresh,
    updateFetchEntriesSearchQuery: updateSearch,
    refetchEntries: refetch,
  }
}
