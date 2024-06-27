import { useQuery } from '@tanstack/react-query';
import { supabase } from 'src/supabaseClient';
import { enqueueSnackbar } from 'notistack';

interface UseGetEntityProps {
  id: string;
  entity: string;
  queryKey: string;
  snackbarMessages: {
    errors: {
      detail: string;
    };
  };
  processData?: (data: any) => any;
}

const useGetEntity = ({
  id,
  entity,
  queryKey,
  snackbarMessages,
  processData,
}: UseGetEntityProps) => {
  const getEntity = async () => {
    const { data, error } = await supabase
      .from(entity)
      .select('*')
      .eq('id', id)
      .single()
      .throwOnError();
    if (error) {
      throw error;
    }
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
