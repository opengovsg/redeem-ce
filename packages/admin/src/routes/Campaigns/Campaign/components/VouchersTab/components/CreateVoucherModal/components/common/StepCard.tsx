import { VStack, Text, Divider, HStack, StackProps } from '@chakra-ui/react'
import Card from 'components/Card'
import React from 'react'

type StepCardProps = {
  header: string
  cardBody: React.ReactNode
  cardFooter: React.ReactNode
  vStackPadding?: string
} & StackProps

const StepCard = ({
  header,
  cardBody,
  cardFooter,
  vStackPadding = '40px 32px',
  ...props
}: StepCardProps) => {
  return (
    <Card
      width="568px"
      margin="0 auto !important"
      spacing={0}
      {...props}
      borderColor="neutral.300"
    >
      <VStack align="start" width="100%" padding={vStackPadding} spacing="24px">
        <Text textStyle="h3" color="neutral.900">
          {header}
        </Text>
        {cardBody}
      </VStack>
      <Divider />
      <HStack
        justifyContent="flex-end"
        width="100%"
        padding="12px 32px"
        spacing="8px"
      >
        {cardFooter}
      </HStack>
    </Card>
  )
}

export default StepCard
