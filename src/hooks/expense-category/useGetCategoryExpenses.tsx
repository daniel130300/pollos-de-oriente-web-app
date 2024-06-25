import { useState } from 'react';
import usePagination from 'src/hooks/common/usePagination';
import useGetData from 'src/hooks/common/useGetData';
import { API_KEYS } from 'src/query/keys/queryConfig';
import { expenseCategorySnackbarMessages } from 'src/constants/snackbarMessages';

export const useGetCategoryExpenses = () => {
  const { 
    page,
    handleChangePage,
    rowsPerPage, 
    handleChangeRowsPerPage
  } = usePagination();

  const [search, setSearch] = useState('');

  const { 
    data: categoryExpenses, 
    dataIsLoading: categoryExpensesIsLoading,
    dataCount: categoryExpensesCount,
    dataCountIsLoading: categoryExpensesCountIsLoading
  } = useGetData({
    page, 
    rowsPerPage, 
    search,
    dataQueryKey: API_KEYS.FETCH_EXPENSES,
    countQueryKey: API_KEYS.FETCH_EXPENSES_COUNT,
    entity: 'expense_categories',
    snackbarMessages: expenseCategorySnackbarMessages
  });

  return {
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    search,
    setSearch,
    categoryExpenses,
    categoryExpensesIsLoading,
    categoryExpensesCount,
    categoryExpensesCountIsLoading
  };
};