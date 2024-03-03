import { createLazyFileRoute } from '@tanstack/react-router';
import useGetProduct from 'src/hooks/products/useGetProduct';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Loader from 'src/components/atoms/Loader';
import Box from '@mui/material/Box';
import ReturnButton from 'src/components/molecules/ReturnButton';
import { formatTimestamp } from 'src/utils/formatTimestamp';
import Card from '@mui/material/Card';

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
        <Card sx={{p: 4}}>
          <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
            <Typography variant="h1">Detalle del Producto</Typography>
          </Box>
          <Stack spacing={3}>
            <Box component="img" src={product.imagePublicUrl} sx={{maxWidht: 50, maxHeight: 50, objectFit: 'contain'}}/>
            <Typography variant='body1'>Id: {product.id}</Typography>
            <Typography variant='body1'>Nombre: {product.name}</Typography>
            <Typography variant='body1'>Precio Venta: {product.sale_price}</Typography>
            <Typography variant='body1'>Precio Compra: {product.purchase_price}</Typography>
            <Typography variant='body1'>Creado: {formatTimestamp(product.created_at)}</Typography>
            <Typography variant='body1'>Actualizado: {formatTimestamp(product.updated_at)}</Typography>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ProductComponent;
