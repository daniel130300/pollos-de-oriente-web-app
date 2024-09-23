import { createLazyFileRoute } from '@tanstack/react-router';
import Stack from '@mui/material/Stack';
import InputField from 'src/components/atoms/InputField';
import { Button } from 'src/components/atoms/Button';
import SelectField from 'src/components/atoms/SelectField';
import Loader from 'src/components/atoms/Loader';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import useGetExpenseCategory from 'src/hooks/expense-category/useGetExpenseCategory';
import useEditExpenseCategory from 'src/hooks/expense-category/useEditExpenseCategory';
import { expenseCategoryTypeItems, establishmentItems } from 'src/constants';

export const Route = createLazyFileRoute('/_auth/expenses/categories/$id/edit')(
  {
    component: EditExpenseCategory,
  },
);

function EditExpenseCategory() {
  const { id } = Route.useParams();
  const {
    expenseCategory,
    expenseCategoryIsLoading,
    expenseCategoryIsFetching,
  } = useGetExpenseCategory({
    id,
  });
  const { formik, isLoading } = useEditExpenseCategory({ id, expenseCategory });

  if (expenseCategoryIsLoading || expenseCategoryIsFetching)
    return <Loader type="cover" />;

  return (
    <DetailsTemplate
      title="Editar Categoría de Gasto"
      returnButtonProps={{ to: '/expenses/categories', params: {} }}
    >
      <>
        <Stack spacing={4} mb={4}>
          <InputField
            id="name"
            name="name"
            label="Nombre"
            type="text"
            formik={formik}
          />
          <SelectField
            id="type"
            name="type"
            label="Tipo"
            items={expenseCategoryTypeItems}
            formik={formik}
          />
          <SelectField
            id="available_at"
            name="available_at"
            label="Disponible en"
            items={establishmentItems}
            formik={formik}
          />
        </Stack>
        <Button onClick={() => formik.handleSubmit()} isLoading={isLoading}>
          Editar Producto
        </Button>
      </>
    </DetailsTemplate>
  );
}

export default EditExpenseCategory;
