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
import { formatTimestamp, translateBooleanToString } from 'src/utils';
import { useNavigate } from '@tanstack/react-router';
import useGetStores from 'src/hooks/stores/useGetStores';
import { Store } from 'src/hooks/stores/interface';
import useDeleteStore from 'src/hooks/stores/useDeleteStore';

export const Route = createLazyFileRoute('/_auth/establishments/stores/')({
  component: Stores,
});

const columns: ColumnDef<any, any>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
    cell: store => <span>{store.row.original.id}</span>,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: store => <span>{store.row.original.name}</span>,
  },
  {
    accessorKey: 'has_delivery',
    header: 'Tiene Delivery?',
    cell: store => (
      <span>{translateBooleanToString(store.row.original.has_delivery)}</span>
    ),
  },
  {
    accessorKey: 'has_pos',
    header: 'Tiene POS?',
    cell: store => (
      <span>{translateBooleanToString(store.row.original.has_pos)}</span>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Creado',
    cell: store => (
      <span>{formatTimestamp(store.row.original.created_at)}</span>
    ),
  },
  {
    accessorKey: 'updated_at',
    header: 'Actualizado',
    cell: store => (
      <span>{formatTimestamp(store.row.original.updated_at)}</span>
    ),
  },
];

function Stores() {
  const navigate = useNavigate();
  const {
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    search,
    setSearch,
    stores,
    storesIsLoading,
    storesCount,
    storesCountIsLoading,
  } = useGetStores();
  const { setStoreToDelete } = useDeleteStore();

  const handleViewRow = (store: Store) => {
    navigate({
      to: '/establishments/stores/$id',
      params: { id: store.id },
    });
  };

  const handleEditRow = (store: Store) => {
    navigate({
      to: '/establishments/stores/$id/edit',
      params: { id: store.id },
    });
  };

  const handleDeleteRow = (store: Store) => {
    setStoreToDelete(store);
  };

  return (
    <>
      <Typography variant="h1">Tiendas</Typography>
      <Box my={2}>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="flex-end"
        >
          <InputField
            id="search"
            name="search"
            label="Buscar por nombre de tienda"
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
            to="/establishments/stores/add-store"
          >
            Agregar Tienda
          </Button>
        </Stack>
      </Box>
      <TableUI
        data={stores || []}
        columns={columns}
        emptyText="No se encontraron tiendas"
        isFetching={storesIsLoading}
        page={page}
        handleChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        recordsCount={storesCount}
        recordsCountLoading={storesCountIsLoading}
        handleViewRow={handleViewRow}
        handleEditRow={handleEditRow}
        handleDeleteRow={handleDeleteRow}
      />
    </>
  );
}
