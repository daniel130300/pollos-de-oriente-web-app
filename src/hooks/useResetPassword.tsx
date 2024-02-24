import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from '../supabaseClient';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';

const useResetPassword = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  const userSchema = yup.object().shape({
    email: yup.string().email('El correo debe ser valido').required('El correo es un campo requerido')
  });

  const { 
    isLoading, 
    mutate 
  } = useMutation(
    async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        throw error;
      }
    },
    {
      onSuccess: () => {
        navigate({to: '/signin'});
        enqueueSnackbar('Si tu correo existe, se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.', { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar('Error enviando correo para reestablecer tu contraseña', { variant: 'error' });
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      mutate(values.email);
    },
    enableReinitialize: true
  });

  return { formik, isLoading };
};

export default useResetPassword;