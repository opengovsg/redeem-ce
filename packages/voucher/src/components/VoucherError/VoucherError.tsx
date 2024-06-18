// Libraries
import React from 'react'

// Helpers
import {is404Error} from 'helpers/utils'
import useErrorStates from 'hooks/useErrorStates'

// Components
import ErrorTemplate from './ErrorTemplate'

// TODO(ts): Rethink error type here
interface VoucherErrorProps {
  error: unknown
}

const VoucherError = ({error}: VoucherErrorProps) => {
  const errorStates = useErrorStates()

  return is404Error(error) ? (
    <ErrorTemplate errorObj={errorStates.NotFoundError} />
  ) : (
    <ErrorTemplate errorObj={errorStates.ServiceUnavailable} />
  )
}

export default VoucherError
