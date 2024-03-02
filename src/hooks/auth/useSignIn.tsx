import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from '@tanstack/react-router';
import { enqueueSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '../../supabaseClient';

interface SignInValues {
  email: string;
  password: string;
}

const useSignIn = () => {
  const navigate = useNavigate();

  const {
    isPending, 
    mutate
  } = useMutation({
    mutationFn: async (values: SignInValues) => {
      const { error } = await supabase.auth.signInWithPassword(values);
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      navigate({to: '/products'});
    },
    onError: () => {
      enqueueSnackbar('Error iniciando sesión', { variant: 'error' });
    },
  });

  const signInSchema = yup.object().shape({
    email: yup.string().email('El correo debe ser valido').required('El correo es un campo requerido')
  });

  const formik = useFormik<SignInValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      mutate(values);
    },
    enableReinitialize: true
  });

  return { formik, isLoading: isPending };
};

export default useSignIn;
