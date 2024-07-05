import React from 'react'
import { Button, Flex, Icon, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'

type TileProps = {
  id: string
  subtitle: string
  title: string
  isSelected: boolean
  icon: IconType
  onClick: () => void
}

export default function Tile({
  id,
  subtitle,
  title,
  icon,
  isSelected,
  onClick,
}: TileProps) {
  return (
    <Button
      alignItems="flex-start"
      width="100%"
      height="fit-content"
      background={isSelected ? 'primary.100' : 'white'}
      borderRadius="4px"
      // Chakra dont play well we using the color palette in such shorthands. Also normal css when separating the colours using outlineColors, it doesnt work
      // This is to prevent overwrite from js-focus-visible in App.tsx of removing outline on click
      outline={
        isSelected
          ? '3px solid #505798 !important'
          : '1px solid #E1E2E4 !important'
      }
      id={id}
      onClick={onClick}
      paddingInlineEnd={0}
      paddingInlineStart={0}
      variant="unstyled"
    >
      <Flex flexDirection="column" padding="23px">
        <Icon as={icon} width="40px" height="40px" color="neutral.800" />
        <Text
          textStyle="h5"
          marginTop="16px"
          color="neutral.900"
          whiteSpace="pre-wrap"
          noOfLines={1}
        >
          {title}
        </Text>
        <Text
          textStyle="body2"
          height="2.5rem"
          marginTop="8px"
          color="neutral.700"
          whiteSpace="pre-wrap"
          noOfLines={2}
        >
          {subtitle}
        </Text>
      </Flex>
    </Button>
  )
}
