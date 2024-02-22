import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { supabase } from '../../supabaseClient';
import { useSnackbar } from 'notistack';

function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString();
}

const columns = [
  { 
    id: 'id', 
    label: 'id', 
    minWidth: 170
  },
  {
    id: 'unity',
    label: 'Unidad',
    minWidth: 100,
  },
  { 
    id: 'purchase_price', 
    label: 'Precio de Compra', 
    minWidth: 100 
  },
  {
    id: 'sale_price',
    label: 'Precio de Venta',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'created_at',
    label: 'Creado',
    minWidth: 170,
    align: 'right',
    format: formatTimestamp
  },
  {
    id: 'updated_at',
    label: 'Actualizado',
    minWidth: 170,
    align: 'right',
    format: formatTimestamp
  },
];

export const Products = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState<null | any[]>([])
  const [count, setCount] = useState<any>(0);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const start = page * rowsPerPage;
      const end = start + rowsPerPage;
      
      const { count: productsCount, error: productCountError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });
  
      const { data: productsData, error: productsDataError } = await supabase
        .from('products')
        .select('*')
        .range(start, end);
  
      if (productCountError) {
        enqueueSnackbar('Error obteniendo el conteo total de productos', { variant: 'error' });
      }
  
      if (productsDataError) {
        enqueueSnackbar('Error obteniendo el listado de productos', { variant: 'error' });
      }
  
      setProducts(productsData);
      setCount(productsCount);
    };
  
    fetchData();
  }, [page, rowsPerPage]);

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products && products
                .map((product) => {
                  return (
                    <TableRow key={product.id} hover role="checkbox" tabIndex={-1}>
                      {columns.map((column) => {
                        const value = product[column.id];
                        return (
                          <TableCell key={column.id}>
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default Products;