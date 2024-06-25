import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { expenseCategorySnackbarMessages, expenseCategoryFormsValidations } from 'src/constants';
import { supabase } from 'src/supabaseClient';
import { ExpenseCategory } from './interface';

type EditExpenseCategory = Omit<ExpenseCategory, 'id'>;

const useEditExpenseCategory = ({id}: {id: string}) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const productSchema = yup.object().shape({
    name: yup.string().required(expenseCategoryFormsValidations.name.required),
    type: yup.string().required(expenseCategoryFormsValidations.type.required),
    available_at: yup.string().required(expenseCategoryFormsValidations.available_at.required)
  });

  const {
    isPending,
    mutate
  } = useMutation(
    {
      mutationFn: async(values: EditExpenseCategory) => {
        const { data } = await supabase
                              .from('expense_categories')
                              .update(values)
                              .eq('id', id)
                              .select()
                              .throwOnError()
        return data;
      },
      onSuccess: () => {
        enqueueSnackbar(expenseCategorySnackbarMessages.success.edit, { variant: 'success' });
        navigate({ to: '/expenses/categories' });
      },
      onError: () => {
        enqueueSnackbar(expenseCategorySnackbarMessages.errors.edit, { variant: 'error' });
      }
    }
  );

  const formik = useFormik<EditExpenseCategory>({
    initialValues: {
      name: '',
      type: null,
      available_at: null
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      mutate(values);
    },
    enableReinitialize: true
  });

  return {
    formik,
    isLoading: isPending
  };
};

export default useEditExpenseCategory;