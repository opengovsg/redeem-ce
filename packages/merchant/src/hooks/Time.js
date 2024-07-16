import { useEffect, useState } from 'react'
import moment from 'moment-timezone'

moment.tz.setDefault('Asia/Singapore')

export default function useTime(refreshCycle = 1000) {
  // Returns the current time
  // and queues re-renders every `refreshCycle` milliseconds (default: 1000ms)

  const [now, setNow] = useState(moment())

  useEffect(() => {
    // Regularly set time in state
    // (this will cause your component to re-render frequently)
    const intervalId = setInterval(() => setNow(moment()), refreshCycle)

    // Cleanup interval
    return () => clearInterval(intervalId)

    // Specify dependencies for useEffect
  }, [refreshCycle, setNow])

  return now
}
