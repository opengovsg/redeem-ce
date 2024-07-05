import { useState, useCallback } from 'react'
import { warn } from 'services/logger'

function useClipboard({
  windowPromptText,
  textToCopy,
  onError,
  onSuccess,
}: {
  windowPromptText: string
  textToCopy: string
  onError?: () => void
  onSuccess?: () => void
}) {
  // boolean to indicate we click on the copy
  const [copyState, setCopyState] = useState(false)

  const handleClick = useCallback(() => {
    const navigator = window.navigator as any
    if (!navigator?.clipboard) {
      warn('Clipboard not supported')
      return
    }

    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setCopyState(true)
        onSuccess?.()
        setTimeout(() => setCopyState(false), 1500) // once we click on copy, it will automatically change the state to false
      },
      () => {
        // error message here
        warn(windowPromptText)
        onError?.()
      }
    )
  }, [windowPromptText, textToCopy])
  return { copyState, handleClick }
}

export default useClipboard
