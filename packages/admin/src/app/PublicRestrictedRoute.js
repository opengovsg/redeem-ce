/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

import {
  useAuthenticationState,
  STATES as AuthenticationStates,
} from 'data/Authentication'

// A Public Restricted Route is only accessible when not logged in.
// When logged in, a redirect will occur to redirectPath provided
function PublicRestrictedRoute({ children, redirectPath, ...rest }) {
  const { authenticationState } = useAuthenticationState()

  return (
    <Route
      render={({ location }) =>
        authenticationState === AuthenticationStates.USER_SIGNED_IN ? (
          <Redirect
            to={{ pathname: redirectPath, state: { from: location } }}
          />
        ) : (
          children
        )
      }
      {...rest}
    />
  )
}

export default PublicRestrictedRoute

PublicRestrictedRoute.propTypes = {
  children: PropTypes.node,
  redirectPath: PropTypes.string.isRequired,
}
