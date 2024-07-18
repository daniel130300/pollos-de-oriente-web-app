import {
  expenseCategoryFormsValidations,
  warehouseSnackbarMessages,
} from 'src/constants';
import { Warehouse } from './inteface';
import useAddEntity from '../common/useAddEntity';
import * as yup from 'yup';
import { supabase } from 'src/supabaseClient';
import { EstablishmentTypes } from '../expense-category/interface';

type AddWarehouse = Omit<Warehouse, 'id'>;

const useAddWarehouse = () => {
  const warehouseSchema = yup.object().shape({
    name: yup.string().required(expenseCategoryFormsValidations.name.required),
  });

  const mutationFn = async (values: AddWarehouse) => {
    const { data } = await supabase
      .from('establishments')
      .insert([values])
      .select()
      .throwOnError();
    return data;
  };

  const { formik, isLoading } = useAddEntity<AddWarehouse>({
    initialValues: {
      name: '',
      has_delivery: null,
      has_pos: null,
      type: EstablishmentTypes.WAREHOUSE,
    },
    validationSchema: warehouseSchema,
    onSuccessPath: '/establishments/warehouses',
    successMessage: warehouseSnackbarMessages.success.create,
    errorMessage: warehouseSnackbarMessages.errors.create,
    mutationFn,
  });

  return {
    formik,
    isLoading,
  };
};

export default useAddWarehouse;
