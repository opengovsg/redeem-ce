/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

import { ROOT_ROUTE } from 'constants/routes'

import {
  useAuthenticationState,
  STATES as AuthenticationStates,
} from 'data/Authentication'

// A Private Route is only accessible when logged in.
// When not logged in, a redirect will occur to ROOT_ROUTE which is our login page
function PrivateRoute({ children, ...rest }) {
  const { authenticationState } = useAuthenticationState()

  // When authenticationState is false, it is unintialised so return null
  return !authenticationState ? null : (
    <Route
      render={({ location }) =>
        authenticationState === AuthenticationStates.USER_SIGNED_OUT ? (
          <Redirect to={{ pathname: ROOT_ROUTE, state: { from: location } }} />
        ) : (
          children
        )
      }
      {...rest}
    />
  )
}

export default PrivateRoute

PrivateRoute.propTypes = {
  children: PropTypes.node,
}
