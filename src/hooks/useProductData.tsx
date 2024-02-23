import { useQuery } from 'react-query';
import { supabase } from '../supabaseClient';
import { enqueueSnackbar } from 'notistack';

interface useProductDataProps {
  page: number;
  rowsPerPage: number;
  search: string;
}

const useProductData = ({ page, rowsPerPage, search = '' }: useProductDataProps) => {
  const getProducts = async ({ page, rowsPerPage, search = '' }: useProductDataProps) => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage - 1;

    let query = supabase.from('products').select('*');

    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    query = query.order('created_at', { ascending: false }).range(start, end);

    const { data, error } = await query;

    if (error) {
      enqueueSnackbar('Error obteniendo el listado de productos', { variant: 'error' });
      throw error;
    }

    return data;
  };

  const getProductsCount = async ({ search = ''}) => {
    let countQuery = supabase.from('products').select('*', { count: 'exact', head: true });

    if (search) {
      countQuery = countQuery.ilike('name', `%${search}%`);
    }

    const { count, error } = await countQuery;

    if (error) {
      enqueueSnackbar('Error obteniendo el conteo de productos', { variant: 'error' });
      throw error;
    }

    return count;
  };

  const { isLoading: productsIsLoading, isError: productsIsError, data: products } = useQuery(
    ['products', page, rowsPerPage, search],
    () => getProducts({ page, rowsPerPage, search }),
    { keepPreviousData: true }
  );
  const { isLoading: productsCountIsLoading, isError: productsCountIsError, data: productsCount } = useQuery(
    ['productsCount', search],
    () => getProductsCount({ search })
  );

  return { productsIsLoading, productsIsError, products, productsCountIsLoading, productsCountIsError, productsCount };
};

export default useProductData;