import { useEffect, useState } from 'react';
import usePagination from 'src/hooks/common/usePagination';
import useGetData from 'src/hooks/common/useGetEntity';
import { API_KEYS } from 'src/query/keys/queryConfig';
import { userSnackbarMessages } from 'src/constants/snackbarMessages';

const useGetUsers = ({ searchTerm = '' }: { searchTerm?: string } = {}) => {
  const { page, handleChangePage, rowsPerPage, handleChangeRowsPerPage } =
    usePagination();

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (searchTerm) {
      setSearch(searchTerm);
    }
  }, [searchTerm]);

  const {
    data: users,
    dataIsLoading: usersIsLoading,
    dataCount: usersCount,
    dataCountIsLoading: usersCountIsLoading,
  } = useGetData({
    page,
    rowsPerPage,
    search,
    dataQueryKey: API_KEYS.FETCH_USERS,
    countQueryKey: API_KEYS.FETCH_USERS_COUNT,
    entity: 'users',
    snackbarMessages: userSnackbarMessages,
  });

  return {
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    search,
    setSearch,
    users,
    usersIsLoading,
    usersCount,
    usersCountIsLoading,
  };
};

export default useGetUsers;
