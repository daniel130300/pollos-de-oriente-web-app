import { createLazyFileRoute } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from '@tanstack/react-router';
import Button from 'src/components/atoms/Button';
import { InputField } from 'src/components/atoms/InputField';
import TableUI from 'src/components/atoms/TableUI';
import { formatTimestamp } from 'src/utils';
// import { useNavigate } from '@tanstack/react-router';
import useGetUsers from 'src/hooks/users/useGetUsers';

export const Route = createLazyFileRoute('/_auth/users/')({
  component: Users,
});

const columns: ColumnDef<any, any>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
    cell: user => <span>{user.row.original.id}</span>,
  },
  {
    accessorKey: 'email',
    header: 'Correo',
    cell: user => <span>{user.row.original.email}</span>,
  },
  {
    accessorKey: 'full_name',
    header: 'Nombre Completo',
    cell: user => (
      <span>
        {user.row.original.first_name} {user.row.original.last_name}
      </span>
    ),
  },
  {
    accessorKey: 'phone_number',
    header: 'Número de telefono',
    cell: user => <span>{user.row.original.phone_number}</span>,
  },
  {
    accessorKey: 'establishment_id',
    header: 'Tienda',
    cell: user => <span>{user.row.original.establishment_id}</span>,
  },
  {
    accessorKey: 'created_at',
    header: 'Creado',
    cell: user => <span>{formatTimestamp(user.row.original.created_at)}</span>,
  },
  {
    accessorKey: 'updated_at',
    header: 'Actualizado',
    cell: user => <span>{formatTimestamp(user.row.original.updated_at)}</span>,
  },
];

function Users() {
  // const navigate = useNavigate();
  const {
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    search,
    setSearch,
    users,
    usersIsLoading,
    usersCount,
    usersCountIsLoading,
  } = useGetUsers();

  // const handleViewRow = (user: User) => {
  //   navigate({
  //     to: '/users/$id',
  //     params: { id: user.id },
  //   });
  // };

  return (
    <>
      <Typography variant="h1">Usuarios</Typography>
      <Box my={2}>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="flex-end"
        >
          <InputField
            id="search"
            name="search"
            label="Buscar por nombre de usuario"
            type="text"
            variant="outlined"
            size="small"
            sx={{ minWidth: '300px' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Button
            endIcon={<AddCircleIcon />}
            sx={{ mx: 'auto', mb: 2 }}
            component={Link}
            to="/users/add-user"
          >
            Agregar Usuario
          </Button>
        </Stack>
      </Box>
      <TableUI
        data={users || []}
        columns={columns}
        emptyText="No se encontraron usuarios"
        isFetching={usersIsLoading}
        page={page}
        handleChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        recordsCount={usersCount}
        recordsCountLoading={usersCountIsLoading}
        // handleViewRow={handleViewRow}
        // handleEditRow={handleEditRow}
        // handleDeleteRow={handleDeleteRow}
      />
    </>
  );
}
