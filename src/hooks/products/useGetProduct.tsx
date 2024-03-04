import { useQuery } from '@tanstack/react-query';
import { supabase } from 'src/supabaseClient';
import { enqueueSnackbar } from 'notistack';
import { productEnqueue } from 'src/localization';
import { API_KEYS } from 'src/query/keys/queryConfig';

interface UseGetProductProps {
  id: string;
}

const useGetProduct = ({ id }: UseGetProductProps) => {
  const getProduct = async ({ id }: {id: string}) => {
    const { data } = await supabase.from('products').select('*').eq('id', id).single().throwOnError();

    if(data.bucket_id && data.file_name) {
      const { data: image } = supabase.storage.from(data.bucket_id).getPublicUrl(data.file_name)
      
      data.imagePublicUrl = image?.publicUrl;
    }

    return data;
  };

  const { 
    isLoading: productIsLoading, 
    isFetching: productIsFetching,
    data: product, 
    isError: productIsError,
  } = useQuery({
    queryKey: [API_KEYS.FETCH_PRODUCT, {id}],
    queryFn: () => getProduct({ id }),
    throwOnError: () => { 
      enqueueSnackbar(productEnqueue.errors.detail, {variant: 'error'}) 
      return true;
    }
  });

  return { 
    productIsLoading, 
    productIsFetching,
    productIsError,
    product
  };
};

export default useGetProduct;