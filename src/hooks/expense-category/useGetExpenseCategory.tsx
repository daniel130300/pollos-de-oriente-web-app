import { API_KEYS } from 'src/query/keys/queryConfig';
import { expenseCategorySnackbarMessages } from 'src/constants';
import useGetSingleEntity from 'src/hooks/common/useGetSingleEntity';

const useGetExpenseCategory = ({ id }: { id: string }) => {
  const {
    isLoading: expenseCategoryIsLoading,
    isFetching: expenseCategoryIsFetching,
    isError: expenseCategoryIsError,
    data: expenseCategory,
  } = useGetSingleEntity({
    id,
    entity: 'expense_categories',
    queryKey: API_KEYS.FETCH_EXPENSE_CATEGORY,
    snackbarMessages: expenseCategorySnackbarMessages,
  });

  return {
    expenseCategoryIsLoading,
    expenseCategoryIsFetching,
    expenseCategoryIsError,
    expenseCategory,
  };
};

export default useGetExpenseCategory;
