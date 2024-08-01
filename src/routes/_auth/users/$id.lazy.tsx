import { createLazyFileRoute } from '@tanstack/react-router';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Loader from 'src/components/atoms/Loader';
import Card from '@mui/material/Card';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import useGetUser from 'src/hooks/users/useGetUser';
import { formatTimestamp } from 'src/utils';

export const Route = createLazyFileRoute('/_auth/users/$id')({
  component: User,
});

function User() {
  const { id } = Route.useParams();
  const { user, userIsLoading } = useGetUser({
    id,
  });

  if (userIsLoading) return <Loader type="cover" />;

  return (
    <DetailsTemplate
      title="Detalle del Usuario"
      returnButtonProps={{ to: '/users', params: {} }}
      displaySubtitle={false}
    >
      <Card sx={{ p: 4 }}>
        <Typography variant="h3" mb={4}>
          Información General
        </Typography>
        <Stack spacing={4}>
          <Typography variant="body1">Id: {user.id}</Typography>
          <Typography variant="body1">Correo: {user.email}</Typography>
          <Typography variant="body1">
            Nombre Completo: {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="body1">
            Creado: {formatTimestamp(user.created_at)}
          </Typography>
          <Typography variant="body1">
            Actualizado: {formatTimestamp(user.updated_at)}
          </Typography>
        </Stack>
        <Typography variant="h3" my={4}>
          Local
        </Typography>
        <Typography variant="body1">{user.establishments.name}</Typography>
      </Card>
    </DetailsTemplate>
  );
}

export default User;
