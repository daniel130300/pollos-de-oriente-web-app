import { API_KEYS } from 'src/query/keys/queryConfig';
import { combosSnackbarMessages } from 'src/constants';
import useGetSingleEntity from 'src/hooks/common/useGetSingleEntity';

const useGetStoreCombos = ({ storeId }: { storeId: string }) => {
  const {
    isLoading: storeCombosIsLoading,
    isFetching: storeCombosIsFetching,
    isError: storeCombosIsError,
    data: storeCombos,
  } = useGetSingleEntity({
    id: storeId,
    equalField: 'establishment_id',
    entity: 'establishment_combos_menu',
    queryKey: API_KEYS.FETCH_STORE_COMBOS,
    snackbarMessages: combosSnackbarMessages,
    shouldUseSingle: false,
    selectStatement: '*, combos(*)',
  });

  return {
    storeCombosIsLoading,
    storeCombosIsFetching,
    storeCombosIsError,
    storeCombos,
  };
};

export default useGetStoreCombos;
