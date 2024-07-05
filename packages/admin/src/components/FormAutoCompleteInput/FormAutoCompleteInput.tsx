import {
  FormControl,
  FormLabel,
  Image,
  Menu,
  MenuButton,
  Flex,
  Input,
  MenuList,
  MenuItem,
  FormErrorMessage,
  useDisclosure,
  Text,
  InputProps,
  HStack,
  Box,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'
import _ from 'lodash'
import React, { useMemo, useRef } from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
import errorCircleSolid from 'img/error-circle-solid.svg'

type AutoCompleteOption = { option: string; description?: string }

type FormAutoCompleteInputProps = {
  id?: string
  autoCompleteOptions: AutoCompleteOption[]
  resultsLimit?: number
  name: string
  label: React.ReactNode
  registerOptions: RegisterOptions
  useOptionNameToMatch?: boolean
  useOptionDescriptionToMatch?: boolean
  onSelectOption?: (option: AutoCompleteOption) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputProps?: InputProps
  inputRightElement?: React.ReactNode
  inputLeftElement?: React.ReactNode
  emptyStateElement?: React.ReactNode
  isInputValid?: (input: string) => boolean
  transformInput?: (input: string) => string
  defaultValue?: string
  placeholder?: string
}

// TODO: Create a "dumb" version of this component with no need for FormContext if necessary
const FormAutoCompleteInput: React.FC<FormAutoCompleteInputProps> = ({
  id,
  autoCompleteOptions,
  resultsLimit = 5,
  name,
  label,
  registerOptions,
  onSelectOption,
  onChange,
  inputProps,
  inputRightElement,
  inputLeftElement,
  emptyStateElement,
  isInputValid = () => true,
  transformInput = (input) => input,
  useOptionNameToMatch = true,
  useOptionDescriptionToMatch = true,
  defaultValue = '',
  placeholder,
}) => {
  const {
    isOpen: isAutoCompleteOpen,
    onClose: onAutoCompleteClose,
    onOpen: onAutoCompleteOpen,
  } = useDisclosure()
  const { control, watch, setValue, trigger } = useFormContext()
  const currentValue = watch(name)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const matchingOptions = useMemo(() => {
    if (!currentValue) {
      return []
    }
    const result = []
    for (let i = 0; i < autoCompleteOptions.length; i += 1) {
      if (result.length >= resultsLimit) {
        break
      }
      const option = autoCompleteOptions[i]
      const stringsToSearch = []
      if (useOptionNameToMatch) {
        stringsToSearch.push(option.option)
      }
      if (useOptionDescriptionToMatch) {
        stringsToSearch.push(option.description)
      }
      if (stringsToSearch.join(' ').includes(currentValue)) {
        result.push(autoCompleteOptions[i])
      }
    }
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue])
  return (
    <Controller
      control={control}
      name={name}
      rules={registerOptions}
      defaultValue={defaultValue}
      render={({
        field: { onChange: onFormChange, onBlur, value, ref: formInputRef },
        fieldState: { error }, // invalid, isTouched, isDirty,
      }) => (
        <FormControl id={id} isInvalid={!!error}>
          {/* Nested box so children 100% excludes FormControl group padding */}
          <Box position="relative" id={id}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Menu
              autoSelect={false}
              gutter={0}
              isOpen={isAutoCompleteOpen}
              onClose={onAutoCompleteClose}
              placement="top"
            >
              <MenuButton
                as={Flex}
                sx={{
                  '& span': {
                    display: 'flex',
                    pointerEvents: 'all',
                  },
                }}
                pointerEvents="all"
                onClick={(e) => {
                  e.preventDefault() // Prevent input from closing the MenuList when clicked
                }}
              >
                <InputGroup>
                  {!!inputLeftElement && (
                    <InputLeftElement children={inputLeftElement} />
                  )}
                  <Input
                    ref={(e) => {
                      formInputRef(e)
                      // To access input ref while passing it to react hook form
                      inputRef.current = e
                    }}
                    id={name}
                    onBlur={onBlur}
                    onChange={(e) => {
                      const newVal = transformInput(e.target.value)
                      if (value === newVal) {
                        return
                      }
                      e.target.value = isInputValid(newVal)
                        ? newVal
                        : value || '' // Can be undefined before first character input
                      onFormChange(e)
                      if (e.target.value) {
                        onAutoCompleteOpen()
                      } else {
                        onAutoCompleteClose()
                      }
                      onChange?.(e)
                    }}
                    onFocus={(e) => {
                      if (e.target.value) {
                        onAutoCompleteOpen()
                      } else {
                        onAutoCompleteClose()
                      }
                    }}
                    placeholder={placeholder}
                    value={value}
                    {...inputProps}
                  />
                  {!!inputRightElement && (
                    <InputRightElement children={inputRightElement} />
                  )}
                </InputGroup>
              </MenuButton>
              <MenuList
                zIndex="dropdown"
                overflowY="auto"
                maxHeight="calc(24.527rem - 64px)"
                // Menu is autofocused when opened, this line forces focus back to the input
                // so that typing is not interrupted when menu is opened
                onFocus={() => {
                  inputRef.current?.focus()
                }}
                rootProps={{ width: '100%', minWidth: '100% !important' }}
              >
                {_.map(matchingOptions, (option) => (
                  <MenuItem
                    key={`${option.option} ${option.description}`}
                    _hover={{ background: 'primary.200' }}
                    onClick={() => {
                      setValue(name, option.option)
                      trigger(name)
                      onSelectOption?.(option)
                    }}
                  >
                    <Flex flexDirection="column">
                      <Text
                        textStyle="subhead1"
                        color="neutral.900"
                        whiteSpace="pre"
                      >
                        {option.option || 'N/A'}
                      </Text>
                      <Text textStyle="body2" color="neutral.800">
                        {option.description}
                      </Text>
                    </Flex>
                  </MenuItem>
                ))}
                {!matchingOptions?.length &&
                  (emptyStateElement ?? (
                    <MenuItem isDisabled>No match found</MenuItem>
                  ))}
              </MenuList>
            </Menu>
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
          </Box>
        </FormControl>
      )}
    />
  )
}

export default FormAutoCompleteInput
