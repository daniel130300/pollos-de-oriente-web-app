import { createLazyFileRoute } from '@tanstack/react-router'
import Stack from "@mui/material/Stack";
import InputField from 'src/components/atoms/InputField';
import Button from 'src/components/atoms/Button';
import SelectField from 'src/components/atoms/SelectField';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import useAddExpenseCategory from 'src/hooks/expense-category/useAddExpenseCategory';
import { expenseCategoryTypeItems, establishmentItems } from 'src/constants';

export const Route = createLazyFileRoute('/_auth/expenses/categories/add-category')({
  component: AddExpenseCategory
})

function AddExpenseCategory () {
  const {
    formik,
    isLoading
  } = useAddExpenseCategory();

  return (
    <DetailsTemplate title='Agregar Categoría de Gasto' returnButtonProps={{to: '/expenses/categories', params: {}}} >
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
        <Button onClick={() => formik.handleSubmit()} isLoading={isLoading}>Agregar Categoría de Gasto</Button>
      </>
    </DetailsTemplate>
  );
};

export default AddExpenseCategory;