import { setMonitoringUser } from 'helpers/monitoring'
import useSelfUserPermissions from 'hooks/Permissions'
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  PropsWithChildren,
} from 'react'
import { UserRole } from 'services/RedeemApi/types'

// Import Services
import { clearUser, loadUser, saveUser } from 'services/Storage'

type User = {
  id: string
  contactNumber: string | null
  email: string | null
  name: string | null
  token: string
}

type ContextState = {
  setAuthStateWithUser: (user: User | null) => void
  fetchPermissions: () => Promise<void>
  isLoadingPermissions: boolean
  user: User | null
  authenticationState: string
  permissions: {
    [x: string]: UserRole
  }
}

const AuthenticationStateContext = createContext({} as ContextState)

// There are 2 authentication states
// 1. USER_SIGNED_OUT
// 2. USER_SIGNED_IN

const STATES = {
  USER_SIGNED_OUT: 'USER_SIGNED_OUT',
  USER_SIGNED_IN: 'USER_SIGNED_IN',
}

const AuthenticationStateProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  type AuthenticationState = {
    authenticationState: string
    user: User | null
  }
  const [state, setState] = useState({} as AuthenticationState)

  const setAuthStateWithUser = useCallback((user: User | null) => {
    // No acesss token
    // 1. Clear the storage for access token
    // 2. Set state that User is signed out
    if (!user) {
      clearUser()
      setState({
        authenticationState: STATES.USER_SIGNED_OUT,
        user: null,
      })
      // Acesss token exists
      // 1. Save access token to storage
      // 2. Set state that User is signed in
    } else {
      saveUser(user)
      setState({
        authenticationState: STATES.USER_SIGNED_IN,
        user,
      })
      setMonitoringUser({ id: user.id, email: user.email })
    }
  }, [])

  const { permissions, fetchSelfUserPermissions, isLoadingPermissions } =
    useSelfUserPermissions({
      enabled: state.authenticationState === STATES.USER_SIGNED_IN,
    })

  const fetchPermissions = useCallback(async () => {
    await fetchSelfUserPermissions()
  }, [fetchSelfUserPermissions])

  // On mount, load the access token in storage to determine the auth state
  useEffect(() => {
    const checkHasAccessToken = () => {
      const loadedAccessToken = loadUser()
      setAuthStateWithUser(loadedAccessToken)
    }

    checkHasAccessToken()
  }, [setAuthStateWithUser])

  return (
    <AuthenticationStateContext.Provider
      value={{
        user: state.user,
        authenticationState: state.authenticationState,
        setAuthStateWithUser,
        fetchPermissions,
        isLoadingPermissions,
        permissions,
      }}
    >
      {children}
    </AuthenticationStateContext.Provider>
  )
}

const useAuthenticationState = () => {
  const context = React.useContext(AuthenticationStateContext)
  if (context === undefined) {
    throw new Error(
      'useAuthenticationState must be used within a AuthenticationStateProvider'
    )
  }
  return context
}

export { AuthenticationStateProvider, useAuthenticationState, STATES }
