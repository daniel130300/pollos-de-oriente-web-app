// import { useEffect } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router'
import { ColumnDef } from "@tanstack/react-table";
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
// import { useModalStore } from 'src/zustand/useModalStore';
// import useDeleteProduct from 'src/hooks/products/useDeleteProduct';
// import Loader from 'src/components/atoms/Loader';
import { useGetCategoryExpenses } from 'src/hooks/expense-category/useGetCategoryExpenses';

export const Route = createLazyFileRoute('/_auth/expenses/categories/')({
  component: ExpensesCategories
})

const columns: ColumnDef<any, any>[] = [
  { accessorKey: "id", header: "Id", cell: (expense_category) => <span>{expense_category.row.original.id}</span> },
  { accessorKey: "name", header: "Nombre", cell: (expense_category) => <span>{expense_category.row.original.name}</span>},
  { accessorKey: "type", header: "Tipo", cell: (expense_category) => <span>{expense_category.row.original.type}</span>},
  { accessorKey: "available_at", header: "Disponible en", cell: (expense_category) => <span>{expense_category.row.original.available_at}</span>},
  { accessorKey: "created_at", header: "Creado", cell: (expense_category) => <span>{formatTimestamp(expense_category.row.original.created_at)}</span> },
  { accessorKey: "updated_at", header: "Actualizado", cell: (expense_category) => <span>{formatTimestamp(expense_category.row.original.updated_at)}</span> }
];

function ExpensesCategories() {
  const navigate = useNavigate();
  const {
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    search,
    setSearch,
    categoryExpenses,
    categoryExpensesIsLoading,
    categoryExpensesCount,
    categoryExpensesCountIsLoading
  } = useGetCategoryExpenses();
  // const { handleOpen, handleClose } = useModalStore();
  // const { mutate, isLoading, deleteImageIsLoading, productToDelete, setProductToDelete } = useDeleteProduct();

  const handleViewRow = (expense_category: any) => {
    // navigate({ to: '/expenses/categories/$id', params: { id: expense.id } })
  }

  const handleEditRow = (expense_category: any) => {
    // navigate({ to: '/expenses/categories/$id/edit', params: { id: expense.id } })
  }

  const handleDelete = (expense_category: any) => {
    // mutate(product);
  }

  const handleDeleteRow = (expense_category: any) => {
    // setProductToDelete(product);
  }

  // useEffect(() => {
  //   if(!expenseCategoryToDelete) return;

  //   handleOpen({
  //     title: 'Eliminar Categoría de Gasto', 
  //     description: `¿Estas seguro que deseas eliminar la siguiente categoría de gasto: ${productToDelete.name}?`,
  //     buttons: <>
  //       {(isLoading || deleteImageIsLoading) ? (
  //         <Loader />
  //       ) : (
  //         <Stack direction="row" spacing={1}>
  //           <Button onClick={() => handleClose()} color="action">Cancelar</Button>
  //           <Button onClick={() => handleDelete(productToDelete)} color="error">Eliminar</Button>
  //         </Stack>
  //       )}
  //     </>
  //   });

  // }, [isLoading, deleteImageIsLoading, productToDelete]);

  return (
    <>
      <Typography variant='h1'>Categorías de Gasto</Typography>
      <Box my={2}>
        <Stack spacing={2} direction={{xs:'column', sm: 'row'}} justifyContent="flex-end">
          <InputField 
            id="search" 
            name="search"
            label='Buscar por nombre de categoría' 
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
            to='/expenses/categories/add-category'
          >
            Agregar Categoría de Gasto
          </Button>
        </Stack>
      </Box>
      <TableUI
        data={categoryExpenses || []}
        columns={columns}
        emptyText="No se encontraron categorías de gasto"
        isFetching={categoryExpensesIsLoading}
        page={page}
        handleChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        recordsCount={categoryExpensesCount}
        recordsCountLoading={categoryExpensesCountIsLoading}
        handleViewRow={handleViewRow}
        handleEditRow={handleEditRow}
        handleDeleteRow={handleDeleteRow}
      />
    </>
  );
};