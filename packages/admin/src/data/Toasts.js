/* eslint-disable no-bitwise */
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Toast, { TYPE as ToastType } from 'components/Toast'
import { weakUuid, getErrorMessage } from 'services/utils'
import { Text } from '@chakra-ui/react'

const ToastContext = React.createContext({
  toast: (options) => options,
  toastError: (options) => options,
  toastErrorWithoutTitle: (options) => options,
  toastSuccessWithoutTitle: (options) => options,
})

const useToast = () => React.useContext(ToastContext)

const originalOffset = '16px'

const ToastProvider = ({ children, position = 'TOP', offset: offsetProp }) => {
  const [toasts, setToasts] = React.useState([])

  const toast = useCallback((newToast) => {
    setToasts([{ index: 0, id: weakUuid(), ...newToast }])
  }, [])

  const toastError = useCallback(
    (error) =>
      toast({
        title: 'Oops',
        description: getErrorMessage(error),
        status: ToastType.ERROR,
      }),
    [toast]
  )

  const toastErrorWithoutTitle = useCallback(
    (error) =>
      toast({
        description: (
          <Text textStyle="subhead1" fontWeight={400}>
            <Text as="span" fontWeight={500}>
              {error?.primaryText}
            </Text>
            {getErrorMessage(error)}
          </Text>
        ),
        status: ToastType.ERROR,
      }),
    [toast]
  )

  const toastSuccessWithoutTitle = useCallback(
    ({ primaryText, secondaryText }) =>
      toast({
        description: (
          <Text textStyle="subhead1" fontWeight={400}>
            <Text as="span" fontWeight={500}>
              {primaryText}
            </Text>
            {secondaryText}
          </Text>
        ),
        status: ToastType.SUCCESS,
      }),
    [toast]
  )

  const hideToast = (id) => {
    // Can't find toast with id, just return
    if (!_.find(toasts, { id })) {
      return
    }
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setToasts((prevToasts) => prevToasts.filter((el) => el.id !== id))
  }

  const offset = offsetProp || originalOffset

  const canvasStartTop = {
    top: 0,
    paddingTop: offset,
    paddingBottom: 0,
  }

  const canvasStartBottom = {
    bottom: 0,
    paddingTop: 0,
    paddingBottom: offset,
  }

  return (
    <ToastContext.Provider
      value={{
        toast,
        toastError,
        toastErrorWithoutTitle,
        toastSuccessWithoutTitle,
      }}
    >
      <>
        {children}
        <div
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            zIndex: 999999,
            ...(position === 'BOTTOM' ? canvasStartBottom : canvasStartTop),
          }}
          pointerEvents="box-none"
        >
          {toasts.map((config) => {
            return (
              <Toast
                key={config.id}
                onClose={(id) => hideToast(id)}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...config}
              />
            )
          })}
        </div>
      </>
    </ToastContext.Provider>
  )
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['BOTTOM', 'TOP']),
  offset: PropTypes.number,
}

export { ToastProvider, useToast }
