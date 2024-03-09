import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { supabase } from 'src/supabaseClient';
import { enqueueSnackbar } from 'notistack';
import { storeSnackbarMessages } from 'src/constants';
import { API_KEYS } from 'src/query/keys/queryConfig';

interface UseGetStoresProps {
  page: number;
  rowsPerPage: number;
  search: string;
}

const useGetStores = ({ page, rowsPerPage, search = '' }: UseGetStoresProps) => {
  const getStores = async ({ page, rowsPerPage, search = '' }: UseGetStoresProps) => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage - 1;

    let query = supabase.from('stores').select('*');

    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    query = query.order('created_at', { ascending: false }).range(start, end);

    const { data } = await query.throwOnError();

    return data;
  };

  const getStoresCount = async ({ search = ''}) => {
    let countQuery = supabase.from('stores').select('*', { count: 'exact', head: true });

    if (search) {
      countQuery = countQuery.ilike('name', `%${search}%`);
    }

    const { count } = await countQuery.throwOnError();

    return count;
  };

  const { isLoading: storesIsLoading, isError: storesIsError, data: stores } = useQuery(
    {
      queryKey: [API_KEYS.FETCH_STORES, {page, rowsPerPage, search}],
      queryFn: () => getStores({page, rowsPerPage, search}),
      placeholderData: keepPreviousData,
      throwOnError: () => {
        enqueueSnackbar(storeSnackbarMessages.errors.list, { variant: 'error' });
        return true;
      }
    }
  );
  
  const { isLoading: storesCountIsLoading, isError: storesCountIsError, data: storesCount } = useQuery(
    {
      queryKey: [API_KEYS.FETCH_STORES_COUNT, search],
      queryFn: () => getStoresCount({ search }),
      throwOnError: () => {
        enqueueSnackbar(storeSnackbarMessages.errors.count, { variant: 'error' });
        return true;
      }
    }
  );

  return { 
    storesIsLoading, 
    storesIsError, 
    stores, 
    storesCountIsLoading, 
    storesCountIsError, 
    storesCount 
  };
};

export default useGetStores;