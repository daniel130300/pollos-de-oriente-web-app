import { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from '../supabaseClient';

const useSignUp = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const navigate = useNavigate();

  const userSchema = yup.object().shape({
    email: yup.string().email('El correo debe ser valido').required('El correo es un campo requerido'),
    password: yup.string().required('La contraseña es un campo requerido').min(6, 'La contraseña debe tener al menos 6 caracteres'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      setSubmitLoading(true);
      const { error } = await supabase.auth.signUp({ email: values.email, password: values.password })
      if (error) {
        setSignUpError(error.message);
      }
      setSubmitLoading(false);
      if (!error) {
        navigate({to: '/signin'});
      }
    },
    enableReinitialize: true
  });

  return { formik, submitLoading, signUpError };
};

export default useSignUp;