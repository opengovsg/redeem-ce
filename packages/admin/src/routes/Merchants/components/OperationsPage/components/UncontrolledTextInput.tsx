import React from 'react'
import { Text, Input } from '@chakra-ui/react'
import { UncontrolledTextInputProps } from '../types'

export const UncontrolledTextInput = ({
  title,
  template,
  setText,
}: UncontrolledTextInputProps): JSX.Element => {
  return (
    <>
      <Text textStyle="subhead1" marginBottom="12px" color="neutral.900">
        {title}
      </Text>
      <Input
        placeholder={template}
        onChange={(event) => setText(event.target.value)}
      />
    </>
  )
}
