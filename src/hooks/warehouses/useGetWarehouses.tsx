import { useEffect, useState } from 'react';
import usePagination from 'src/hooks/common/usePagination';
import useGetData from 'src/hooks/common/useGetEntity';
import { API_KEYS } from 'src/query/keys/queryConfig';
import { warehouseSnackbarMessages } from 'src/constants/snackbarMessages';
import { EstablishmentTypes } from '../expense-category/interface';

const useGetWarehouses = ({
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
    data: warehouses,
    dataIsLoading: warehousesIsLoading,
    dataCount: warehousesCount,
    dataCountIsLoading: warehousesCountIsLoading,
  } = useGetData({
    page,
    rowsPerPage,
    search,
    dataQueryKey: API_KEYS.FETCH_WAREHOUSES,
    countQueryKey: API_KEYS.FETCH_WAREHOUSES_COUNT,
    entity: 'establishments',
    snackbarMessages: warehouseSnackbarMessages,
    equalField: 'type',
    equalFieldSearch: EstablishmentTypes.WAREHOUSE,
  });

  return {
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    search,
    setSearch,
    warehouses,
    warehousesIsLoading,
    warehousesCount,
    warehousesCountIsLoading,
  };
};

export default useGetWarehouses;
