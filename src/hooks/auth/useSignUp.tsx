import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from 'src/supabaseClient';
import { useSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';
import { authForm, authEnqueue } from 'src/localization';

interface SignUpValues {
  email: string;
  password: string;
}

const useSignUp = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  const signUpSchema = yup.object().shape({
    email: yup.string().email(authForm.email.valid).required(authForm.email.required),
    password: yup.string().required(authForm.password.required).min(6, authForm.password.min(6)),
  });

  const {
    mutate,
    isPending
  } = useMutation({
    mutationFn: async(values: SignUpValues) => {
      const { error } = await supabase.auth.signUp({
        email: values.email, 
        password: values.password,
        options: {
          emailRedirectTo: import.meta.env.VITE_SUPABASE_SIGNUP_EMAIL_REDIRECT_TO_URL
        }
      });
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      enqueueSnackbar(authEnqueue.success.signup, { variant: 'success' });
      navigate({to: '/signin'});
    },
    onError: () => {
      enqueueSnackbar(authEnqueue.errors.signup, { variant: 'error' });
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