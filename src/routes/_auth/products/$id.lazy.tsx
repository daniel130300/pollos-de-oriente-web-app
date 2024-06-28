import { createLazyFileRoute } from '@tanstack/react-router';
import useGetProduct from 'src/hooks/products/useGetProduct';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Loader from 'src/components/atoms/Loader';
import {
  formatTimestamp,
  translateEstablishment,
  translateProductInventorySubtraction,
} from 'src/utils';
import Card from '@mui/material/Card';
import { DynamicImage } from 'src/components/atoms/DynamicImage';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import Divider from '@mui/material/Divider';
import useGetProductDetails from 'src/hooks/products/useGetProductDetail';
import ListItemText from '@mui/material/ListItemText';

export const Route = createLazyFileRoute('/_auth/products/$id')({
  component: ProductComponent,
});

function ProductComponent() {
  const { id } = Route.useParams();
  const { product, productIsLoading } = useGetProduct({ id });
  const { productDetails, productDetailsIsLoading } = useGetProductDetails({
    parent_product_id: id,
  });

  if (productIsLoading || productDetailsIsLoading)
    return <Loader type="cover" />;

  return (
    <DetailsTemplate
      title="Detalle del Producto"
      returnButtonProps={{ to: '/products', params: {} }}
    >
      <Card sx={{ p: 4 }}>
        <Stack spacing={4}>
          {product.imagePublicUrl && (
            <DynamicImage src={product.imagePublicUrl} />
          )}
          <Typography variant="body1">Id: {product.id}</Typography>
          <Typography variant="body1">
            Id de Busqueda: {product.search_id}
          </Typography>
          <Typography variant="body1">Nombre: {product.name}</Typography>
          <Typography variant="body1">
            Se resta de manera:{' '}
            {translateProductInventorySubtraction(
              product.inventory_subtraction,
            )}
          </Typography>
          <Typography variant="body1">
            Solo se puede comprar en:{' '}
            {translateEstablishment(product.can_be_purchased_only)}
          </Typography>
          <Typography variant="body1">
            Se ingresa como: {product.expense_categories.name}
          </Typography>
          <Typography variant="body1">
            Creado: {formatTimestamp(product.created_at)}
          </Typography>
          <Typography variant="body1">
            Actualizado: {formatTimestamp(product.updated_at)}
          </Typography>
          <Divider />
          <Typography variant="h3">Productos Relacionados</Typography>
          {productDetails.map((productDetail: any) => (
            <ListItemText
              key={productDetail.id}
              primary={`Nombre: ${productDetail.products.name}, Cantidad: ${productDetail.arithmetic_quantity}`}
            />
          ))}
        </Stack>
      </Card>
    </DetailsTemplate>
  );
}

export default ProductComponent;
