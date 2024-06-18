import {useLocalStorage} from '@rehooks/local-storage'
import {v4 as uuid} from 'uuid'

export const useBrowserId = () => {
  const [browserId] = useLocalStorage('redeem', uuid())

  return browserId
}
