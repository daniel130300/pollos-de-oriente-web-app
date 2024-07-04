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
import useDeleteProduct from 'src/hooks/products/useDeleteProduct';
import { Product } from 'src/hooks/products/interface';
import useGetCombos from 'src/hooks/combos/useGetCombos';

export const Route = createLazyFileRoute('/_auth/combos/')({
  component: Combos,
});

const columns: ColumnDef<any, any>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
    cell: product => <span>{product.row.original.id}</span>,
  },
  {
    accessorKey: 'search_id',
    header: 'Id de Busqueda',
    cell: product => <span>{product.row.original.search_id}</span>,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: product => <span>{product.row.original.name}</span>,
  },
  {
    accessorKey: 'created_at',
    header: 'Creado',
    cell: product => (
      <span>{formatTimestamp(product.row.original.created_at)}</span>
    ),
  },
  {
    accessorKey: 'updated_at',
    header: 'Actualizado',
    cell: product => (
      <span>{formatTimestamp(product.row.original.updated_at)}</span>
    ),
  },
];

function Combos() {
  // const navigate = useNavigate();
  const { setProductToDelete } = useDeleteProduct();
  const {
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    search,
    setSearch,
    combos,
    combosIsLoading,
    combosCount,
    combosCountIsLoading,
  } = useGetCombos();

  // const handleViewRow = (product: Product) => {
  //   navigate({ to: '/combos/$id', params: { id: product.id } });
  // };

  // const handleEditRow = (product: Product) => {
  //   navigate({ to: '/combos/$id/edit', params: { id: product.id } });
  // };

  const handleDeleteRow = (product: Product) => {
    setProductToDelete(product);
  };

  return (
    <>
      <Typography variant="h1">Combos</Typography>
      <Box my={2}>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="flex-end"
        >
          <InputField
            id="search"
            name="search"
            label="Buscar por nombre de combo"
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
            to="/combos/add-combo"
          >
            Agregar Combo
          </Button>
        </Stack>
      </Box>
      <TableUI
        data={combos || []}
        columns={columns}
        emptyText="No se encontraron productos"
        isFetching={combosIsLoading}
        page={page}
        handleChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        recordsCount={combosCount}
        recordsCountLoading={combosCountIsLoading}
        // handleViewRow={handleViewRow}
        // handleEditRow={handleEditRow}
        handleDeleteRow={handleDeleteRow}
      />
    </>
  );
}
