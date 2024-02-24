import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from '@tanstack/react-router';

import { enqueueSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { supabase } from '../supabaseClient';

const useSignIn = () => {
  const navigate = useNavigate();

  const {
    isLoading, 
    mutate
  } = useMutation(
    async (values: any) => {
      const { error } = await supabase.auth.signInWithPassword(values);
      if (error) {
        throw error;
      }
    },
    {
      onSuccess: () => {
        navigate({to: '/products'});
      },
      onError: () => {
        enqueueSnackbar('Error iniciando sesión', { variant: 'error' });
      },
    }
  );

  const userSchema = yup.object().shape({
    email: yup.string().email('El correo debe ser valido').required('El correo es un campo requerido')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      mutate(values);
    },
    enableReinitialize: true
  });

  return { formik, isLoading };
};

export default useSignIn;
