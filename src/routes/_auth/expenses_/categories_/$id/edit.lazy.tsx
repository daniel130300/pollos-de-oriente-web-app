import { useEffect } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router'
import Stack from "@mui/material/Stack";
import InputField from 'src/components/atoms/InputField';
import { Button } from 'src/components/atoms/Button';
import SelectField from 'src/components/atoms/SelectField';
import Loader from 'src/components/atoms/Loader';
import useEditProduct from 'src/hooks/products/useEditProduct';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import useGetExpenseCategory from 'src/hooks/expense-category/useGetExpenseCategory';
import { EstablishmentTypes, ExpenseCategoryTypes } from 'src/hooks/expense-category/interface';

export const Route = createLazyFileRoute('/_auth/expenses/categories/$id/edit')({
  component: EditExpenseCategory
})

function EditExpenseCategory () {
  const { id } = Route.useParams();
  const { expenseCategory, expenseCategoryIsLoading, expenseCategoryIsError } = useGetExpenseCategory({id})
  const { formik, isLoading } = useEditProduct({id})

  const typeItems = [
    {label: ExpenseCategoryTypes.INVENTORY, value: ExpenseCategoryTypes.INVENTORY},
    {label: ExpenseCategoryTypes.NON_INVENTORY, value: ExpenseCategoryTypes.NON_INVENTORY}
  ];

  const availableAtItems = [
    {label: EstablishmentTypes.STORE, value: EstablishmentTypes.STORE},
    {label: EstablishmentTypes.WAREHOUSE, value: EstablishmentTypes.WAREHOUSE}
  ]


  useEffect(() => {
    if (!expenseCategoryIsLoading && !expenseCategoryIsError) {
      formik.setValues({
        name: expenseCategory.name,
        type: expenseCategory.type,
        available_at: expenseCategory.available_at,
      })
    }
  }, [expenseCategory, expenseCategoryIsError, expenseCategoryIsLoading])

  if (expenseCategoryIsLoading) return <Loader type='cover'/>

  return (
    <DetailsTemplate title='Editar Categoría de Gasto' returnButtonProps={{to: '/expenses/categories', params: {}}}>
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
        <Button onClick={() => formik.handleSubmit()} isLoading={isLoading}>Editar Producto</Button>
      </>
    </DetailsTemplate>
  );
};

export default EditExpenseCategory;