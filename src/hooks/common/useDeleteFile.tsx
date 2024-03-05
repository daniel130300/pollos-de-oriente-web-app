import { useSnackbar } from 'notistack';
import { supabase } from 'src/supabaseClient';
import { useMutation } from '@tanstack/react-query';
import { productSnackbarMessages } from 'src/constants';
import { useQueryClient } from '@tanstack/react-query';

interface deleteFile {
  id: string;
  tableName: string;
  bucket_id: string;
  file_name: string;
  invalidators?: readonly string[];
}

const useDeleteFile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const {
    isPending,
    mutate,
    mutateAsync,
  } = useMutation(
    {
      mutationFn: async(values: deleteFile) => {
        const { error: deleteFromBucketError } = await supabase
        .storage
        .from(values.bucket_id)
        .remove([values.file_name])

        if (deleteFromBucketError) {
          throw deleteFromBucketError;
        }

        await supabase
        .from(values.tableName)
        .update({bucket_id: null, file_name: null})
        .eq('id', values.id)
        .select()
        .throwOnError()

        return values;
      },
      onSuccess: (data) => {
        if (data.invalidators) queryClient.invalidateQueries({queryKey: data.invalidators})
        enqueueSnackbar(productSnackbarMessages.success.imageDelete, { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar(productSnackbarMessages.errors.imageDelete, { variant: 'error' });
      }
    }
  );

  return {
    isLoading: isPending,
    mutate,
    mutateAsync
  };
};

export default useDeleteFile;