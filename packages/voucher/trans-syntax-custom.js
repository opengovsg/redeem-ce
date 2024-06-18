// Custom translation validator for i18-next
// Taken from https://github.com/godaddy/eslint-plugin-i18n-json/issues/40#issuecomment-842474651
const validate = (message = '') => {
  if (!(message || '').trim()) {
    throw new SyntaxError('Message is Empty.')
  }
  if (typeof message !== 'string') {
    throw new TypeError('Message must be a String.')
  }
  // Checks that the interpolated keys is surrounded correctly with curly brackets
  // and have correct formatting (eg; escaping)
  // See https://www.i18next.com/translation-function/formatting
  if (
    (message.includes('{') || message.includes('}')) &&
    !/{{ ?(?:- |\w+?)(, ?)?\w+? ?}}/g.test(message)
  ) {
    throw new SyntaxError(
      'Interpolation error. See: https://www.i18next.com/misc/json-format and https://www.i18next.com/translation-function/formatting',
    )
  }
  // Checks that translation keys use the correct nesting structure
  // See https://www.i18next.com/translation-function/nesting
  if (message.includes('$t(') && !/\$t\([\w]+:\w+(?:\.\w+)*\)/g.test(message)) {
    throw new SyntaxError(
      'Nesting error. See: https://www.i18next.com/misc/json-format and https://www.i18next.com/translation-function/nesting',
    )
  }
}

// eslint-disable-next-line no-undef
module.exports = validate
