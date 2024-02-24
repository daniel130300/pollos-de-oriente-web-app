import { createLazyFileRoute } from '@tanstack/react-router'
import { ColumnDef } from "@tanstack/react-table";
import usePagination from '../../hooks/usePagination';
import useProductData from '../../hooks/useProductData';
import { Box, Stack, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import Button from '../../components/atoms/Button';
import { InputField } from '../../components/atoms/InputField';
import TableUI from '../../components/atoms/TableUI';
import { formatTimestamp } from '../../utils/formatTimestamp';

export const Route = createLazyFileRoute('/_auth/products')({
  component: Products
})

const columns: ColumnDef<any, any>[] = [
  { accessorKey: "id", header: "Id", cell: (product: any) => <span>{product.row.original.id}</span> },
  { accessorKey: "name", header: "Name", cell: (product: any) => <span>{product.row.original.name}</span>},
  { accessorKey: "unity", header: "Unidad", cell: (product: any) => <span>{product.row.original.unity}</span> },
  { accessorKey: "sale_price", header: "Precio de Venta", cell: (product: any) => <span>{product.row.original.sale_price}</span> },
  { accessorKey: "purchase_price", header: "Precio de Compra", cell: (product: any) => <span>{product.row.original.purchase_price}</span> },
  { accessorKey: "created_at", header: "Creado", cell: (product: any) => <span>{formatTimestamp(product.row.original.created_at)}</span> },
  { accessorKey: "updated_at", header: "Actualizado", cell: (product: any) => <span>{formatTimestamp(product.row.original.updated_at)}</span> },
];

function Products() {
  const { 
    page, 
    handleChangePage,
    rowsPerPage, 
    handleChangeRowsPerPage
  } = usePagination();

  const [search, setSearch] = useState('');
  const { products, productsIsLoading, productsCount, productsCountIsLoading } = useProductData({page, rowsPerPage, search});

  return (
    <>
      <Typography variant='h1'>Productos</Typography>
      <Box my={2}>
        <Stack spacing={2} direction={{xs:'column', sm: 'row'}} justifyContent="flex-end">
          <InputField 
            id="search" 
            label='Buscar por nombre de producto' 
            type="text" variant='outlined' 
            size='small' 
            sx={{minWidth: '300px'}}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button 
            endIcon={<AddCircleIcon/>} 
            sx={{mx: "auto", mb: 2}} 
            component={Link} 
            to='/add-product'
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
      />
    </>
  );
};