import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'

type ScrollToTopOnPathChangeProps = Record<string, never>

const ScrollToTopOnPathChange: React.FC<ScrollToTopOnPathChangeProps> = () => {
  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTopOnPathChange
