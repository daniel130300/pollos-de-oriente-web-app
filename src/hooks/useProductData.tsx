import { useQuery } from 'react-query';
import { supabase } from '../supabaseClient';
import { enqueueSnackbar } from 'notistack';

const useProductData = ({ page, rowsPerPage }: { page: number; rowsPerPage: number }) => {

  const getProducts = async ({ page, rowsPerPage }: { page: number; rowsPerPage: number }) => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage - 1;

    const { data, error } = await supabase.from('products').select('*').range(start, end);

    if (error) {
      enqueueSnackbar('Error obteniendo el listado de productos', { variant: 'error' });
      throw error;
    }

    return data;
  };

  const getProductsCount = async () => {
    const { count, error } = await supabase.from('products').select('*', { count: 'exact', head: true });

    if (error) {
      enqueueSnackbar('Error obteniendo el conteo de productos', { variant: 'error' });
      throw error;
    }

    return count;
  };

  const { isLoading: productsIsLoading, isError: productsIsError, data: products } = useQuery(['products', page, rowsPerPage], () => getProducts({ page, rowsPerPage }), { keepPreviousData: true });
  const { isLoading: productsCountIsLoading, isError: productsCountIsError, data: productsCount } = useQuery(['productsCount'], () => getProductsCount());


  return { productsIsLoading, productsIsError, products, productsCountIsLoading, productsCountIsError, productsCount };
};

export default useProductData;
