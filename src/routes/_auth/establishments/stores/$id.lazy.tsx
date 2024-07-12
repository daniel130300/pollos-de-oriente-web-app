import { createLazyFileRoute } from '@tanstack/react-router';
import useGetStore from 'src/hooks/stores/useGetStore';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Loader from 'src/components/atoms/Loader';
import { formatTimestamp, translateBooleanToString } from 'src/utils';
import Card from '@mui/material/Card';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import Divider from 'src/components/atoms/Divider';
import ListItemText from '@mui/material/ListItemText';
import useGetStoreCombos from 'src/hooks/stores/useGetStoreCombos';
import useGetStoreProducts from 'src/hooks/stores/useGetStoreProducts';

export const Route = createLazyFileRoute('/_auth/establishments/stores/$id')({
  component: StoreComponent,
});

function StoreComponent() {
  const { id } = Route.useParams();
  const { store, storeIsLoading } = useGetStore({ id });
  const { storeCombos, storeCombosIsLoading } = useGetStoreCombos({
    storeId: id,
  });
  const { storeProducts, storeProductsIsLoading } = useGetStoreProducts({
    storeId: id,
  });

  if (storeIsLoading || storeCombosIsLoading || storeProductsIsLoading)
    return <Loader type="cover" />;

  return (
    <DetailsTemplate
      title="Detalle de la Tienda"
      returnButtonProps={{ to: '/establishments/stores', params: {} }}
    >
      <Card sx={{ p: 4 }}>
        <Stack spacing={4}>
          <Typography variant="body1">Id: {store.id}</Typography>
          <Typography variant="body1">Nombre: {store.name}</Typography>
          <Typography variant="body1">
            Tiene Delivery?: {translateBooleanToString(store.has_delivery)}
          </Typography>
          <Typography variant="body1">
            Tiene POS?: {translateBooleanToString(store.has_pos)}
          </Typography>
          <Typography variant="body1">
            Creado: {formatTimestamp(store.created_at)}
          </Typography>
          <Typography variant="body1">
            Actualizado: {formatTimestamp(store.updated_at)}
          </Typography>
          <Divider />
          <Typography variant="h3">Menu</Typography>
          <Typography variant="h4">Productos</Typography>
          {storeProducts.map((storeProduct: any) => (
            <ListItemText
              key={storeProducts.product_id}
              primary={`Nombre: ${storeProduct.products.name}, Precio de Venta: ${storeProduct.sale_price}`}
              disableTypography
            />
          ))}
          <Typography variant="h4">Combos</Typography>
          {storeCombos.map((storeCombo: any) => (
            <ListItemText
              key={storeCombo.product_id}
              primary={`Nombre: ${storeCombo.combos.name}, Precio de Venta: ${storeCombo.sale_price}`}
              disableTypography
            />
          ))}
        </Stack>
      </Card>
    </DetailsTemplate>
  );
}

export default StoreComponent;
