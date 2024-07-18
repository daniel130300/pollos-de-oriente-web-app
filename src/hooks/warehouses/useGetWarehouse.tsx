import { API_KEYS } from 'src/query/keys/queryConfig';
import { warehouseSnackbarMessages } from 'src/constants';
import useGetSingleEntity from 'src/hooks/common/useGetSingleEntity';

const useGetWarehouse = ({ id }: { id: string }) => {
  const {
    isLoading: warehouseIsLoading,
    isFetching: warehouseIsFetching,
    isError: warehouseIsError,
    data: warehouse,
  } = useGetSingleEntity({
    id,
    entity: 'establishments',
    queryKey: API_KEYS.FETCH_WAREHOUSE,
    snackbarMessages: warehouseSnackbarMessages,
  });

  return {
    warehouseIsLoading,
    warehouseIsFetching,
    warehouseIsError,
    warehouse,
  };
};

export default useGetWarehouse;
