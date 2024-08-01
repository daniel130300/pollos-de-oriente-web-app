import { useState } from 'react';
import usePagination from 'src/hooks/common/usePagination';
import useGetData from 'src/hooks/common/useGetEntity';
import { API_KEYS } from 'src/query/keys/queryConfig';
import { roleSnackbarMessages } from 'src/constants';

const usGetRoles = () => {
  const { page, handleChangePage, rowsPerPage, handleChangeRowsPerPage } =
    usePagination();

  const [search, setSearch] = useState('');

  const {
    data: roles,
    dataIsLoading: rolesIsLoading,
    dataCount: rolesCount,
    dataCountIsLoading: rolesCountIsLoading,
  } = useGetData({
    page,
    rowsPerPage,
    search,
    dataQueryKey: API_KEYS.FETCH_ROLES,
    countQueryKey: API_KEYS.FETCH_PRODUCTS_COUNT,
    entity: 'roles',
    snackbarMessages: roleSnackbarMessages,
  });

  return {
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    search,
    setSearch,
    roles,
    rolesIsLoading,
    rolesCount,
    rolesCountIsLoading,
  };
};

export default usGetRoles;
