import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from '../../supabaseClient';
import { useSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';

const useResetPassword = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  const resetPasswordSchema = yup.object().shape({
    email: yup.string().email('El correo debe ser valido').required('El correo es un campo requerido')
  });

  const { 
    isPending, 
    mutate 
  } = useMutation({    
    mutationFn: async(email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {redirectTo: import.meta.env.VITE_SUPABASE_RESET_PASSWORD_URL});

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      navigate({to: '/signin'});
      enqueueSnackbar('Si tu correo existe, se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Error enviando correo para reestablecer tu contraseña', { variant: 'error' });
    },
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      mutate(values.email);
    },
    enableReinitialize: true
  });

  return { formik, isLoading: isPending };
};

export default useResetPassword;