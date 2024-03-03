import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from 'src/supabaseClient';
import { useSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';

const useUpdatePassword = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  const {mutate, isPending} = useMutation({
    mutationFn: async(password: string) => {
      const { error } = await supabase.auth.updateUser({ password });

      if(error) {
        throw error
      }
    },
    onSuccess: () => {
      enqueueSnackbar('Contraseña actualizada exitosamente', { variant: 'success' });
      navigate({to: '/products'});
    },
    onError: () => {
      enqueueSnackbar('Error actualizando la contraseña', { variant: 'error' });
    },
  });

  const updatePasswordSchema = yup.object().shape({
    password: yup.string().required('La contraseña es un campo requerido').min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
        .required('Es necesario confirmar la contraseña')
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: updatePasswordSchema,
    onSubmit: async (values) => {
      mutate(values.password)
    },
    enableReinitialize: true
  });

  return { formik, isLoading: isPending };
};

export default useUpdatePassword;