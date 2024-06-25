import { useState } from 'react';
import usePagination from 'src/hooks/common/usePagination';
import useGetData from 'src/hooks/common/useGetData';
import { API_KEYS } from 'src/query/keys/queryConfig';
import { productSnackbarMessages } from 'src/constants';

export const useGetProducts = () => {
  const { 
    page,
    handleChangePage,
    rowsPerPage, 
    handleChangeRowsPerPage
  } = usePagination();

  const [search, setSearch] = useState('');

  const { 
    data: products, 
    dataIsLoading: productsIsLoading, 
    dataCount: productsCount, 
    dataCountIsLoading: productsCountIsLoading
  } = useGetData({
    page, 
    rowsPerPage, 
    search,
    dataQueryKey: API_KEYS.FETCH_PRODUCTS,
    countQueryKey: API_KEYS.FETCH_PRODUCTS_COUNT,
    entity: 'products',
    snackbarMessages: productSnackbarMessages
  });

  return {
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    search,
    setSearch,
    products,
    productsIsLoading,
    productsCount,
    productsCountIsLoading
  };
};