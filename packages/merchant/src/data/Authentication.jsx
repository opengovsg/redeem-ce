// ported from redeem-admin

import React, { createContext, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

// Import Services
import { clearUser, loadUser, saveUser } from 'services/storage'
import { ROUTES } from 'router/routes'

const AuthenticationStateContext = createContext({
  setAuthStateWithUser: () => {},
  user: {
    id: null,
    contactNumber: null,
    name: null,
    token: '',
  },
  authenticationState: '',
})

// There are 2 authentication states
// 1. USER_SIGNED_OUT
// 2. USER_SIGNED_IN

const STATES = {
  USER_SIGNED_OUT: 'USER_SIGNED_OUT',
  USER_SIGNED_IN: 'USER_SIGNED_IN',
}

const AuthenticationStateProvider = ({ children }) => {
  const [state, setState] = useState({
    authenticationState: '',
    user: null,
  })

  const setAuthStateWithUser = useCallback((user) => {
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
    }
  }, [])

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
      }}
    >
      {children}
    </AuthenticationStateContext.Provider>
  )
}

AuthenticationStateProvider.propTypes = {
  children: PropTypes.node,
}

const useAuthenticationState = () => {
  const context = React.useContext(AuthenticationStateContext)
  if (context === undefined) {
    throw new Error(
      'useAuthenticationState must be used within a AuthenticationStateProvider',
    )
  }
  return context
}

const RequireAuthentication = ({ children }) => {
  const { authenticationState } = useAuthenticationState()

  return authenticationState === STATES.USER_SIGNED_OUT ? (
    <Navigate
      to={ROUTES.ONBOARDING.ROOT}
      replace
    />
  ) : (
    children
  )
}

RequireAuthentication.propTypes = {
  children: PropTypes.node,
}

const RequireSignedOut = ({ children }) => {
  const { authenticationState } = useAuthenticationState()

  return authenticationState === STATES.USER_SIGNED_IN ? (
    <Navigate
      to={ROUTES.MAIN.ROOT}
      replace
    />
  ) : (
    children
  )
}

RequireSignedOut.propTypes = {
  children: PropTypes.node,
}

export {
  AuthenticationStateProvider,
  useAuthenticationState,
  STATES,
  RequireAuthentication,
  RequireSignedOut,
}
