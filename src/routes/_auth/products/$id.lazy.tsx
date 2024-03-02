import { createLazyFileRoute } from '@tanstack/react-router';
import useGetProduct from '../../../hooks/products/useGetProduct';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Loader from '../../../components/atoms/Loader';

export const Route = createLazyFileRoute('/_auth/products/$id')({
  component: ProductComponent,
});

function ProductComponent() {
  const { id } = Route.useParams();
  const { product, productIsLoading, productIsError } = useGetProduct({ id });


  console.log('productIsError', productIsError)

  if (productIsLoading) return <Loader />;

  console.log('PRODUCT', product);

  return (
    <Grid container>
      <Grid item xs={6} mx="auto">
        <Typography variant="h1" mb={2}>Detalle del Producto</Typography>
        <Stack spacing={3} mb={4}>
          <div>Id: {product.id}</div>
          <div>Name: {product.name}</div>
          <div>Purchase Price: {product.purchase_price}</div>
          <div>Sale Price: {product.sale_price}</div>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default ProductComponent;
