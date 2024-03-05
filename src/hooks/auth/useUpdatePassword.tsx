import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from 'src/supabaseClient';
import { useSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';
import { authFormsValidations, authSnackbarMessages } from 'src/constants';

const useUpdatePassword = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  const {mutate, isPending} = useMutation({
    mutationFn: async(password: string) => {
      const { data, error } = await supabase.auth.updateUser({ password });

      if(error) {
        throw error
      }

      return data;
    },
    onSuccess: () => {
      enqueueSnackbar(authSnackbarMessages.success.passwordUpdate, { variant: 'success' });
      navigate({to: '/products'});
    },
    onError: () => {
      enqueueSnackbar(authSnackbarMessages.errors.passwordUpdate, { variant: 'error' });
    },
  });

  const updatePasswordSchema = yup.object().shape({
    password: yup.string().required(authFormsValidations.password.required).min(6, authFormsValidations.password.min(6)),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], authFormsValidations.confirmPassword.oneOf)
        .required(authFormsValidations.confirmPassword.required)
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