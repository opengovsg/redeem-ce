const path = require('path')

// Config file to deal with translations only.
// TODO: Look into 'identical-keys' for typescript.
module.exports = {
  extends: ['plugin:i18n-json/recommended'],
  rules: {
    'i18n-json/valid-message-syntax': [
      2,
      {
        syntax: path.resolve('./trans-syntax-custom'),
      },
    ],
  },
}
