import { useQuery } from '@tanstack/react-query';
import { supabase } from 'src/supabaseClient';
import { enqueueSnackbar } from 'notistack';

interface UseGetEntityProps {
  id: string;
  entity: string;
  queryKey: string | readonly string[];
  selectStatement?: string;
  equalField?: string;
  snackbarMessages: {
    errors: {
      detail: string;
    };
  };
  shouldUseSingle?: boolean;
  processData?: (data: any) => any;
}

const useGetEntity = ({
  id,
  entity,
  queryKey,
  snackbarMessages,
  processData,
  selectStatement = '*',
  equalField = 'id',
  shouldUseSingle = true,
}: UseGetEntityProps) => {
  const getEntity = async () => {
    let query = supabase
      .from(entity)
      .select(selectStatement)
      .eq(equalField, id);

    if (shouldUseSingle) {
      (query as any) = query.single();
    }

    const { data, error } = await query.throwOnError();

    if (error) throw error;

    return processData ? processData(data) : data;
  };

  const { isLoading, isFetching, data, isError } = useQuery({
    queryKey: [queryKey, { id }],
    queryFn: getEntity,
    throwOnError: () => {
      enqueueSnackbar(snackbarMessages.errors.detail, { variant: 'error' });
      return true;
    },
  });

  return {
    isLoading,
    isFetching,
    isError,
    data,
  };
};

export default useGetEntity;
