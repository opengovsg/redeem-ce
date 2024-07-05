import Infobox from 'components/Infobox'
import React from 'react'
import { Button, Icon, Box } from '@chakra-ui/react'
import { BiRightArrowAlt } from 'react-icons/bi'

import type { RequireAllOrNone } from 'type-fest'

type CheckerResultProps = RequireAllOrNone<
  {
    text: React.ReactNode
    id: string
    showIcon?: boolean
    onClickDetails?: () => void
    buttonText?: string
  },
  'onClickDetails' | 'buttonText' | 'showIcon'
>

const CheckerResult = ({
  text,
  id,
  onClickDetails,
  buttonText,
  showIcon,
}: CheckerResultProps) => {
  const iconProps = showIcon
    ? { rightIcon: <Icon as={BiRightArrowAlt} width="24px" height="24px" /> }
    : {}

  return (
    <Box width="100%" id={id}>
      <Infobox
        text={text}
        button={
          onClickDetails && (
            <Button
              colorScheme="warning"
              onClick={onClickDetails}
              {...iconProps}
            >
              {buttonText}
            </Button>
          )
        }
        variant="warning"
      />
    </Box>
  )
}

export default CheckerResult
