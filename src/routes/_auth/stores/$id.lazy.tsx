import { createLazyFileRoute } from '@tanstack/react-router';
import useGetStore from 'src/hooks/stores/useGetStore';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Loader from 'src/components/atoms/Loader';
import { formatTimestamp, formatBooleanToStringLabel } from 'src/utils';
import Card from '@mui/material/Card';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';

export const Route = createLazyFileRoute('/_auth/stores/$id')({
  component: StoreComponent,
});

function StoreComponent() {
  const { id } = Route.useParams();
  const { store, storeIsLoading } = useGetStore({ id });

  if (storeIsLoading) return <Loader type='cover'/>;

  return (
    <DetailsTemplate title="Detalle de la Tienda" returnButtonProps={{to: '/stores', params: {}}}>
      <Card sx={{p: 4}}>
        <Stack spacing={3}>
          <Typography variant='body1'>Id: {store.id}</Typography>
          <Typography variant='body1'>Nombre: {store.name}</Typography>
          <Typography variant='body1'>Principal: {formatBooleanToStringLabel(store.is_main)}</Typography>
          <Typography variant='body1'>Creado: {formatTimestamp(store.created_at)}</Typography>
          <Typography variant='body1'>Actualizado: {formatTimestamp(store.updated_at)}</Typography>
        </Stack>
      </Card>
    </DetailsTemplate>
  );
}

export default StoreComponent;
