import * as React from 'react'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { ThemeProvider } from '@opengovsg/design-system-react'
import { QueryClient, QueryClientProvider } from 'react-query'

import AppRouter from 'router/AppRouter'

// Import our providers
import { AuthenticationStateProvider } from 'data/Authentication'

// TODO: implement localisation
// import 'services/localisation/i18n'

// TODO: implement DataDog

// TODO: remove after testing

const queryClient = new QueryClient()

// <QueryClientProvider client={queryClient}>
//   <AuthenticationStateProvider>
//     <NavigationRouter />
//   </AuthenticationStateProvider>
// </QueryClientProvider>
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <ThemeProvider>
        <ColorModeProvider>
          <AuthenticationStateProvider>
            <AppRouter />
          </AuthenticationStateProvider>
        </ColorModeProvider>
      </ThemeProvider>
    </ChakraProvider>
  </QueryClientProvider>
)

export default App
