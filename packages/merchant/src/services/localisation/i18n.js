import _ from 'lodash'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import {
  saveSelectedLanguageKey,
  loadSelectedLanguageKey,
} from 'services/storage'

// Import all languages
import * as Languages from 'services/localisation/languages'

// Gives locale of browser
let browserLocale = navigator.languages[0]
if (!browserLocale) {
  browserLocale = 'en' // Default to english if undefined
}

const deviceLanguage = String(browserLocale).substring(0, 2)
console.log('Device Language: ', deviceLanguage)

// The list of supported language mapped to its keys
export const LANGUAGES = {
  ENGLISH: 'en',
  CHINESE: 'zh',
  MALAY: 'ms',
  TAMIL: 'ta',
}

export const LANGUAGE_DISPLAY = {
  en: 'English',
  zh: '中文',
  ms: 'Bahasa Melayu',
  ta: 'தமிழ்',
}

const resources = {
  en: {},
  zh: Languages.translationsZH,
  ms: Languages.translationsMS,
  ta: Languages.translationsTA,
}

const i18nDefaultOptions = {
  resources,
  fallbackLng: 'en', // no en translations, it defaults to use keys which are the english text
  debug: false, // enable if need to debug during development
  lng: deviceLanguage,
  keySeparator: false, // we do not use keys in form messages.welcome
  interpolation: {
    escapeValue: false, // react already safe from xss
  },
}

// Read if there's a saved language from storage, then init i18n with the
// saved language if it exists.
// If fail to read from storage, init i18n using default options
const savedLanguageKey = loadSelectedLanguageKey()
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    ...i18nDefaultOptions,
    ...(savedLanguageKey && { lng: savedLanguageKey }),
  })

// This function switches the app language by switching the i18n translation used.
// It also saved the selected language to storage to persist it after app closes
export function changeLanguage(language) {
  // If language is not one of the supported languages, just return
  if (
    !_.find(LANGUAGES, (supportedLanguage) => supportedLanguage === language)
  ) {
    console.log(`Language: ${language} is not supported`)
    return
  }
  // Save the language to storage. Catch and swallow errors as it's not
  // important if this fails
  try {
    saveSelectedLanguageKey(language)
  } catch {
    console.log('[ERROR] Could not save selected language to storage')
  }
  i18n.changeLanguage(language)
}

export default i18n
