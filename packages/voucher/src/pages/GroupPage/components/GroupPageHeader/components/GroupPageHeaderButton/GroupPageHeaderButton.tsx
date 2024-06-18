import React from 'react'
import {Button, HStack, Text, Box} from '@chakra-ui/react'
import {textStyles} from 'theme/textStyles'
type GroupPageHeaderButtonProps = {
  backgroundColor: string
  buttonActiveBackgroundColor: string
  datadogActionName: string
  icon: React.ReactElement
  id: string
  isInteractionDisabled: boolean
  onClickAction: () => void
  text: string
}

function GroupPageHeaderButton({
  buttonActiveBackgroundColor,
  backgroundColor,
  datadogActionName,
  icon,
  id,
  isInteractionDisabled,
  onClickAction,
  text,
}: GroupPageHeaderButtonProps) {
  return (
    <Button
      sx={{...textStyles['subhead2']}}
      flex='1'
      padding='10px 14px !important'
      borderRadius='20px'
      _hover={{backgroundColor: buttonActiveBackgroundColor}}
      _active={{backgroundColor: buttonActiveBackgroundColor}}
      whiteSpace='pre-wrap'
      backgroundColor={isInteractionDisabled ? 'neutral.600' : backgroundColor}
      data-dd-action-name={datadogActionName}
      id={id}
      isDisabled={isInteractionDisabled}
      onClick={onClickAction}
    >
      <HStack spacing='4px'>
        {icon}
        <Box>
          <Text as='span'>{text}</Text>
        </Box>
      </HStack>
    </Button>
  )
}

export default GroupPageHeaderButton
