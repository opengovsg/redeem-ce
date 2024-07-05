import { useCallback, useState } from 'react'

export const useStopwatch = () => {
  const [startTime, setStartTime] = useState(Date.now())

  const resetAndStart = useCallback(() => {
    setStartTime(Date.now())
  }, [])

  const getCurrentTimeMillis = useCallback(() => {
    return Date.now() - startTime
  }, [startTime])

  return { resetAndStart, getCurrentTimeMillis }
}
