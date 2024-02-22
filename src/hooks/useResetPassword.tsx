import { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from '../supabaseClient';
import { useSnackbar } from 'notistack';

const useResetPassword = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

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
      setSubmitLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(values.email)
      setSubmitLoading(false);

      if (error) {
        setResetPasswordError(error.message);
        return;
      }

      navigate({to: '/signin'});
      enqueueSnackbar('Si tu correo existe, se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.')
    },
    enableReinitialize: true
  });

  return { formik, submitLoading, resetPasswordError };
};

export default useResetPassword;