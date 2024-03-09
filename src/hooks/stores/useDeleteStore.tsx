import { useSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "src/supabaseClient";
import { storeSnackbarMessages } from "src/constants/snackbarMessages";
import { useQueryClient } from "@tanstack/react-query";
import { API_KEYS } from "src/query/keys/queryConfig";
import { useState } from "react";
import { useModalStore } from "src/components/zustand/useModalStore";
import { Store } from './interface';

const useDeleteStore = () => {
  const [storeToDelete, setStoreToDelete] = useState<null | any>(null);
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { handleClose } = useModalStore();
  
  const {
    isPending,
    mutate
  } = useMutation(
    {
      mutationFn: async(values: Store) => {
        const { data } = await supabase
                              .from('stores')
                              .delete()
                              .eq('id', values.id)
                              .throwOnError()
        return data;
      },
      onSuccess: () => {
        setStoreToDelete(null);
        queryClient.invalidateQueries({queryKey: [API_KEYS.FETCH_STORES]})
        handleClose();
        enqueueSnackbar(storeSnackbarMessages.success.delete, { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar(storeSnackbarMessages.errors.delete, { variant: 'error' });
      }
    }
  );

  return {
    storeToDelete, 
    setStoreToDelete,
    mutate,
    isLoading: isPending,
  };
};

export default useDeleteStore;