import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from 'src/supabaseClient';
import { useSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';
import { authFormsValidations, authSnackbarMessages } from 'src/constants';

interface SignUpValues {
  email: string;
  password: string;
}

const useSignUp = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  const signUpSchema = yup.object().shape({
    email: yup.string().email(authFormsValidations.email.valid).required(authFormsValidations.email.required),
    password: yup.string().required(authFormsValidations.password.required).min(6, authFormsValidations.password.min(6)),
  });

  const {
    mutate,
    isPending
  } = useMutation({
    mutationFn: async(values: SignUpValues) => {
      const { data, error } = await supabase.auth.signUp({
        email: values.email, 
        password: values.password,
        options: {
          emailRedirectTo: import.meta.env.VITE_SUPABASE_SIGNUP_EMAIL_REDIRECT_TO_URL
        }
      });
      
      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      enqueueSnackbar(authSnackbarMessages.success.signup, { variant: 'success' });
      navigate({to: '/signin'});
    },
    onError: () => {
      enqueueSnackbar(authSnackbarMessages.errors.signup, { variant: 'error' });
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