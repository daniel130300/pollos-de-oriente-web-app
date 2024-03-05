import { useSnackbar } from "notistack";
import useDeleteFile from "../common/useDeleteFile";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "src/supabaseClient";
import { productSnackbarMessages } from "src/constants/snackbarMessages";
import { useQueryClient } from "@tanstack/react-query";
import { API_KEYS } from "src/query/keys/queryConfig";
import { useState } from "react";
import { useModalStore } from "src/components/zustand/useModalStore";

interface Product {
  id: string;
  name: string;
  unity: string;
  sale_price: number | string;
  purchase_price: number | string;
  product_image: File | null;
  bucket_id: string | null;
  file_name: string | null
}

const useDeleteProduct = () => {
  const [productToDelete, setProductToDelete] = useState<null | any>(null);
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: mutateDeleteFile, isLoading: deleteImageIsLoading } = useDeleteFile(); 
  const queryClient = useQueryClient();
  const { handleClose } = useModalStore();
  
  const {
    isPending,
    mutate
  } = useMutation(
    {
      mutationFn: async(values: Product) => {
        if (values.bucket_id && values.file_name) {
          await mutateDeleteFile({
            id: values.id,
            tableName: 'products',
            bucket_id: values.bucket_id, 
            file_name: values.file_name
          })
        }

        const { data } = await supabase
                              .from('products')
                              .delete()
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
    deleteImageIsLoading
  };
};

export default useDeleteProduct;