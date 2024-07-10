import { createLazyFileRoute } from '@tanstack/react-router';
import useGetStore from 'src/hooks/stores/useGetStore';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Loader from 'src/components/atoms/Loader';
import { formatTimestamp, translateBooleanToString } from 'src/utils';
import Card from '@mui/material/Card';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';

export const Route = createLazyFileRoute('/_auth/establishments/stores/$id')({
  component: StoreComponent,
});

function StoreComponent() {
  const { id } = Route.useParams();
  const { store, storeIsLoading } = useGetStore({ id });

  if (storeIsLoading) return <Loader type="cover" />;

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
        </Stack>
      </Card>
    </DetailsTemplate>
  );
}

export default StoreComponent;
