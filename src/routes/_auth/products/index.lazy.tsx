import { useEffect } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router'
import { ColumnDef } from "@tanstack/react-table";
import usePagination from 'src/hooks/common/usePagination';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import Button from 'src/components/atoms/Button';
import { InputField } from 'src/components/atoms/InputField';
import TableUI from 'src/components/atoms/TableUI';
import { formatTimestamp, parseToCurrency } from 'src/utils';
import { useNavigate } from '@tanstack/react-router';
import { useModalStore } from 'src/zustand/useModalStore';
import useDeleteProduct from 'src/hooks/products/useDeleteProduct';
import Loader from 'src/components/atoms/Loader';
import useGetProducts from 'src/hooks/products/useGetProducts';

export const Route = createLazyFileRoute('/_auth/products/')({
  component: Products
})

const columns: ColumnDef<any, any>[] = [
  { accessorKey: "id", header: "Id", cell: (product) => <span>{product.row.original.id}</span> },
  { accessorKey: "name", header: "Nombre", cell: (product) => <span>{product.row.original.name}</span>},
  { accessorKey: "unity", header: "Unidad", cell: (product) => <span>{product.row.original.unity}</span> },
  { accessorKey: "sale_price", header: "Precio de Venta", cell: (product) => <span>{parseToCurrency(product.row.original.sale_price)}</span> },
  { accessorKey: "purchase_price", header: "Precio de Compra", cell: (product) => <span>{parseToCurrency(product.row.original.purchase_price)}</span> },
  { accessorKey: "created_at", header: "Creado", cell: (product) => <span>{formatTimestamp(product.row.original.created_at)}</span> },
  { accessorKey: "updated_at", header: "Actualizado", cell: (product) => <span>{formatTimestamp(product.row.original.updated_at)}</span> }
];

function Products() {
  const navigate = useNavigate();
  const { 
    page, 
    handleChangePage,
    rowsPerPage, 
    handleChangeRowsPerPage
  } = usePagination();
  const { handleOpen, handleClose } = useModalStore();
  const [search, setSearch] = useState('');
  const { products, productsIsLoading, productsCount, productsCountIsLoading } = useGetProducts({page, rowsPerPage, search});
  const { mutate, isLoading, deleteImageIsLoading, productToDelete, setProductToDelete } = useDeleteProduct();

  const handleViewRow = (product: any) => {
    navigate({ to: '/products/$id', params: { id: product.id } })
  }

  const handleEditRow = (product: any) => {
    navigate({ to: '/products/$id/edit', params: { id: product.id } })
  }

  const handleDelete = (product: any) => {
    mutate(product);
  }

  const handleDeleteRow = (product: any) => {
    setProductToDelete(product);
  }

  useEffect(() => {
    if(!productToDelete) return;

    handleOpen({
      title: 'Eliminar Producto', 
      description: `¿Estas seguro que deseas eliminar el siguiente producto: ${productToDelete.name}?`,
      buttons: <>
        {(isLoading || deleteImageIsLoading) ? (
          <Loader />
        ) : (
          <Stack direction="row" spacing={1}>
            <Button onClick={() => handleClose()} color="action">Cancelar</Button>
            <Button onClick={() => handleDelete(productToDelete)} color="error">Eliminar</Button>
          </Stack>
        )}
      </>
    });

  }, [isLoading, deleteImageIsLoading, productToDelete]);

  return (
    <>
      <Typography variant='h1'>Productos</Typography>
      <Box my={2}>
        <Stack spacing={2} direction={{xs:'column', sm: 'row'}} justifyContent="flex-end">
          <InputField 
            id="search" 
            name="search"
            label='Buscar por nombre de producto' 
            type="text" 
            variant='outlined'
            size='small' 
            sx={{minWidth: '300px'}}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button 
            endIcon={<AddCircleIcon/>} 
            sx={{mx: "auto", mb: 2}} 
            component={Link} 
            to='/products/add-product'
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
};