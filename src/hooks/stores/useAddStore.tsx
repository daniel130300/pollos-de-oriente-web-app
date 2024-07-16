import { storeFormsValidations, storeSnackbarMessages } from 'src/constants';
import { EditableStoreCombo, EditableStoreProduct, Store } from './interface';
import useAddEntity from '../common/useAddEntity';
import * as yup from 'yup';
import { supabase } from 'src/supabaseClient';
import { EstablishmentTypes } from '../expense-category/interface';
import { useState } from 'react';

type AddStore = Omit<Store, 'id'> & {
  store_combos: EditableStoreCombo[];
  store_products: EditableStoreProduct[];
};

const useAddStore = () => {
  const itemSchema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    sale_price: yup.number().required(),
  });

  const storeSchema = yup
    .object()
    .shape({
      name: yup.string().required(storeFormsValidations.name.required),
      has_delivery: yup
        .string()
        .required(storeFormsValidations.has_delivery.required),
      has_pos: yup.string().required(storeFormsValidations.has_pos.required),
      store_products: yup.array().of(itemSchema),
      store_combos: yup.array().of(itemSchema),
    })
    .when(['store_products', 'store_combos'], {
      is: (store_products: any, store_combos: any) =>
        !store_products && !store_combos,
      then: yup.object().shape({
        store_products: yup
          .array()
          .min(
            1,
            'Either store_products or store_combos must have at least one item.',
          ),
        store_combos: yup
          .array()
          .min(
            1,
            'Either store_products or store_combos must have at least one item.',
          ),
      }) as any,
    });

  const [storeProducts, setStoreProducts] = useState<EditableStoreProduct[]>(
    [],
  );
  const [storeCombos, setStoreCombos] = useState<EditableStoreCombo[]>([]);

  const mutationFn = async (values: AddStore) => {
    const { store_combos, store_products, ...rest } = values;

    const { data: storeData } = await supabase
      .from('establishments')
      .insert([rest])
      .select()
      .throwOnError();

    const formattedStoreProducts = store_products.map(product => ({
      establishment_id: (storeData as any)[0].id,
      product_id: product.id,
      sale_price: product.sale_price,
    }));

    const formattedStoreCombos = store_combos.map(combo => ({
      establishment_id: (storeData as any)[0].id,
      combo_id: combo.id,
      sale_price: combo.sale_price,
    }));

    const { data: storeProducts } = await supabase
      .from('establishment_products_menu')
      .insert(formattedStoreProducts)
      .select()
      .throwOnError();

    const { data: storeCombos } = await supabase
      .from('establishment_combos_menu')
      .insert(formattedStoreCombos)
      .select()
      .throwOnError();

    return { storeData, storeProducts, storeCombos };
  };

  const handleSubmit = () => {
    formik.setValues({
      ...formik.values,
      store_combos: storeCombos,
      store_products: storeProducts,
    });
    formik.handleSubmit();
  };

  const { formik, isLoading } = useAddEntity<AddStore>({
    initialValues: {
      name: '',
      type: EstablishmentTypes.STORE,
      has_delivery: false,
      has_pos: false,
      store_combos: [],
      store_products: [],
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
    handleSubmit,
  };
};

export default useAddStore;
