import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from '../supabaseClient';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';

const useSignUp = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  const userSchema = yup.object().shape({
    email: yup.string().email('El correo debe ser valido').required('El correo es un campo requerido'),
    password: yup.string().required('La contraseña es un campo requerido').min(6, 'La contraseña debe tener al menos 6 caracteres'),
  });

  const {
    mutate,
    isLoading
  } = useMutation(
    async (values: any) => {
      const { error } = await supabase.auth.signUp(values);
      if (error) {
        throw new Error('Error creando cuenta');
      }
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Antes de iniciar sesión, deberás verificar el correo utilizado al momento de crear tu cuenta', { variant: 'info' });
        navigate({to: '/signin'});
      },
      onError: () => {
        enqueueSnackbar('Error creando cuenta', { variant: 'error' });
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      mutate(values)
    },
    enableReinitialize: true
  });

  return { formik, isLoading };
};

export default useSignUp;