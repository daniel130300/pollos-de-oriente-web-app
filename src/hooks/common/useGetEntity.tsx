import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { supabase } from 'src/supabaseClient';
import { enqueueSnackbar } from 'notistack';

interface UseGetEntityProps {
  page: number;
  dataQueryKey: string | readonly string[];
  countQueryKey: string | readonly string[];
  rowsPerPage: number;
  search?: string;
  searchField?: string;
  entity: string;
  selectStatement?: string;
  snackbarMessages: {
    errors: {
      list: string;
      count: string;
    };
  };
}

const useGetData = ({ 
  page,
  rowsPerPage,
  search = '', 
  searchField = 'name',
  entity,
  selectStatement = '*',
  snackbarMessages,
  dataQueryKey,
  countQueryKey
} : UseGetEntityProps) => {

  const getEntity = async () => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage - 1;

    let query = supabase.from(entity).select(selectStatement);

    if (search) {
      query = query.ilike(searchField, `%${search}%`);
    }

    query = query.order('created_at', { ascending: false }).range(start, end);

    const { data } = await query.throwOnError();

    return data;
  };

  const getEntityCount = async () => {
    let countQuery = supabase.from(entity).select(selectStatement, { count: 'exact', head: true });

    if (search) {
      countQuery = countQuery.ilike(searchField, `%${search}%`);
    }

    const { count } = await countQuery.throwOnError();

    return count;
  };

  const { isLoading: dataIsLoading, isError: dataIsError, data } = useQuery(
    {
      queryKey: [dataQueryKey, {page, rowsPerPage, search}],
      queryFn: () => getEntity(),
      placeholderData: keepPreviousData,
      throwOnError: () => {
        enqueueSnackbar(snackbarMessages.errors.list, { variant: 'error' });
        return true;
      }
    }
  );
  
  const { isLoading: dataCountIsLoading, isError: dataCountIsError, data: dataCount } = useQuery(
    {
      queryKey: [countQueryKey, search],
      queryFn: () => getEntityCount(),
      throwOnError: () => {
        enqueueSnackbar(snackbarMessages.errors.count, { variant: 'error' });
        return true;
      }
    }
  );

  return { 
    dataIsLoading, 
    dataIsError, 
    data, 
    dataCountIsLoading, 
    dataCountIsError, 
    dataCount 
  };
};

export default useGetData;