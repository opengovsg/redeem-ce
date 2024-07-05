import Keys from 'constants/storage'

export function saveUser(user) {
  return localStorage.setItem(Keys.USER, JSON.stringify(user))
}

export function loadUser() {
  return JSON.parse(localStorage.getItem(Keys.USER))
}

export function clearUser() {
  return localStorage.removeItem(Keys.USER)
}
