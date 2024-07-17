import { API_KEYS } from 'src/query/keys/queryConfig';
import { productSnackbarMessages } from 'src/constants';
import useGetSingleEntity from 'src/hooks/common/useGetSingleEntity';

const useGetProductDetails = ({
  parentProductId,
}: {
  parentProductId: string;
}) => {
  const {
    isLoading: productDetailsIsLoading,
    isFetching: productDetailsIsFetching,
    isError: productDetailsIsError,
    data: productDetails,
  } = useGetSingleEntity({
    id: parentProductId,
    equalField: 'parent_product_id',
    entity: 'product_details',
    queryKey: API_KEYS.FETCH_PRODUCT_DETAIL,
    snackbarMessages: productSnackbarMessages,
    shouldUseSingle: false,
    selectStatement: '*, products!child_product_id(*)',
  });

  return {
    productDetailsIsLoading,
    productDetailsIsFetching,
    productDetailsIsError,
    productDetails,
  };
};

export default useGetProductDetails;
