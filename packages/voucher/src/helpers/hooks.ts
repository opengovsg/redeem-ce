import {SHORT_DEVICE_HEIGHT} from 'constants/sizes'
import {useLayoutEffect, useState} from 'react'
import {useWindowSize} from 'usehooks-ts'

const useInitialWindowHeight = () => {
  const {height} = useWindowSize()
  const [initialHeight, setInitialHeight] = useState<number | null>(null)
  // Ensure screen does not unnecessarily render before computation
  useLayoutEffect(() => {
    // height is 0 on first init and updates to real value after
    if (initialHeight || !height) {
      return
    }
    setInitialHeight(height)
  }, [height])

  return initialHeight
}

// Only checks the initial window size, this ensures that the
// elements don't change height due to changes in
// viewport height (e.g Navbar hide/unhide, pull to refresh)
export const useIsShortDeviceInitial = () => {
  const initialHeight = useInitialWindowHeight()

  const isShortDevice = initialHeight
    ? initialHeight <= SHORT_DEVICE_HEIGHT
    : false // Height not yet loaded

  return isShortDevice
}
