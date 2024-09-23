import { useEffect, useState } from 'react';
import usePagination from 'src/hooks/common/usePagination';
import useGetData from 'src/hooks/common/useGetEntity';
import { API_KEYS } from 'src/query/keys/queryConfig';
import { combosSnackbarMessages } from 'src/constants/snackbarMessages';

const useGetCombos = ({ searchTerm = '' }: { searchTerm?: string } = {}) => {
  const { page, handleChangePage, rowsPerPage, handleChangeRowsPerPage } =
    usePagination();

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (searchTerm) {
      setSearch(searchTerm);
    }
  }, [searchTerm]);

  const {
    data: combos,
    dataIsLoading: combosIsLoading,
    dataCount: combosCount,
    dataCountIsLoading: combosCountIsLoading,
  } = useGetData({
    page,
    rowsPerPage,
    search,
    dataQueryKey: API_KEYS.FETCH_COMBOS,
    countQueryKey: API_KEYS.FETCH_COMBOS_COUNT,
    entity: 'combos',
    snackbarMessages: combosSnackbarMessages,
  });

  return {
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    search,
    setSearch,
    combos,
    combosIsLoading,
    combosCount,
    combosCountIsLoading,
  };
};

export default useGetCombos;
