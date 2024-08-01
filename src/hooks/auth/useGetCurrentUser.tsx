import { useQuery } from '@tanstack/react-query';
import { supabase } from 'src/supabaseClient';
import { enqueueSnackbar } from 'notistack';
import { productSnackbarMessages } from 'src/constants';
import { API_KEYS } from 'src/query/keys/queryConfig';
import { User } from '@supabase/supabase-js';

const useGetCurrentUser = () => {
  const getUser = async (): Promise<User | null> => {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    return data.session?.user ?? null;
  };

  const {
    isLoading: userIsLoading,
    isFetching: userIsFetching,
    data: user,
    isError: userIsError,
  } = useQuery({
    queryKey: [API_KEYS.FETCH_CURRENT_USER],
    queryFn: getUser,
    throwOnError: () => {
      enqueueSnackbar(productSnackbarMessages.errors.detail, {
        variant: 'error',
      });
      return true;
    },
  });

  return {
    userIsLoading,
    userIsFetching,
    userIsError,
    user,
  };
};

export default useGetCurrentUser;
