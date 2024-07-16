import _ from 'lodash'
import VALIDATE from 'constants/validate'
import I18N_KEYS from 'constants/i18n-keys'
import { MERCHANT_CODE_NOT_FOUND } from './errors/merchant'
import { OTP_INVALID } from './errors/otp'

// helper functions
const hasWhitespace = (text) => /\s/.test(text)

// validators
export const validateName = (name) => {
  if (
    !name ||
    name.length <= 0 ||
    name.length > VALIDATE.USER.NAME_MAX_LENGTH
  ) {
    return {
      name,
      isValid: false,
      error: `Please enter a name between 1 and ${VALIDATE.USER.NAME_MAX_LENGTH} characters.`,
    }
  }
  return {
    name,
    isValid: true,
    error: null,
  }
}

export const validateShopCode = (code) => {
  if (code.length !== VALIDATE.SHOP.CODE_LENGTH) {
    return {
      code,
      isValid: false,
      error: MERCHANT_CODE_NOT_FOUND.MESSAGE,
    }
  }
  return {
    code,
    isValid: true,
    error: null,
  }
}

export const validateOTP = (otp) => {
  // ensure otp keyed in is a proper number
  if (hasWhitespace(otp) || Number.isNaN(_.toNumber(otp))) {
    return {
      otp,
      isValid: false,
      error: OTP_INVALID.MESSAGE,
    }
  }
  return {
    otp,
    isValid: true,
    error: null,
  }
}

export const validatePhoneNumber = (phoneNumber, extensionLength) => {
  // 1. guard text is of correct length (excluding extension length)
  if (phoneNumber.length - extensionLength !== VALIDATE.PHONE_NUMBER_LENGTH) {
    return {
      phoneNumber,
      isValid: false,
      error: I18N_KEYS.OTP_MOBILE.TEXT.INVALID_MOBILE_NUM_TEXT,
    }
  }

  // 2. check if text has no whitespace
  // NOTE: PhoneNumberInput already strips whitespace from input, so no
  // checks are required!

  // if all conditions met, phone number is valid
  return {
    phoneNumber,
    isValid: true,
    error: null,
  }
}
