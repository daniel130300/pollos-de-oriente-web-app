import { storeSnackbarMessages } from 'src/constants/snackbarMessages';
import { API_KEYS } from 'src/query/keys/queryConfig';
import { Store } from './interface';
import useSoftDeleteEntity from '../common/useSoftDeleteEntity';

const useDeleteStore = () => {
  const {
    entityToDelete: storeToDelete,
    setEntityToDelete: setStoreToDelete,
    mutate,
    isLoading,
  } = useSoftDeleteEntity<Store>({
    entityName: 'establishments',
    queryKey: API_KEYS.FETCH_STORES,
    successMessage: storeSnackbarMessages.success.delete,
    errorMessage: storeSnackbarMessages.errors.delete,
    entityDisplayName: 'Tienda',
  });

  return {
    storeToDelete,
    setStoreToDelete,
    mutate,
    isLoading,
  };
};

export default useDeleteStore;
