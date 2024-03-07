import { useQuery } from '@tanstack/react-query';
import { supabase } from 'src/supabaseClient';
import { enqueueSnackbar } from 'notistack';
import { productSnackbarMessages } from 'src/constants';
import { API_KEYS } from 'src/query/keys/queryConfig';

const useGetUser = () => {
  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if(error) throw error

    return data.user;
  };

  const { 
    isLoading: userIsLoading, 
    isFetching: userIsFetching,
    data: user, 
    isError: userIsError,
  } = useQuery({
    queryKey: [API_KEYS.FETCH_USER],
    queryFn: () => getUser(),
    throwOnError: () => { 
      enqueueSnackbar(productSnackbarMessages.errors.detail, {variant: 'error'}) 
      return true;
    }
  });

  return { 
    userIsLoading,
    userIsFetching,
    userIsError,
    user
  };
};

export default useGetUser;