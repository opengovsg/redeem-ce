import {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import toast, {ToastOptions} from 'react-hot-toast'
import Toast, {ToastProps} from 'components/Toast'

// Rough implementation of useClipboard, can use onSuccess, onSuccess to dynamically show toast in the future.
export function useClipboard({
  textToCopy,
  onError,
  onSuccess,
}: {
  textToCopy: string
  onError?: () => void
  onSuccess?: () => void
}) {
  const navigator = window.navigator
  const hasNavigatorShare = !!(navigator && navigator.share)

  const {t} = useTranslation('toasts', {keyPrefix: 'copy_success'})
  const renderCopySuccessToast = useCallback(
    ({id, visible}: Pick<ToastProps & ToastOptions, 'id' | 'visible'>) => (
      <Toast
        header={t('header')}
        message={t('message')}
        type='success'
        visible={visible}
        onClose={() => {
          toast.dismiss(id)
        }}
      />
    ),
    [],
  )

  if (hasNavigatorShare) {
    const useNavigatorShare = useCallback(
      () => navigator.share({url: textToCopy}),
      [textToCopy],
    )
    return useNavigatorShare
  } else {
    const handleClick = useCallback(() => {
      const navigator = window.navigator
      if (!navigator?.clipboard) {
        return
      }

      navigator.clipboard.writeText(textToCopy).then(
        () => {
          onSuccess?.()
          toast.custom(renderCopySuccessToast)
        },
        () => void onError?.(),
      )
    }, [textToCopy])
    return handleClick
  }
}
