import TableUI from '../atoms/TableUI';
import { ColumnDef } from "@tanstack/react-table";
import usePagination from '../../hooks/usePagination';
import useProductData from '../../hooks/useProductData';

function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString();
}

const columns: ColumnDef<any, any>[] = [
  { accessorKey: "id", header: "Id", cell: (product: any) => <span>{product.row.original.id}</span> },
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
  );
};

export default Products;