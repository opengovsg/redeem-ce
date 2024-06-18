import {QUERY_STRING_LOCALE_KEY, SUPPORTED_LOCALES} from 'constants/translation'
import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import {
  translationsEN,
  translationsMS,
  translationsTA,
  translationsZH,
} from 'locales'
import {NavigateOptions} from 'react-router-dom'

// TODO: Add typescript support for i18n locales
const locales = {
  en: {...translationsEN},
  zh: {...translationsZH},
  ta: {...translationsTA},
  ms: {...translationsMS},
}

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    // take type reference from en locale
    resources: typeof locales.en
  }
}

/**
 * Language translation init
 */
export function initTranslations(): void {
  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      detection: {
        // Read manually configured locale in query string
        order: ['querystring'],
        lookupQuerystring: QUERY_STRING_LOCALE_KEY,
        caches: [], // Disable caching of language in localStorage so it always reads from querystring
      },
      resources: locales,
      supportedLngs: SUPPORTED_LOCALES.map((locale) => locale.code),
      nonExplicitSupportedLngs: true, // Support all locales with supported prefixes
      fallbackLng: 'en',
      returnEmptyString: false,
    })
}

export function changeLanguage(
  localeCode: string,
  setSearchParams: (
    params: Record<string, string>,
    opts: NavigateOptions,
  ) => void,
) {
  i18n.changeLanguage(localeCode)
  setSearchParams(
    {
      [QUERY_STRING_LOCALE_KEY]: localeCode,
    },
    {replace: true},
  )
}
