import * as yup from 'yup';
import { expenseCategorySnackbarMessages, expenseCategoryFormsValidations } from 'src/constants';
import useEditEntity from '../common/useEditEntity';
import { ExpenseCategory } from './interface';
import { supabase } from 'src/supabaseClient';

type EditExpenseCategory = Omit<ExpenseCategory, 'id'>;

const useEditExpenseCategory = ({id}: {id: string}) => {
  
  const expenseCategorySchema = yup.object().shape({
    name: yup.string().required(expenseCategoryFormsValidations.name.required),
    type: yup.string().required(expenseCategoryFormsValidations.type.required),
    available_at: yup.string().required(expenseCategoryFormsValidations.available_at.required)
  });

  const mutationFn = async(values: EditExpenseCategory) => {
    const { data } = await supabase
      .from('expense_categories')
      .update(values)
      .eq('id', id)
      .select()
      .throwOnError();
      
    return data;
  }

  const { formik, isLoading } = useEditEntity({
    id,
    initialValues: {
      name: '',
      type: '',
      available_at: '',
    },
    validationSchema: expenseCategorySchema,
    onSuccessPath: '/expenses/categories',
    successMessage: expenseCategorySnackbarMessages.success.edit,
    errorMessage: expenseCategorySnackbarMessages.errors.edit,
    mutationFn,
  })

  return {
    formik,
    isLoading
  };
};

export default useEditExpenseCategory;