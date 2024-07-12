import { storeFormsValidations, storeSnackbarMessages } from 'src/constants';
import { EditableStoreCombo, EditableStoreProduct, Store } from './interface';
import useAddEntity from '../common/useAddEntity';
import * as yup from 'yup';
import { supabase } from 'src/supabaseClient';
import { EstablishmentTypes } from '../expense-category/interface';
import { useState } from 'react';

type AddStore = Omit<Store, 'id'>;

const useAddStore = () => {
  const storeSchema = yup.object().shape({
    name: yup.string().required(storeFormsValidations.name.required),
    has_delivery: yup
      .string()
      .required(storeFormsValidations.has_delivery.required),
    has_pos: yup.string().required(storeFormsValidations.has_pos.required),
  });

  const [storeProducts, setStoreProducts] = useState<EditableStoreProduct[]>(
    [],
  );
  const [storeCombos, setStoreCombos] = useState<EditableStoreCombo[]>([]);

  const mutationFn = async (values: AddStore) => {
    const { data } = await supabase
      .from('establishments')
      .insert([values])
      .select()
      .throwOnError();
    return data;
  };

  const { formik, isLoading } = useAddEntity<AddStore>({
    initialValues: {
      name: '',
      type: EstablishmentTypes.STORE,
      has_delivery: false,
      has_pos: false,
    },
    validationSchema: storeSchema,
    onSuccessPath: '/establishments/stores',
    successMessage: storeSnackbarMessages.success.create,
    errorMessage: storeSnackbarMessages.errors.create,
    mutationFn,
  });

  return {
    formik,
    isLoading,
    storeProducts,
    setStoreProducts,
    storeCombos,
    setStoreCombos,
  };
};

export default useAddStore;
