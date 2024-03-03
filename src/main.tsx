import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ThemeProvider } from '@emotion/react'
import theme from './theme'
import '../index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { SnackbarProvider } from 'notistack'
import { styled } from '@mui/material'

// Create a new router instance
const router = createRouter({ 
  routeTree
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { 
      retry: false
    }
  }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const StyledSnackbarProvider = styled(SnackbarProvider)`
  &.SnackbarItem-contentRoot {
    font-family: inherit; 
  }
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <StyledSnackbarProvider 
          autoHideDuration={5000} 
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }} 
          preventDuplicate
        >
          <RouterProvider router={router} />
        </StyledSnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
)