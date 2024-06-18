import {useEffect} from 'react'
import {useLocation, useSearchParams} from 'react-router-dom'
import qs from 'qs'

import {changeLanguage} from 'helpers/i18n'
import {DEFAULT_LOCALE, QUERY_STRING_LOCALE_KEY} from 'constants/translation'

/**
 * Detects browser locale and sets language accordingly. Must be put within Router component
 */
const DetectDefaultLanguage = () => {
  const [, setSearchParams] = useSearchParams()
  const location = useLocation()
  // If language does not exist in query string, then insert the browser's language
  // into the query string. If browser language is not avaiable, then the default (en)
  // is used.
  useEffect(() => {
    const query = qs.parse(location.search, {ignoreQueryPrefix: true})
    if (!query[QUERY_STRING_LOCALE_KEY]) {
      changeLanguage(
        navigator?.language || DEFAULT_LOCALE.code,
        setSearchParams,
      )
    }
  }, [history, location.search])
  return <></>
}

export default DetectDefaultLanguage
