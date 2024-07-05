import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Text, VStack } from '@chakra-ui/react'

type TabErrorBoundary = {
  children: React.ReactNode
  tabName: string
}

const TabErrorBoundary = ({ children, tabName }: TabErrorBoundary) => {
  return (
    <ErrorBoundary
      fallback={
        <VStack align="start" margin="32px">
          <Text textStyle="h2">Something went wrong...</Text>
          <Text>
            {`We are currently unable to display ${tabName} currently. Please contact the administrators.`}
          </Text>
        </VStack>
      }
    >
      {children}
    </ErrorBoundary>
  )
}

export default TabErrorBoundary
