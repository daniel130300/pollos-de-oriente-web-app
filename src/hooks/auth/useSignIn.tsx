import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from '@tanstack/react-router';
import { enqueueSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';
import { supabase } from 'src/supabaseClient';
import { authSnackbarMessages, authFormsValidations } from 'src/constants';

interface SignInValues {
  email: string;
  password: string;
}

const useSignIn = () => {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: async (values: SignInValues) => {
      const { data, error } = await supabase.auth.signInWithPassword(values);

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      navigate({ to: '/products' });
    },
    onError: () => {
      enqueueSnackbar(authSnackbarMessages.errors.login, { variant: 'error' });
    },
  });

  const signInSchema = yup.object().shape({
    email: yup
      .string()
      .email(authFormsValidations.email.valid)
      .required(authFormsValidations.email.required),
  });

  const formik = useFormik<SignInValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: async values => {
      mutate(values);
    },
    enableReinitialize: true,
  });

  return { formik, isLoading: isPending };
};

export default useSignIn;
