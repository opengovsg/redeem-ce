import KEYS from 'constants/storage'

export function saveUser(user) {
  return localStorage.setItem(KEYS.USER, JSON.stringify(user))
}

export function loadUser() {
  return JSON.parse(localStorage.getItem(KEYS.USER))
}

export function clearUser() {
  return localStorage.removeItem(KEYS.USER)
}

export function saveSelectedLanguageKey(languageKey) {
  return localStorage.setItem(KEYS.SELECTED_LANGUAGE_KEY, languageKey)
}

export function loadSelectedLanguageKey() {
  return localStorage.getItem(KEYS.SELECTED_LANGUAGE_KEY)
}

// ----------------------------------------------------------------------
// Saves whether to show the success join shop modal

// This is needed in storage because only after joining successfully
// is the client able to tell what is the shop name it joined

// Hence, after joining successfully, write to storage to show later
// asynchronously and clear from storage once shown.
export function saveShouldShowSuccessJoinShop(shouldShowSuccessJoinShop) {
  return localStorage.setItem(
    KEYS.SHOULD_SHOW_SUCCESS_JOIN_SHOP,
    JSON.stringify(shouldShowSuccessJoinShop),
  )
}

export function loadShouldShowSuccessJoinShop() {
  return localStorage
    .getItem(KEYS.SHOULD_SHOW_SUCCESS_JOIN_SHOP)
    .then((data) => JSON.parse(data))
}

export function clearAll() {
  return localStorage.clear()
}
