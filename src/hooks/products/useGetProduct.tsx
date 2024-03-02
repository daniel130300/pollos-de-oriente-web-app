import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../supabaseClient';
import { enqueueSnackbar } from 'notistack';

interface UseGetProductProps {
  id: string;
}

const useGetProduct = ({ id }: UseGetProductProps) => {
  const getProduct = async ({ id }: {id: string}) => {
    const { data } = await supabase.from('products').select('*').eq('id', id).single().throwOnError();

    if(data.bucket_id && data.file_name) {
      const { data: image } = supabase.storage.from(data.bucket_id).getPublicUrl(data.file_name)

      data.imagePublicUrl = image.publicUrl;
    }

    return data;
  };

  const { isLoading: productIsLoading, data: product, isError: productIsError } = useQuery({
    queryKey: ['product', {id}],
    queryFn: () => getProduct({ id }),
    throwOnError: () => { 
      enqueueSnackbar('Error obteniendo el detalle del producto', {variant: 'error'}) 
      return false;
    }
  });

  return { 
    productIsLoading, 
    productIsError,
    product
  };
};

export default useGetProduct;