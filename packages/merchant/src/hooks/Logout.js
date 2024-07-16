import { useCallback, useState } from 'react'
import { useQueryClient } from 'react-query'

import { useAuthenticationState } from 'data/Authentication'
import * as Storage from 'services/storage'
import showError from 'hooks/useErrorToast'

export default function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const { setAuthStateWithUser } = useAuthenticationState()
  const queryClient = useQueryClient()
  const errorToast = showError()

  const logout = async () => {
    setIsLoggingOut(true)
    try {
      // Clear everything in Storage and invalidate all query cache
      Storage.clearAll()
      // Trigger app state update with the "new access token" which is none
      await setAuthStateWithUser()
      // This clears all the query client and supposedly removes all subscribers.
      // TODO: Investigate the strange request 400 appearing in logs though this should remove all subscribers.
      queryClient.clear()
    } catch (error) {
      errorToast(error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return {
    logout: useCallback(() => {
      logout()
    }, [setAuthStateWithUser]),
    isLoggingOut,
  }
}
