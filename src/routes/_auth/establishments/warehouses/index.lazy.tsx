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
import { useNavigate } from '@tanstack/react-router';
import useGetWarehouses from 'src/hooks/warehouses/useGetWarehouses';
import { Warehouse } from 'src/hooks/warehouses/inteface';
import useDeleteWarehouse from 'src/hooks/warehouses/useDeleteWarehouse';

export const Route = createLazyFileRoute('/_auth/establishments/warehouses/')({
  component: Warehouses,
});

const columns: ColumnDef<any, any>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
    cell: warehouse => <span>{warehouse.row.original.id}</span>,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: warehouse => <span>{warehouse.row.original.name}</span>,
  },
  {
    accessorKey: 'created_at',
    header: 'Creado',
    cell: warehouse => (
      <span>{formatTimestamp(warehouse.row.original.created_at)}</span>
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

function Warehouses() {
  const navigate = useNavigate();
  const {
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    search,
    setSearch,
    warehouses,
    warehousesIsLoading,
    warehousesCount,
    warehousesCountIsLoading,
  } = useGetWarehouses();
  const { setWarehouseToDelete } = useDeleteWarehouse();

  const handleViewRow = (warehouse: Warehouse) => {
    navigate({
      to: '/establishments/warehouses/$id',
      params: { id: warehouse.id },
    });
  };

  const handleEditRow = (warehouse: Warehouse) => {
    navigate({
      to: '/establishments/warehouses/$id/edit',
      params: { id: warehouse.id },
    });
  };

  const handleDeleteRow = (warehouse: Warehouse) => {
    setWarehouseToDelete(warehouse);
  };

  return (
    <>
      <Typography variant="h1">Bodegas</Typography>
      <Box my={2}>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="flex-end"
        >
          <InputField
            id="search"
            name="search"
            label="Buscar por nombre de bodega"
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
            to="/establishments/warehouses/add-warehouse"
          >
            Agregar Bodega
          </Button>
        </Stack>
      </Box>
      <TableUI
        data={warehouses || []}
        columns={columns}
        emptyText="No se encontraron bodegas"
        isFetching={warehousesIsLoading}
        page={page}
        handleChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        recordsCount={warehousesCount}
        recordsCountLoading={warehousesCountIsLoading}
        handleViewRow={handleViewRow}
        handleEditRow={handleEditRow}
        handleDeleteRow={handleDeleteRow}
      />
    </>
  );
}
