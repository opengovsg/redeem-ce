import {useEffect, useState} from 'react'

// TODO: Remove hook in place of react query's onlineManager
// Hook to check if `window.navigator.isOnline` is true
const useNavigatorOnline = () => {
  function getOnlineStatus() {
    return typeof window.navigator !== 'undefined'
      ? window.navigator.onLine
      : true
  }

  const [status, setStatus] = useState(getOnlineStatus())

  const setOnline = () => setStatus(true)
  const setOffline = () => setStatus(false)

  useEffect(() => {
    window.addEventListener('online', setOnline)
    window.addEventListener('offline', setOffline)

    return () => {
      window.removeEventListener('online', setOnline)
      window.removeEventListener('offline', setOffline)
    }
  }, [])

  return status
}

export default useNavigatorOnline
