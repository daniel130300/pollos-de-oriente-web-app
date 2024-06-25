import { createLazyFileRoute } from '@tanstack/react-router'
import Stack from "@mui/material/Stack";
import InputField from 'src/components/atoms/InputField';
import Button from 'src/components/atoms/Button';
import SelectField from 'src/components/atoms/SelectField';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import useAddExpenseCategory from 'src/hooks/expense-category/useAddCategory';
import { EstablishmentTypes, ExpenseCategoryTypes } from 'src/hooks/expense-category/interface';

export const Route = createLazyFileRoute('/_auth/expenses/categories/add-category')({
  component: AddExpenseCategory
})

function AddExpenseCategory () {
  const {
    formik,
    isLoading
  } = useAddExpenseCategory();

  const typeItems = [
    {label: ExpenseCategoryTypes.INVENTORY, value: ExpenseCategoryTypes.INVENTORY},
    {label: ExpenseCategoryTypes.NON_INVENTORY, value: ExpenseCategoryTypes.NON_INVENTORY}
  ];

  const availableAtItems = [
    {label: EstablishmentTypes.STORE, value: EstablishmentTypes.STORE},
    {label: EstablishmentTypes.WAREHOUSE, value: EstablishmentTypes.WAREHOUSE}
  ]

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
            labelId="label-type"
            name="type"
            label="Tipo" 
            items={typeItems}
            formik={formik}
          />
          <SelectField 
            id="available_at" 
            labelId="label-available_at"
            name="available_at"
            label="Disponible en" 
            items={availableAtItems}
            formik={formik}
          />
        </Stack>
        <Button onClick={() => formik.handleSubmit()} isLoading={isLoading}>Agregar Categoría de Gasto</Button>
      </>
    </DetailsTemplate>
  );
};

export default AddExpenseCategory;