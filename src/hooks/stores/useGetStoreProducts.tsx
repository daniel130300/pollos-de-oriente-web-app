import { API_KEYS } from 'src/query/keys/queryConfig';
import { productSnackbarMessages } from 'src/constants';
import useGetSingleEntity from 'src/hooks/common/useGetSingleEntity';

const useGetStoreProducts = ({ storeId }: { storeId: string }) => {
  const {
    isLoading: storeProductsIsLoading,
    isFetching: storeProductsIsFetching,
    isError: storeProductsIsError,
    data: storeProducts,
  } = useGetSingleEntity({
    id: storeId,
    equalField: 'establishment_id',
    entity: 'establishment_products_menu',
    queryKey: API_KEYS.FETCH_STORE_PRODUCTS,
    snackbarMessages: productSnackbarMessages,
    shouldUseSingle: false,
    selectStatement: '*, products(*)',
  });

  return {
    storeProductsIsLoading,
    storeProductsIsFetching,
    storeProductsIsError,
    storeProducts,
  };
};

export default useGetStoreProducts;
