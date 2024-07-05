import React from 'react'
import { HStack, Text } from '@chakra-ui/react'
import { OperationsHeaderProps } from '../types'
import { DownloadCSVTemplate } from './DownloadCSVTemplate'
import { RequiredFields } from './RequiredFields'

export const OperationsHeader = ({
  operation,
}: OperationsHeaderProps): JSX.Element => {
  return (
    <>
      <Text textStyle="h3">{operation.verboseTitle}</Text>
      <HStack
        alignItems="flex-end"
        justifyContent="space-between"
        width="100%"
        spacing={6}
      >
        <RequiredFields expectedParams={operation.expectedParams} />
        {operation.csv ? (
          <DownloadCSVTemplate csv={operation.csv} csvName={operation.path} />
        ) : null}
      </HStack>
    </>
  )
}
