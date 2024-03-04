import { useSnackbar } from 'notistack';
import { supabase } from 'src/supabaseClient';
import { useMutation } from '@tanstack/react-query';
import { productEnqueue } from 'src/localization';
import { useQueryClient } from '@tanstack/react-query';

interface deleteFile {
  id: string;
  tableName: string;
  bucket_id: string;
  file_name: string;
  invalidators?: string[];
}

const useDeleteFile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const {
    isPending,
    mutate
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
        enqueueSnackbar(productEnqueue.success.imageDelete, { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar(productEnqueue.errors.imageDelete, { variant: 'error' });
      }
    }
  );

  return {
    isLoading: isPending,
    mutate
  };
};

export default useDeleteFile;