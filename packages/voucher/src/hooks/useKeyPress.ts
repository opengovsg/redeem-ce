import {useEffect} from 'react'

// TODO(chakra): remove hook with chakra refactor
const useKeyPress = (key: string, callback?: () => void) => {
  useEffect(() => {
    function onKeyup(e: KeyboardEvent) {
      if (e.key === key && callback) callback()
    }
    window.addEventListener('keyup', onKeyup)
    return () => window.removeEventListener('keyup', onKeyup)
  }, [key, callback])
}

export default useKeyPress
