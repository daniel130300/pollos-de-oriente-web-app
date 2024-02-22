import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ThemeProvider } from '@emotion/react'
import theme from './theme'
import '../index.css'
import { QueryClient, QueryClientProvider } from 'react-query'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { SnackbarProvider } from 'notistack'

// Create a new router instance
const router = createRouter({ routeTree })
const queryClient = new QueryClient()

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider autoHideDuration={2000}>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
)