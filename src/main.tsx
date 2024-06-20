import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import '../index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './query/queryClient';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { SnackbarProvider } from 'notistack';
import { styled } from '@mui/material';

// Create a new router instance
const router = createRouter({
  routeTree,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const StyledSnackbarProvider = styled(SnackbarProvider)`
  &.SnackbarItem-contentRoot {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
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
  </React.StrictMode>,
);
