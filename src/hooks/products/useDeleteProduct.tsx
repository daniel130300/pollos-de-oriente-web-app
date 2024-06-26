import { productSnackbarMessages } from "src/constants/snackbarMessages";
import { API_KEYS } from "src/query/keys/queryConfig";
import { Product } from "./interface";
import useDeleteEntity from "../common/useDeleteEntity";

const useDeleteProduct = () => {
  const {  
    entityToDelete: productToDelete,
    setEntityToDelete: setProductToDelete,
    mutate,
    isLoading, 
  } = useDeleteEntity<Product>({
    entityName: 'products',
    queryKey: API_KEYS.FETCH_PRODUCTS,
    successMessage: productSnackbarMessages.success.delete,
    errorMessage: productSnackbarMessages.errors.delete,
  });

  return {
    productToDelete,
    setProductToDelete,
    mutate,
    isLoading
  }
};

export default useDeleteProduct;