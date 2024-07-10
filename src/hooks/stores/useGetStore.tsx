import { API_KEYS } from 'src/query/keys/queryConfig';
import { storeSnackbarMessages } from 'src/constants';
import useGetSingleEntity from 'src/hooks/common/useGetSingleEntity';

const useGetStore = ({ id }: { id: string }) => {
  const {
    isLoading: storeIsLoading,
    isFetching: storeIsFetching,
    isError: storeIsError,
    data: store,
  } = useGetSingleEntity({
    id,
    entity: 'establishments',
    queryKey: API_KEYS.FETCH_STORE,
    snackbarMessages: storeSnackbarMessages,
  });

  return {
    storeIsLoading,
    storeIsFetching,
    storeIsError,
    store,
  };
};

export default useGetStore;
