import * as yup from 'yup';
import {
  expenseCategoryFormsValidations,
  warehouseSnackbarMessages,
} from 'src/constants';
import useEditEntity from '../common/useEditEntity';
import { supabase } from 'src/supabaseClient';
import { useEffect } from 'react';
import { Warehouse } from './inteface';
import { EstablishmentTypes } from '../expense-category/interface';

type EditWarehouse = Omit<Warehouse, 'id'>;

const useEditWarehouse = ({
  id,
  warehouse,
}: {
  id: string;
  warehouse: EditWarehouse;
}) => {
  useEffect(() => {
    if (warehouse) {
      formik.setValues({
        name: warehouse.name,
        type: warehouse.type || EstablishmentTypes.WAREHOUSE,
        has_delivery: null,
        has_pos: null,
      });
    }
  }, [warehouse]);

  const warehouseSchema = yup.object().shape({
    name: yup.string().required(expenseCategoryFormsValidations.name.required),
  });

  const mutationFn = async (values: EditWarehouse) => {
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
      type: EstablishmentTypes.WAREHOUSE,
      has_pos: null,
      has_delivery: null,
    },
    validationSchema: warehouseSchema,
    onSuccessPath: '/establishments/warehouses',
    successMessage: warehouseSnackbarMessages.success.edit,
    errorMessage: warehouseSnackbarMessages.errors.edit,
    mutationFn,
  });

  return {
    formik,
    isLoading,
  };
};

export default useEditWarehouse;
