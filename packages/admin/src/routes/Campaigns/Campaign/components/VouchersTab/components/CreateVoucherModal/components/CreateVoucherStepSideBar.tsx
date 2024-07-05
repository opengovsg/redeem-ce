import { VStack, HStack, Text, Box } from '@chakra-ui/react'
import React from 'react'
import { useVouchersTabContext } from '../../../VouchersTabContext'

const STEPS = [
  'Voucher type',
  'Voucher recipient',
  'Personal details',
  'Confirmation',
] as const

const CreateVoucherStepSideBar = () => {
  const { currentCreateStep } = useVouchersTabContext()

  return (
    <VStack width="240px" paddingLeft="36px" spacing="32px">
      <Text textStyle="subhead3" color="neutral.700" textTransform="uppercase">
        CREATE VOUCHER
      </Text>
      <VStack spacing="24px">
        {STEPS.map((step, i) => {
          const isActive = i === currentCreateStep

          return (
            <HStack
              key={step}
              alignItems="center"
              align="start"
              width="100%"
              spacing="12px"
            >
              <Box
                position="relative"
                width="24px"
                height="24px"
                background={isActive ? 'primary.200' : 'transparent'}
                border={isActive ? 'initial' : '0.75px solid'}
                borderColor={isActive ? 'transparent' : 'neutral.500'}
                borderRadius="50%"
              >
                <Text
                  textStyle="legal"
                  position="absolute"
                  top="50%"
                  left="50%"
                  color={isActive ? 'neutral.900' : 'neutral.500'}
                  transform="translate(-50%, -50%)"
                >
                  {i + 1}
                </Text>
              </Box>
              <Text
                textStyle="subhead2"
                color={isActive ? 'neutral.900' : 'neutral.500'}
                // This is to allow us to query this id during playwright test
                id={`${step.toLowerCase().split(' ').join('-')}-${
                  isActive ? 'active' : 'inactive'
                }`}
              >
                {step}
              </Text>
            </HStack>
          )
        })}
      </VStack>
    </VStack>
  )
}

export default CreateVoucherStepSideBar
