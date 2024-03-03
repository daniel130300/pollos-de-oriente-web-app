import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { supabase } from 'src/supabaseClient';
import { enqueueSnackbar } from 'notistack';

interface UseGetProductsProps {
  page: number;
  rowsPerPage: number;
  search: string;
}

const useGetProducts = ({ page, rowsPerPage, search = '' }: UseGetProductsProps) => {
  const getProducts = async ({ page, rowsPerPage, search = '' }: UseGetProductsProps) => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage - 1;

    let query = supabase.from('products').select('*');

    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    query = query.order('created_at', { ascending: false }).range(start, end);

    const { data } = await query.throwOnError();

    return data;
  };

  const getProductsCount = async ({ search = ''}) => {
    let countQuery = supabase.from('products').select('*', { count: 'exact', head: true });

    if (search) {
      countQuery = countQuery.ilike('name', `%${search}%`);
    }

    const { count } = await countQuery.throwOnError();

    return count;
  };

  const { isLoading: productsIsLoading, isError: productsIsError, data: products } = useQuery(
    {
      queryKey: ['products', {page, rowsPerPage, search}],
      queryFn: () => getProducts({page, rowsPerPage, search}),
      placeholderData: keepPreviousData,
      throwOnError: () => {
        enqueueSnackbar('Error obteniendo el listado de productos', { variant: 'error' });
        return false;
      }
    }
  );
  
  const { isLoading: productsCountIsLoading, isError: productsCountIsError, data: productsCount } = useQuery(
    {
      queryKey: ['productsCount', search],
      queryFn: () => getProductsCount({ search }),
      throwOnError: () => {
        enqueueSnackbar('Error obteniendo el conteo de productos', { variant: 'error' });
        return false;
      }
    }
  );

  return { 
    productsIsLoading, 
    productsIsError, 
    products, 
    productsCountIsLoading, 
    productsCountIsError, 
    productsCount 
  };
};

export default useGetProducts;