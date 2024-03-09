import { useQuery } from '@tanstack/react-query';
import { supabase } from 'src/supabaseClient';
import { enqueueSnackbar } from 'notistack';
import { storeSnackbarMessages } from 'src/constants';
import { API_KEYS } from 'src/query/keys/queryConfig';

interface UseGetStoreProps {
  id: string;
}

const useGetStore = ({ id }: UseGetStoreProps) => {
  const getStore = async ({ id }: {id: string}) => {
    const { data } = await supabase.from('stores').select('*').eq('id', id).single().throwOnError();

    return data;
  };

  const { 
    isLoading: storeIsLoading, 
    isFetching: storeIsFetching,
    data: store, 
    isError: storeIsError,
  } = useQuery({
    queryKey: [API_KEYS.FETCH_STORE, {id}],
    queryFn: () => getStore({ id }),
    throwOnError: () => { 
      enqueueSnackbar(storeSnackbarMessages.errors.detail, {variant: 'error'}) 
      return true;
    }
  });

  return { 
    storeIsLoading, 
    storeIsFetching,
    storeIsError,
    store
  };
};

export default useGetStore;