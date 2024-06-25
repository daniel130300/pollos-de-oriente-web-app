import { createLazyFileRoute } from '@tanstack/react-router';
import useGetProduct from 'src/hooks/products/useGetProduct';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Loader from 'src/components/atoms/Loader';
import { formatTimestamp } from 'src/utils';
import Card from '@mui/material/Card';
import { DynamicImage } from 'src/components/atoms/DynamicImage';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';

export const Route = createLazyFileRoute('/_auth/products/$id')({
  component: ProductComponent,
});

function ProductComponent() {
  const { id } = Route.useParams();
  const { product, productIsLoading } = useGetProduct({ id });

  if (productIsLoading) return <Loader type='cover'/>;

  return (
    <DetailsTemplate title="Detalle del Producto" returnButtonProps={{to: '/products', params: {}}}>
      <Card sx={{p: 4}}>
        <Stack spacing={4}>
          {product.imagePublicUrl && <DynamicImage src={product.imagePublicUrl} />}
          <Typography variant='body1'>Id: {product.id}</Typography>
          <Typography variant='body1'>Nombre: {product.name}</Typography>
          <Typography variant='body1'>Creado: {formatTimestamp(product.created_at)}</Typography>
          <Typography variant='body1'>Actualizado: {formatTimestamp(product.updated_at)}</Typography>
        </Stack>
      </Card>
    </DetailsTemplate>
  );
}

export default ProductComponent;
