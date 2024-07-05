import React, { useEffect, useRef, useCallback, useMemo } from 'react'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  CloseButton,
  Icon,
  useMultiStyleConfig,
} from '@chakra-ui/react'

// Icons
import { BiCheckCircle, BiErrorCircle, BiInfoCircle, BiX } from '../icons'

// Default delay for auto closing the toast
const AUTO_CLOSE_DELAY_IN_MS = 4000

const ToastStatusToUtilityToValueMapping = {
  SUCCESS: {
    STATUS_TO_COLOR_SCHEME: 'success',
    ICON: BiCheckCircle,
  },
  ERROR: {
    STATUS_TO_COLOR_SCHEME: 'error',
    ICON: BiErrorCircle,
  },
  WARNING: {
    STATUS_TO_COLOR_SCHEME: 'warning',
    ICON: BiErrorCircle,
  },
  INFO: {
    // The naming is intention as we are following the design system naming whereby the ToastStatus
    // is of type main, but the design token value is main
    STATUS_TO_COLOR_SCHEME: 'main',
    ICON: BiInfoCircle,
  },
}

type ToastStatus = keyof typeof ToastStatusToUtilityToValueMapping
type ToastType = { [K in ToastStatus]: K }

// This is the type of toast available and it maps to the class name applied
export const TYPE = Object.keys(ToastStatusToUtilityToValueMapping).reduce(
  (acc, value) => ({ ...acc, [value]: value }),
  {} as ToastType
)

type ToastProps = {
  id: string
  title: React.ReactNode
  description: React.ReactNode
  onClose: (id: string) => void
  autoCloseDelayInMs: number
  status: keyof typeof TYPE
}

export default function Toast({
  id,
  title,
  description,
  onClose,
  autoCloseDelayInMs = AUTO_CLOSE_DELAY_IN_MS,
  status,
}: ToastProps) {
  const toastElement = useRef<HTMLDivElement>(null)
  const styles = useMultiStyleConfig('Toast', {
    colorScheme:
      ToastStatusToUtilityToValueMapping[status].STATUS_TO_COLOR_SCHEME,
  })

  const StatusIcon = useMemo(() => {
    return ToastStatusToUtilityToValueMapping[status].ICON
  }, [status])

  // On mount, make element fade in and grow
  useEffect(() => {
    const currentToastElement = toastElement.current
    if (currentToastElement) {
      requestAnimationFrame(() => {
        currentToastElement.style.opacity = '1'
        currentToastElement.style.transform = 'translateY(0px)'
      })
    }
  }, [toastElement])

  const closeModalWithAnimation = useCallback(() => {
    // On element removal request, make element fade out first, then
    // truly remove the element. 600 ms is chosen as the transition specified
    // takes 0.6s now, which is 600ms
    requestAnimationFrame(() => {
      const currentToastElement = toastElement.current
      // Check the element still exists before executing (could have been manually closed already)
      if (currentToastElement) {
        currentToastElement.style.opacity = '0'
        currentToastElement.style.transform = 'translateY(-100px)'
        setTimeout(() => onClose(id), 700)
      }
    })
  }, [id, onClose])

  // On mount, setTimeout to auto close the toast after autoCloseDelayInMs
  useEffect(() => {
    if (autoCloseDelayInMs) {
      setTimeout(() => closeModalWithAnimation(), autoCloseDelayInMs)
    }
  }, [autoCloseDelayInMs, closeModalWithAnimation])

  return (
    <Box ref={toastElement} sx={styles.wrapper}>
      <Alert sx={styles.container} aria-live="assertive" id={String(id)}>
        <Icon as={StatusIcon} sx={styles.icon} />
        <Box sx={styles.content}>
          <AlertTitle sx={styles.title}>{title}</AlertTitle>
          <AlertDescription sx={styles.description}>
            {description}
          </AlertDescription>
        </Box>
        <CloseButton
          __css={styles.close}
          children={<BiX aria-hidden="true" />}
          colorScheme="neutral"
          onClick={() => onClose?.(id)}
          variant="clear"
        />
      </Alert>
    </Box>
  )
}
