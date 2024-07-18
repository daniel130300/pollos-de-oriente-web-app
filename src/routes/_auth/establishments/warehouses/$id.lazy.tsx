import { createLazyFileRoute } from '@tanstack/react-router';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Loader from 'src/components/atoms/Loader';
import Card from '@mui/material/Card';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import { formatTimestamp, translateEstablishment } from 'src/utils';
import useGetWarehouse from 'src/hooks/warehouses/useGetWarehouse';

export const Route = createLazyFileRoute(
  '/_auth/establishments/warehouses/$id',
)({
  component: Warehouse,
});

function Warehouse() {
  const { id } = Route.useParams();
  const { warehouse, warehouseIsLoading } = useGetWarehouse({
    id,
  });

  if (warehouseIsLoading) return <Loader type="cover" />;

  return (
    <DetailsTemplate
      title="Detalle de la Bodega"
      returnButtonProps={{ to: '/establishments/warehouses', params: {} }}
      displaySubtitle={false}
    >
      <Card sx={{ p: 4 }}>
        <Typography variant="h3" mb={4}>
          Información General
        </Typography>
        <Stack spacing={4}>
          <Typography variant="body1">Id: {warehouse.id}</Typography>
          <Typography variant="body1">Nombre: {warehouse.name}</Typography>
          <Typography variant="body1">
            Tipo: {translateEstablishment(warehouse.type)}
          </Typography>
          <Typography variant="body1">
            Creado: {formatTimestamp(warehouse.created_at)}
          </Typography>
          <Typography variant="body1">
            Actualizado: {formatTimestamp(warehouse.updated_at)}
          </Typography>
        </Stack>
      </Card>
    </DetailsTemplate>
  );
}

export default Warehouse;
