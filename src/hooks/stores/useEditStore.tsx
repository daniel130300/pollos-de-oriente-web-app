import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { storeFormsValidations, storeSnackbarMessages } from 'src/constants';
import { supabase } from 'src/supabaseClient';
import { Store } from './interface';

type EditStore = Omit<Store, 'id'>;

const useEditStore = ({ id }: { id: string }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const storeSchema = yup.object().shape({
    name: yup.string().required(storeFormsValidations.name.required),
    is_main: yup.string().required(storeFormsValidations.is_main.required),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (values: EditStore) => {
      const { data } = await supabase
        .from('stores')
        .update(values)
        .eq('id', id)
        .select()
        .throwOnError();
      return data;
    },
    onSuccess: () => {
      enqueueSnackbar(storeSnackbarMessages.success.edit, {
        variant: 'success',
      });
      navigate({ to: '/stores' });
    },
    onError: () => {
      enqueueSnackbar(storeSnackbarMessages.errors.edit, { variant: 'error' });
    },
  });

  const formik = useFormik<EditStore>({
    initialValues: {
      name: '',
      is_main: false,
    },
    validationSchema: storeSchema,
    onSubmit: async values => {
      mutate(values);
    },
    enableReinitialize: true,
  });

  return {
    formik,
    isLoading: isPending,
  };
};

export default useEditStore;
