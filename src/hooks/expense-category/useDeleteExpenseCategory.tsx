import { expenseCategorySnackbarMessages } from 'src/constants/snackbarMessages';
import { API_KEYS } from 'src/query/keys/queryConfig';
import { ExpenseCategory } from './interface';
import useSoftDeleteEntity from '../common/useSoftDeleteEntity';

const useDeleteExpenseCategory = () => {
  const {
    entityToDelete: expenseCategoryToDelete,
    setEntityToDelete: setExpenseCategoryToDelete,
    mutate,
    isLoading,
  } = useSoftDeleteEntity<ExpenseCategory>({
    entityName: 'expense_categories',
    queryKey: API_KEYS.FETCH_EXPENSE_CATEGORIES,
    successMessage: expenseCategorySnackbarMessages.success.delete,
    errorMessage: expenseCategorySnackbarMessages.errors.delete,
    entityDisplayName: 'Categoría de Gasto',
  });

  return {
    expenseCategoryToDelete,
    setExpenseCategoryToDelete,
    mutate,
    isLoading,
  };
};

export default useDeleteExpenseCategory;
