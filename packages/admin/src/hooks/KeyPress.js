import { useEffect } from 'react'

export default function useKeyPress(key, callback) {
  useEffect(() => {
    function onKeyup(e) {
      if (e.key === key) callback()
    }
    window.addEventListener('keyup', onKeyup)
    return () => window.removeEventListener('keyup', onKeyup)
  }, [key, callback])
}
