import { useEffect, useRef } from 'react'
import { useAuthenticationState } from 'data/Authentication'
import ApiService from 'services/RedeemApi/baseConfig'

const RedirectOnUnauthorized = () => {
  const interceptorId = useRef<number | null>(null)
  const { setAuthStateWithUser } = useAuthenticationState()
  useEffect(() => {
    interceptorId.current = ApiService.interceptors.response.use(
      undefined,
      (error) => {
        switch (error.response.status) {
          case 401: // If unauthorized, log the user out
            setAuthStateWithUser(null)
            break
          default:
            break
        }
        return Promise.reject(error)
      }
    )

    return () => {
      if (interceptorId.current) {
        ApiService.interceptors.response.eject(interceptorId.current)
      }
    }
  }, [setAuthStateWithUser])

  // No elements to be mounted on DOM
  return null
}

export default RedirectOnUnauthorized
