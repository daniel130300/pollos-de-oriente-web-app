import { createLazyFileRoute } from '@tanstack/react-router';
import useGetProduct from '../../../hooks/products/useGetProduct';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Loader from '../../../components/atoms/Loader';
import Box from '@mui/material/Box';
import ReturnButton from '../../../components/molecules/ReturnButton';

export const Route = createLazyFileRoute('/_auth/products/$id')({
  component: ProductComponent,
});

function ProductComponent() {
  const { id } = Route.useParams();
  const { product, productIsLoading } = useGetProduct({ id });

  if (productIsLoading) return <Loader />;

  return (
    <Grid container>
      <Grid item xs={6} mx="auto">
        <ReturnButton to='/products' params={{}}/>
        <Typography variant="h1" mb={2}>Detalle del Producto</Typography>
        <Stack spacing={3} mb={4}>
          <Box component="img" src={product.imagePublicUrl} sx={{maxWidht: 50, maxHeight: 50, objectFit: 'contain'}}/>
          <Typography variant='body1'>Id: {product.id}</Typography>
          <Typography variant='body1'>Name: {product.name}</Typography>
          <Typography variant='body1'>Purchase Price: {product.purchase_price}</Typography>
          <Typography variant='body1'>Sale Price: {product.sale_price}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default ProductComponent;
