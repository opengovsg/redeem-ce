import React, { FocusEventHandler, HTMLInputTypeAttribute } from 'react'

type InputPropsType = {
  className?: string
  type?: HTMLInputTypeAttribute
  placeholder?: string
  maxLength?: number
  value?: string | number | readonly string[]
  onChange?: (value: string) => void
  id?: string
  required: boolean
  name?: string
  defaultValue?: string | number | readonly string[]
  min?: number
  max?: number
  readOnly?: boolean
  onFocus?: FocusEventHandler<HTMLInputElement>
}

// Email regex from package https://www.npmjs.com/package/email-validator
// Source: https://github.com/manishsaraan/email-validator/blob/master/index.js
const EMAIL_PATTERN =
  "^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$"

const Input = React.forwardRef<HTMLInputElement, InputPropsType>(
  (
    {
      className,
      type = 'text',
      placeholder,
      maxLength,
      value,
      onChange,
      id,
      required,
      name,
      defaultValue,
      min,
      max,
      readOnly = false,
      onFocus,
    },
    ref
  ) => {
    return (
      <input
        id={id}
        className={`legacy-input ${className}`}
        pattern={type === 'email' ? EMAIL_PATTERN : undefined}
        required={required}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange && ((event) => onChange(event.target.value))}
        ref={ref}
        name={name}
        min={min}
        max={max}
        defaultValue={defaultValue}
        readOnly={readOnly}
        onFocus={onFocus}
      />
    )
  }
)
Input.displayName = 'Input'

export default Input
