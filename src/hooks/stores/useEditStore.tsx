import * as yup from 'yup';
import { storeFormsValidations, storeSnackbarMessages } from 'src/constants';
import useEditEntity from '../common/useEditEntity';
import { Store } from './interface';
import { supabase } from 'src/supabaseClient';
import { useEffect } from 'react';
import { EstablishmentTypes } from '../expense-category/interface';

type EditStore = Omit<Store, 'id'>;

const useEditStore = ({ id, store }: { id: string; store: EditStore }) => {
  useEffect(() => {
    if (store) {
      formik.setValues({
        name: store.name,
        type: store.type || EstablishmentTypes.STORE,
        has_delivery: store.has_delivery,
        has_pos: store.has_pos,
      });
    }
  }, [store]);

  const storeSchema = yup.object().shape({
    name: yup.string().required(storeFormsValidations.name.required),
    has_delivery: yup
      .string()
      .required(storeFormsValidations.has_delivery.required),
    has_pos: yup.string().required(storeFormsValidations.has_pos.required),
  });

  const mutationFn = async (values: EditStore) => {
    const { data } = await supabase
      .from('establishments')
      .update(values)
      .eq('id', id)
      .select()
      .throwOnError();

    return data;
  };

  const { formik, isLoading } = useEditEntity({
    id,
    initialValues: {
      name: '',
      type: EstablishmentTypes.STORE,
      has_delivery: false,
      has_pos: false,
    },
    validationSchema: storeSchema,
    onSuccessPath: '/establishments/stores',
    successMessage: storeSnackbarMessages.success.edit,
    errorMessage: storeSnackbarMessages.errors.edit,
    mutationFn,
  });

  return {
    formik,
    isLoading,
  };
};

export default useEditStore;
