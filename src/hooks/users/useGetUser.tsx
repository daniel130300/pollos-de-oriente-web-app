import { API_KEYS } from 'src/query/keys/queryConfig';
import { userSnackbarMessages } from 'src/constants';
import useGetSingleEntity from 'src/hooks/common/useGetSingleEntity';

const useGetUser = ({ id }: { id: string }) => {
  const {
    isLoading: userIsLoading,
    isFetching: userIsFetching,
    isError: userIsError,
    data: user,
  } = useGetSingleEntity({
    id,
    entity: 'users',
    queryKey: API_KEYS.FETCH_USER,
    snackbarMessages: userSnackbarMessages,
    selectStatement: `*, establishments(name)`,
  });

  return {
    userIsLoading,
    userIsFetching,
    userIsError,
    user,
  };
};

export default useGetUser;
