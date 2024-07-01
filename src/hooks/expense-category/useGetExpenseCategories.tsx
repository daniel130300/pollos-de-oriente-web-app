import { useEffect, useState } from 'react';
import usePagination from 'src/hooks/common/usePagination';
import useGetData from 'src/hooks/common/useGetEntity';
import { API_KEYS } from 'src/query/keys/queryConfig';
import { expenseCategorySnackbarMessages } from 'src/constants/snackbarMessages';

const useGetExpenseCategories = ({
  searchTerm = '',
}: { searchTerm?: string } = {}) => {
  const { page, handleChangePage, rowsPerPage, handleChangeRowsPerPage } =
    usePagination();

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (searchTerm) {
      setSearch(searchTerm);
    }
  }, [searchTerm]);

  const {
    data: expenseCategories,
    dataIsLoading: expenseCategoriesIsLoading,
    dataCount: expenseCategoriesCount,
    dataCountIsLoading: expenseCategoriesCountIsLoading,
  } = useGetData({
    page,
    rowsPerPage,
    search,
    dataQueryKey: API_KEYS.FETCH_EXPENSE_CATEGORIES,
    countQueryKey: API_KEYS.FETCH_EXPENSE_CATEGORIES_COUNT,
    entity: 'expense_categories',
    snackbarMessages: expenseCategorySnackbarMessages,
  });

  return {
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    search,
    setSearch,
    expenseCategories,
    expenseCategoriesIsLoading,
    expenseCategoriesCount,
    expenseCategoriesCountIsLoading,
  };
};

export default useGetExpenseCategories;
