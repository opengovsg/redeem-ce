import React from 'react'
import PropTypes from 'prop-types'
import { HStack, PinInput, PinInputField } from '@chakra-ui/react'

import { OTP } from 'constants/api'

const BORDER_RADIUS = 8

const OTPInputFieldStyle = {
  w: '25%',
  h: 'auto',
  aspectRatio: '1 / 1',
  borderRadius: 0,
  fontSize: '1.5rem',
  fontWeight: 500,
}

// controlled component for OTP Code entry
const OTPInput = ({ value, onChange, onComplete }) => (
  <HStack
    w='fit-content'
    spacing={0}
    borderRadius={BORDER_RADIUS}
    border='3px solid'
  >
    <PinInput
      otp
      value={value}
      placeholder=''
      focusBorderColor='#00000000'
      variant='unstyled'
      onChange={onChange}
      onComplete={onComplete}
    >
      {[...Array(OTP.LENGTH).keys()].map((i) => (
        <PinInputField
          {...OTPInputFieldStyle}
          borderLeft={i === 0 ? 'none' : '1px solid #DDDDDD'}
          key={i}
        />
      ))}
    </PinInput>
  </HStack>
)

OTPInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onComplete: PropTypes.func,
}

export default OTPInput
