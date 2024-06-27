import { createLazyFileRoute } from '@tanstack/react-router';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Loader from 'src/components/atoms/Loader';
import Card from '@mui/material/Card';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import useGetCategoryExpense from 'src/hooks/expense-category/useGetExpenseCategory';
import {
  formatTimestamp,
  translateEstablishment,
  translateExpenseCategoryType,
} from 'src/utils';

export const Route = createLazyFileRoute('/_auth/expenses/categories/$id')({
  component: CategoryExpense,
});

function CategoryExpense() {
  const { id } = Route.useParams();
  const { expenseCategory, expenseCategoryIsLoading } = useGetCategoryExpense({
    id,
  });

  if (expenseCategoryIsLoading) return <Loader type="cover" />;

  return (
    <DetailsTemplate
      title="Detalle de la Categoría de Gasto"
      returnButtonProps={{ to: '/expenses/categories', params: {} }}
    >
      <Card sx={{ p: 4 }}>
        <Stack spacing={4}>
          <Typography variant="body1">Id: {expenseCategory.id}</Typography>
          <Typography variant="body1">
            Nombre: {expenseCategory.name}
          </Typography>
          <Typography variant="body1">
            Tipo: {translateExpenseCategoryType(expenseCategory.type)}
          </Typography>
          <Typography variant="body1">
            Disponible en:{' '}
            {translateEstablishment(expenseCategory.available_at)}
          </Typography>
          <Typography variant="body1">
            Creado: {formatTimestamp(expenseCategory.created_at)}
          </Typography>
          <Typography variant="body1">
            Actualizado: {formatTimestamp(expenseCategory.updated_at)}
          </Typography>
        </Stack>
      </Card>
    </DetailsTemplate>
  );
}

export default CategoryExpense;
