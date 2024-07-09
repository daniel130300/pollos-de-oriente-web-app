import { API_KEYS } from 'src/query/keys/queryConfig';
import { productSnackbarMessages } from 'src/constants';
import useGetSingleEntity from 'src/hooks/common/useGetSingleEntity';

const useGetComboProducts = ({ combo_id }: { combo_id: string }) => {
  const {
    isLoading: comboProductsIsLoading,
    isFetching: comboProductsIsFetching,
    isError: comboProductsIsError,
    data: comboProducts,
  } = useGetSingleEntity({
    id: combo_id,
    equalField: 'combo_id',
    entity: 'combo_products',
    queryKey: API_KEYS.FETCH_COMBO_PRODUCTS,
    snackbarMessages: productSnackbarMessages,
    shouldUseSingle: false,
    selectStatement: '*, products(*)',
  });

  return {
    comboProductsIsLoading,
    comboProductsIsFetching,
    comboProductsIsError,
    comboProducts,
  };
};

export default useGetComboProducts;
