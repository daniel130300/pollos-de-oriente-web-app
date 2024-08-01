import { QueryClient } from '@tanstack/react-query';
import { getMinutesInMilliSeconds } from 'src/utils';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchInterval: getMinutesInMilliSeconds(5),
      gcTime: getMinutesInMilliSeconds(5),
    },
    mutations: {
      retry: 0,
    },
  },
});
