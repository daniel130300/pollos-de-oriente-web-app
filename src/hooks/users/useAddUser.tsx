import { userFormsValidations, userSnackbarMessages } from 'src/constants';
import { User } from './interface';
import useAddEntity from '../common/useAddEntity';
import * as yup from 'yup';
import { supabase } from 'src/supabaseClient';

type AddUser = Omit<User, 'id'>;

const useAddUser = () => {
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
  });

  const mutationFn = async (values: AddUser) => {
    const { email, ...rest } = values;
    const { data } = await supabase.auth.admin.createUser({
      email: email,
      password: 'password',
      user_metadata: rest,
    });

    return data;
  };

  const { formik, isLoading } = useAddEntity<AddUser>({
    initialValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      establishment_id: '',
      email: '',
    },
    validationSchema: userSchema,
    onSuccessPath: '/users',
    successMessage: userSnackbarMessages.success.create,
    errorMessage: userSnackbarMessages.errors.create,
    mutationFn,
  });

  return {
    formik,
    isLoading,
  };
};

export default useAddUser;
