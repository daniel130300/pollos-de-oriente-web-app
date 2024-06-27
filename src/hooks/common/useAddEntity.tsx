import { FormikValues, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { ObjectSchema } from 'yup';

const useAddEntity = <T extends FormikValues,>(options: {
  initialValues: T;
  validationSchema: ObjectSchema<any>;
  mutationFn: (values: T) => Promise<any>;
  onSuccessPath: string;
  successMessage: string;
  errorMessage: string;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    isPending,
    mutate
  } = useMutation({
    mutationFn: options.mutationFn,
    onSuccess: () => {
      enqueueSnackbar(options.successMessage, { variant: 'success' });
      navigate({ to: options.onSuccessPath });
    },
    onError: () => {
      enqueueSnackbar(options.errorMessage, { variant: 'error' });
    }
  });

  const formik = useFormik({
    initialValues: options.initialValues,
    validationSchema: options.validationSchema,
    onSubmit: async (values) => {
      mutate(values);
    },
    enableReinitialize: true
  });

  return {
    formik,
    isLoading: isPending
  };
}

export default useAddEntity