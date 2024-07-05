import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import {
  InvalidRecipientIdError,
  splitRecipientIdForMasking,
  SplittedRecipientIdForMasking,
} from 'helpers/recipient-id'
import MaskedOnMonitoring from 'components/MaskedOnMonitoring'

type RecipientIdDisplayProps = {
  id?: string
  recipientId?: string | null
  fallbackElement?: string | JSX.Element
  color?: string
  textStyle?: string
}

const MaskedIdDisplay = ({
  id,
  recipientId,
  fallbackElement,
  color,
  textStyle,
}: RecipientIdDisplayProps) => {
  const shouldMask = !!recipientId?.length
  let splittedRecipientIdForMasking: SplittedRecipientIdForMasking | null = null
  try {
    splittedRecipientIdForMasking = shouldMask
      ? splitRecipientIdForMasking(recipientId)
      : null
  } catch (e) {
    // Ignore if recipient id invalid, Just don't mask
    if (!(e instanceof InvalidRecipientIdError)) {
      throw e
    }
  }
  // If recipient id field cannot be masked for any reason
  if (!splittedRecipientIdForMasking) {
    if (!recipientId?.length && fallbackElement) {
      // recipient id field is blank and empty element is configured, render empty element
      // Fragment to convert to react element
      // eslint-disable-next-line react/jsx-no-useless-fragment
      return <>{fallbackElement}</>
    }

    // Otherwise, just show recipient id in full
    return (
      <Text as="span" id={id}>
        {recipientId}
      </Text>
    )
  }

  // Otherwise, mask
  return (
    <Box as="span" textStyle={textStyle} display="inline" color={color} id={id}>
      <MaskedOnMonitoring>
        <Text as="span" id="masked-recipient-id-component">
          {splittedRecipientIdForMasking.toMask}
        </Text>
      </MaskedOnMonitoring>
      <Text as="span" id="unmasked-recipient-id-component">
        {splittedRecipientIdForMasking.toShow}
      </Text>
    </Box>
  )
}

export default MaskedIdDisplay
