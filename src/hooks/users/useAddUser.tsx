import {
  roleFormsValidations,
  userFormsValidations,
  userSnackbarMessages,
} from 'src/constants';
import { User } from './interface';
import useAddEntity from '../common/useAddEntity';
import * as yup from 'yup';
import { supabase } from 'src/supabaseClient';
import { generateRandomPassword } from 'src/utils';
import { useSnackbar } from 'notistack';

type AddUser = Omit<User, 'id'>;

const useAddUser = () => {
  const { enqueueSnackbar } = useSnackbar();

  const userSchema = yup.object().shape({
    first_name: yup.string().required(userFormsValidations.first_name.required),
    last_name: yup.string().required(userFormsValidations.last_name.required),
    phone_number: yup
      .string()
      .required(userFormsValidations.phone_number.required),
    email: yup
      .string()
      .required(userFormsValidations.email.required)
      .email(userFormsValidations.email.format),
    establishment_id: yup
      .string()
      .required(userFormsValidations.select_store.required),
    role_id: yup.string().required(roleFormsValidations.select_role.required),
  });

  const mutationFn = async (values: AddUser) => {
    const { email, ...rest } = values;

    const { data: createdUser, error: createdUserError } = await supabase.rpc(
      'create_user',
      {
        email,
        password: generateRandomPassword(),
        user_meta_data: rest,
      },
    );

    if (createdUserError) throw createdUserError;

    const { data: resetPassword, error: resetPasswordError } =
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: import.meta.env.VITE_SUPABASE_RESET_PASSWORD_URL,
      });

    if (resetPasswordError) throw resetPasswordError;

    return { createdUser, resetPassword };
  };

  const { formik, isLoading } = useAddEntity<AddUser>({
    initialValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      establishment_id: '',
      role_id: '',
      email: '',
    },
    validationSchema: userSchema,
    onSuccessPath: '/users',
    successMessage: userSnackbarMessages.success.create,
    mutationFn,
    onError(error) {
      if (
        error.message ===
        `duplicate key value violates unique constraint \"users_email_partial_key\"`
      ) {
        enqueueSnackbar(userSnackbarMessages.errors.emailAlreadyExists, {
          variant: 'error',
        });
        return;
      }

      enqueueSnackbar(userSnackbarMessages.errors.create, {
        variant: 'error',
      });
    },
  });

  return {
    formik,
    isLoading,
  };
};

export default useAddUser;
