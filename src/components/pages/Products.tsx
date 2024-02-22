import TableUI from '../atoms/TableUI';
import { ColumnDef } from "@tanstack/react-table";
import usePagination from '../../hooks/usePagination';
import useProductData from '../../hooks/useProductData';
import { Typography } from '@mui/material';
import Button from '../atoms/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from '@tanstack/react-router';

function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString();
}

const columns: ColumnDef<any, any>[] = [
  { accessorKey: "id", header: "Id", cell: (product: any) => <span>{product.row.original.id}</span> },
  { accessorKey: "name", header: "Name", cell: (product: any) => <span>{product.row.original.name}</span>},
  { accessorKey: "unity", header: "Unidad", cell: (product: any) => <span>{product.row.original.unity}</span> },
  { accessorKey: "sale_price", header: "Precio de Venta", cell: (product: any) => <span>{product.row.original.sale_price}</span> },
  { accessorKey: "purchase_price", header: "Precio de Compra", cell: (product: any) => <span>{product.row.original.purchase_price}</span> },
  { accessorKey: "created_at", header: "Creado", cell: (product: any) => <span>{formatTimestamp(product.row.original.created_at)}</span> },
  { accessorKey: "updated_at", header: "Actualizado", cell: (product: any) => <span>{formatTimestamp(product.row.original.updated_at)}</span> },
];

const Products = () => {

  const { 
    page, 
    handleChangePage,
    rowsPerPage, 
    handleChangeRowsPerPage
  } = usePagination();

  const { products, productsIsLoading, productsCount, productsCountIsLoading } = useProductData({page, rowsPerPage});

  return (
    <>
      <Typography variant='h1' mb={4}>Productos</Typography>
      <Button endIcon={<AddCircleIcon/>} sx={{mx: "auto", mb: 2}} component={Link} to='/add-product'>Agregar Producto</Button>
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

export default Products;