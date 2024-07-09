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
import Divider from 'src/components/atoms/Divider';
import useGetProductDetails from 'src/hooks/products/useGetProductDetail';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

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
      displaySubtitle={false}
      gridSizes={
        product.imagePublicUrl ? { xs: 10, sm: 10, md: 12 } : undefined
      }
    >
      <Card sx={{ p: 4 }}>
        <Typography variant="h3" mb={4}>
          Información General
        </Typography>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={product.imagePublicUrl ? 6 : 12}>
            <Stack spacing={4}>
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
              {productDetails.length > 0 && (
                <>
                  <Divider />
                  <Typography variant="h3">Productos Relacionados</Typography>
                  {productDetails.map((productDetail: any) => (
                    <ListItemText
                      key={productDetail.id}
                      primary={`Nombre: ${productDetail.products.name}, Cantidad: ${productDetail.arithmetic_quantity}`}
                      disableTypography
                    />
                  ))}
                </>
              )}
            </Stack>
          </Grid>
          {product.imagePublicUrl && (
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="h3" mb={4} align="center">
                Imagen
              </Typography>
              <DynamicImage src={product.imagePublicUrl} />
            </Grid>
          )}
        </Grid>
      </Card>
    </DetailsTemplate>
  );
}

export default ProductComponent;
