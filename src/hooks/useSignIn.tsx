import { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from '../supabaseClient';

const useSignIn = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);
  const navigate = useNavigate();

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
      const { error } = await supabase.auth.signInWithPassword({ email: values.email, password: values.password })
      setSubmitLoading(false);

      if (error) {
        setSignInError(error.message);
        return;
      }

      navigate({to: '/products'});
    },
    enableReinitialize: true
  });

  return { formik, submitLoading, signInError };
};

export default useSignIn;
