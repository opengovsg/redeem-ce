import { Box, Flex, HStack, VStack, Checkbox, Text } from '@chakra-ui/react'
import React from 'react'

type PermissionsOptionProps = {
  value: string
  label: string
  description: string
  isSelected?: boolean
  isDisabled?: boolean
}

const PermissionsOption: React.FC<PermissionsOptionProps> = ({
  value,
  label,
  description,
  isSelected,
  isDisabled,
}) => {
  return (
    <Box as="label" width="100%" cursor={isDisabled ? 'auto' : 'pointer'}>
      <Flex
        flexDirection="column"
        width="100%"
        background={isSelected ? 'primary.100' : 'none'}
        paddingX="48px"
        paddingY="20px"
      >
        <HStack align="start" spacing="20px">
          <Checkbox
            isChecked={isSelected}
            isDisabled={isDisabled}
            value={value}
          />
          <VStack align="start" spacing="4px">
            <Text textStyle="subhead1" color="neutral.900">
              {label}
            </Text>
            <Text textStyle="body1" color="neutral.700">
              {description}
            </Text>
          </VStack>
        </HStack>
      </Flex>
    </Box>
  )
}

export default PermissionsOption
