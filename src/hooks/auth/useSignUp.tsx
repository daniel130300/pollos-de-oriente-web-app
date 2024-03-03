import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from 'src/supabaseClient';
import { useSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';

interface SignUpValues {
  email: string;
  password: string;
}

const useSignUp = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  const signUpSchema = yup.object().shape({
    email: yup.string().email('El correo debe ser valido').required('El correo es un campo requerido'),
    password: yup.string().required('La contraseña es un campo requerido').min(6, 'La contraseña debe tener al menos 6 caracteres'),
  });

  const {
    mutate,
    isPending
  } = useMutation({
    mutationFn: async(values: SignUpValues) => {
      const { error } = await supabase.auth.signUp(values);
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      enqueueSnackbar('Antes de iniciar sesión, deberás verificar el correo utilizado al momento de crear tu cuenta', { variant: 'info' });
      navigate({to: '/signin'});
    },
    onError: () => {
      enqueueSnackbar('Error creando cuenta', { variant: 'error' });
    }
  });

  const formik = useFormik<SignUpValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      mutate(values)
    },
    enableReinitialize: true
  });

  return { formik, isLoading: isPending };
};

export default useSignUp;