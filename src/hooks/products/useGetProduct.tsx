import { API_KEYS } from 'src/query/keys/queryConfig';
import { productSnackbarMessages } from 'src/constants';
import useGetSingleEntity from 'src/hooks/common/useGetSingleEntity';
import { supabase } from 'src/supabaseClient';

const useGetProduct = ({ id }: { id: string }) => {
  const processData = (data: any) => {
    if (data.bucket_id && data.file_name) {
      const { data: image } = supabase.storage
        .from(data.bucket_id)
        .getPublicUrl(data.file_name);
      data.imagePublicUrl = image?.publicUrl;
    }
    return data;
  };

  const {
    isLoading: productIsLoading,
    isFetching: productIsFetching,
    isError: productIsError,
    data: product,
  } = useGetSingleEntity({
    id,
    entity: 'products',
    queryKey: API_KEYS.FETCH_PRODUCT,
    snackbarMessages: productSnackbarMessages,
    processData,
  });

  return {
    productIsLoading,
    productIsFetching,
    productIsError,
    product,
  };
};

export default useGetProduct;
