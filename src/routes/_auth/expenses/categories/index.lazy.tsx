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
import { formatTimestamp, translateEstablishment, translateExpenseCategoryType } from 'src/utils';
import { useNavigate } from '@tanstack/react-router';
import useGetExpenseCategories from 'src/hooks/expense-category/useGetExpenseCategories';
import useDeleteExpenseCategory from 'src/hooks/expense-category/useDeleteExpenseCategory';
import { ExpenseCategory } from 'src/hooks/expense-category/interface';

export const Route = createLazyFileRoute('/_auth/expenses/categories/')({
  component: ExpensesCategories
})

const columns: ColumnDef<any, any>[] = [
  { accessorKey: "id", header: "Id", cell: (expense_category) => <span>{expense_category.row.original.id}</span> },
  { accessorKey: "name", header: "Nombre", cell: (expense_category) => <span>{expense_category.row.original.name}</span>},
  { accessorKey: "type", header: "Tipo", cell: (expense_category) => <span>{translateExpenseCategoryType(expense_category.row.original.type)}</span>},
  { accessorKey: "available_at", header: "Disponible en", cell: (expense_category) => <span>{translateEstablishment(expense_category.row.original.available_at)}</span>},
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
    expenseCategories,
    expenseCategoriesIsLoading,
    expenseCategoriesCount,
    expenseCategoriesCountIsLoading
  } = useGetExpenseCategories();
  const { setExpenseCategoryToDelete } = useDeleteExpenseCategory();

  const handleViewRow = (expense_category: ExpenseCategory) => {
    navigate({ to: '/expenses/categories/$id', params: { id: expense_category.id } })
  }

  const handleEditRow = (expense_category: ExpenseCategory) => {
    navigate({ to: '/expenses/categories/$id/edit', params: { id: expense_category.id } })
  }

  const handleDeleteRow = (expense_category: ExpenseCategory) => {
    setExpenseCategoryToDelete(expense_category);
  }

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
        data={expenseCategories || []}
        columns={columns}
        emptyText="No se encontraron categorías de gasto"
        isFetching={expenseCategoriesIsLoading}
        page={page}
        handleChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        recordsCount={expenseCategoriesCount}
        recordsCountLoading={expenseCategoriesCountIsLoading}
        handleViewRow={handleViewRow}
        handleEditRow={handleEditRow}
        handleDeleteRow={handleDeleteRow}
      />
    </>
  );
};