import { combosSnackbarMessages } from 'src/constants/snackbarMessages';
import { API_KEYS } from 'src/query/keys/queryConfig';
import { Combo } from './interface';
import useSoftDeleteEntity from '../common/useSoftDeleteEntity';

const useDeleteCombo = () => {
  const {
    entityToDelete: comboToDelete,
    setEntityToDelete: setComboToDelete,
    mutate,
    isLoading,
  } = useSoftDeleteEntity<Combo>({
    entityName: 'combos',
    queryKey: API_KEYS.FETCH_COMBOS,
    successMessage: combosSnackbarMessages.success.delete,
    errorMessage: combosSnackbarMessages.errors.delete,
    entityDisplayName: 'Combo',
  });

  return {
    comboToDelete,
    setComboToDelete,
    mutate,
    isLoading,
  };
};

export default useDeleteCombo;
