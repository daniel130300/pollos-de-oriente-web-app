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
import {
  formatTimestamp,
  translateEstablishment,
  translateProductInventorySubtraction,
} from 'src/utils';
import { useNavigate } from '@tanstack/react-router';
import useDeleteProduct from 'src/hooks/products/useDeleteProduct';
import useGetProducts from 'src/hooks/products/useGetProducts';
import { Product } from 'src/hooks/products/interface';

export const Route = createLazyFileRoute('/_auth/products/')({
  component: Products,
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
    accessorKey: 'inventory_subtraction',
    header: 'Se resta de manera',
    cell: product => (
      <span>
        {translateProductInventorySubtraction(
          product.row.original.inventory_subtraction,
        )}
      </span>
    ),
  },
  {
    accessorKey: 'can_be_purchased_only',
    header: 'Solo se puede comprar en',
    cell: product => (
      <span>
        {translateEstablishment(product.row.original.can_be_purchased_only)}
      </span>
    ),
  },
  {
    accessorKey: 'expense_category',
    header: 'Se ingresa como',
    cell: product => (
      <span>{product.row.original.expense_categories.name}</span>
    ),
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

function Products() {
  const navigate = useNavigate();
  const { setProductToDelete } = useDeleteProduct();
  const {
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    search,
    setSearch,
    products,
    productsIsLoading,
    productsCount,
    productsCountIsLoading,
  } = useGetProducts();

  const handleViewRow = (product: Product) => {
    navigate({ to: '/products/$id', params: { id: product.id } });
  };

  const handleEditRow = (product: Product) => {
    navigate({ to: '/products/$id/edit', params: { id: product.id } });
  };

  const handleDeleteRow = (product: Product) => {
    setProductToDelete(product);
  };

  return (
    <>
      <Typography variant="h1">Productos</Typography>
      <Box my={2}>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="flex-end"
        >
          <InputField
            id="search"
            name="search"
            label="Buscar por nombre de producto"
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
            to="/products/add-product"
          >
            Agregar Producto
          </Button>
        </Stack>
      </Box>
      <TableUI
        data={products || []}
        columns={columns}
        emptyText="No se encontraron productos"
        isFetching={productsIsLoading}
        page={page}
        handleChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        recordsCount={productsCount}
        recordsCountLoading={productsCountIsLoading}
        handleViewRow={handleViewRow}
        handleEditRow={handleEditRow}
        handleDeleteRow={handleDeleteRow}
      />
    </>
  );
}
