import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  InputProps,
  HStack,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { RegisterOptions, useFormContext, Controller } from 'react-hook-form'
import errorCircleSolid from 'img/error-circle-solid.svg'
import BaseInput from 'components/BaseInput'

type FormInputProps = {
  name: string
  label: string | React.ReactNode
  registerOptions?: RegisterOptions
  inputProps?: InputProps
  inputRightElement?: React.ReactNode
  inputLeftElement?: React.ReactNode
  defaultValue?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  isInputValid?: (input: string) => boolean
  transformInput?: (input: string) => string
  labelMarginBottom?: string
  customOnBlur?: () => void
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  registerOptions,
  inputProps,
  inputRightElement,
  inputLeftElement,
  onChange,
  defaultValue = '',
  isInputValid = () => true,
  transformInput = (input) => input,
  labelMarginBottom = '8px',
  customOnBlur,
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      rules={registerOptions}
      defaultValue={defaultValue}
      render={({
        field: { onChange: onFormChange, onBlur, value },
        fieldState: { error }, // invalid, isTouched, isDirty,
      }) => (
        <FormControl isInvalid={!!error}>
          <FormLabel marginBottom={labelMarginBottom} htmlFor={name}>
            {label}
          </FormLabel>
          <BaseInput
            id={name}
            value={value}
            onChange={(e) => {
              const newVal = transformInput(e.target.value)
              if (value === newVal) {
                return
              }
              e.target.value = isInputValid(newVal) ? newVal : value || '' // Can be undefined before first character input
              onFormChange(e)
              onChange?.(e)
            }}
            onBlur={() => {
              customOnBlur?.()
              onBlur()
            }}
            rightElement={inputRightElement}
            leftElement={inputLeftElement}
            {...inputProps}
          />
          <FormErrorMessage>
            {!!error && (
              <HStack align="start" spacing="8px">
                <Image
                  width="1rem"
                  height="1rem"
                  marginTop="2px"
                  src={errorCircleSolid}
                />
                <Text textStyle="body2">{error.message}</Text>
              </HStack>
            )}
          </FormErrorMessage>
        </FormControl>
      )}
    />
  )
}

export default FormInput
