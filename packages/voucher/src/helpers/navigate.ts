import {useCallback} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'

export const useNavigateWithCurrentSearchParams = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  return useCallback(
    (pathname: string) => navigate({pathname, search: searchParams.toString()}),
    [navigate, searchParams],
  )
}
