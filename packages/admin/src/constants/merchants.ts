// This regular expression was created to comply with standards set out for
// bank transfers to the Development Bank of Singapore (DBS).
// Only characters under DBS' String character set (G_I3) type specified in the
// "DBS SG Fast and Paynow Spec_v4.1.8 (v4)"" are allowed. This is to prevent
// API calls to DBS from being rejected when paying out money to merchants.
const PAYMENT_RELATED_STRING_ALLOWED_SPECIAL_CHARACTERS = Array.from(
  "!#$%&'()*+,-./:;=?@[]^_`{|}~"
)

export const PAYMENT_RELATED_STRING_CHARACTER_REGEX = new RegExp(
  `^[A-Za-z0-9${PAYMENT_RELATED_STRING_ALLOWED_SPECIAL_CHARACTERS.map(
    (char) => `\\${char}`
  ).join()} ]+$`
)

export enum VALID_BANK_NAMES {
  EXAMPLE = 'Example Bank',
}
