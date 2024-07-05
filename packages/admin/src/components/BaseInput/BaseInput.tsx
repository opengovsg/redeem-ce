import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react'
import React from 'react'

type BaseInputProps = {
  rightElement?: React.ReactNode
  leftElement?: React.ReactNode
} & InputProps

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ leftElement, rightElement, ...inputPropsRest }, ref) => {
    return (
      <InputGroup>
        {!!leftElement && <InputLeftElement children={leftElement} />}
        <Input ref={ref} {...inputPropsRest} />
        {!!rightElement && <InputRightElement children={rightElement} />}
      </InputGroup>
    )
  }
)
BaseInput.displayName = 'BaseInput'

export default BaseInput
