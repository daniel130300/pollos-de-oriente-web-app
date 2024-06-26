import { useSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "src/supabaseClient";
import { productSnackbarMessages } from "src/constants/snackbarMessages";
import { useQueryClient } from "@tanstack/react-query";
import { API_KEYS } from "src/query/keys/queryConfig";
import { useState } from "react";
import { useModalStore } from "src/stores/useModalStore";
import { Product } from './interface';
import { generateTimestampTZ } from "src/utils";

const useDeleteProduct = () => {
  const [productToDelete, setProductToDelete] = useState<null | any>(null);
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { handleClose } = useModalStore();
  
  const {
    isPending,
    mutate
  } = useMutation(
    {
      mutationFn: async(values: Product) => {
        const { data } = await supabase
                              .from('products')
                              .update({
                                deleted_at: generateTimestampTZ()
                              })
                              .eq('id', values.id)
                              .throwOnError()
        return data;
      },
      onSuccess: () => {
        setProductToDelete(null);
        queryClient.invalidateQueries({queryKey: [API_KEYS.FETCH_PRODUCTS]})
        handleClose();
        enqueueSnackbar(productSnackbarMessages.success.delete, { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar(productSnackbarMessages.errors.delete, { variant: 'error' });
      }
    }
  );

  return {
    productToDelete, 
    setProductToDelete,
    mutate,
    isLoading: isPending,
  };
};

export default useDeleteProduct;