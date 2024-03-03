import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from 'src/supabaseClient';
import { useSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';
import { authForm, authEnqueue } from 'src/localization';

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
      enqueueSnackbar(authEnqueue.success.passwordUpdate, { variant: 'success' });
      navigate({to: '/products'});
    },
    onError: () => {
      enqueueSnackbar(authEnqueue.errors.passwordUpdate, { variant: 'error' });
    },
  });

  const updatePasswordSchema = yup.object().shape({
    password: yup.string().required(authForm.password.required).min(6, authForm.password.min(6)),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], authForm.confirmPassword.oneOf)
        .required(authForm.confirmPassword.required)
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