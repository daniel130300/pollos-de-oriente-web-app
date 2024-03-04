import { useSnackbar } from 'notistack';
import { supabase } from 'src/supabaseClient';
import { useMutation } from '@tanstack/react-query';
import { productEnqueue } from 'src/localization';

interface deleteFile {
  id: string;
  from: string;
  bucket_id: string;
  file_name: string;
}

const useDeleteFile = () => {
  const { enqueueSnackbar } = useSnackbar();

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
        .from(values.from)
        .update({bucket_id: '', file_name: ''})
        .eq('id', values.id)
        .select()
        .throwOnError()

      },
      onSuccess: () => {
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