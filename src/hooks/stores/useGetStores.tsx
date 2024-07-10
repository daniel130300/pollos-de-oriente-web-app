import { useEffect, useState } from 'react';
import usePagination from 'src/hooks/common/usePagination';
import useGetData from 'src/hooks/common/useGetEntity';
import { API_KEYS } from 'src/query/keys/queryConfig';
import { storeSnackbarMessages } from 'src/constants/snackbarMessages';
import { EstablishmentTypes } from '../expense-category/interface';

const useGetStores = ({ searchTerm = '' }: { searchTerm?: string } = {}) => {
  const { page, handleChangePage, rowsPerPage, handleChangeRowsPerPage } =
    usePagination();

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (searchTerm) {
      setSearch(searchTerm);
    }
  }, [searchTerm]);

  const {
    data: stores,
    dataIsLoading: storesIsLoading,
    dataCount: storesCount,
    dataCountIsLoading: storesCountIsLoading,
  } = useGetData({
    page,
    rowsPerPage,
    search,
    dataQueryKey: API_KEYS.FETCH_STORES,
    countQueryKey: API_KEYS.FETCH_STORES_COUNT,
    entity: 'establishments',
    snackbarMessages: storeSnackbarMessages,
    equalField: 'type',
    equalFieldSearch: EstablishmentTypes.STORE,
  });

  return {
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    search,
    setSearch,
    stores,
    storesIsLoading,
    storesCount,
    storesCountIsLoading,
  };
};

export default useGetStores;
