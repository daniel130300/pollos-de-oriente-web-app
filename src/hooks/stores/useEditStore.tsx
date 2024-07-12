import * as yup from 'yup';
import { storeFormsValidations, storeSnackbarMessages } from 'src/constants';
import useEditEntity from '../common/useEditEntity';
import { EditableStoreCombo, EditableStoreProduct, Store } from './interface';
import { supabase } from 'src/supabaseClient';
import { useEffect, useState } from 'react';
import { EstablishmentTypes } from '../expense-category/interface';
import useGetStoreProducts from './useGetStoreProducts';
import useGetStoreCombos from './useGetStoreCombos';

type EditStore = Omit<Store, 'id'>;

const useEditStore = ({ id, store }: { id: string; store: EditStore }) => {
  const [products, setProducts] = useState<EditableStoreProduct[]>([]);
  const [combos, setCombos] = useState<EditableStoreCombo[]>([]);

  const { storeProducts, storeProductsIsLoading } = useGetStoreProducts({
    storeId: id,
  });

  const { storeCombos, storeCombosIsLoading } = useGetStoreCombos({
    storeId: id,
  });

  useEffect(() => {
    const formattedStoreCombos = storeProducts.map((storeProduct: any) => ({
      id: storeProduct.product_id,
      name: storeProduct.products.name,
      sale_price: storeProduct.sale_price,
      editable: false,
    }));

    const formattedStoreProducts = storeProducts.map((storeProduct: any) => ({
      id: storeProduct.product_id,
      name: storeProduct.products.name,
      sale_price: storeProduct.sale_price,
      editable: false,
    }));

    if (
      store &&
      storeCombos &&
      !storeCombosIsLoading &&
      storeProducts &&
      !storeProductsIsLoading
    ) {
      formik.setValues({
        name: store.name,
        type: store.type || EstablishmentTypes.STORE,
        has_delivery: store.has_delivery,
        has_pos: store.has_pos,
        store_products: formattedStoreProducts || [],
        store_combos: formattedStoreCombos || [],
      });
      setProducts(formattedStoreProducts);
      setCombos(formattedStoreCombos);
    }
  }, [
    store,
    storeCombos,
    storeCombosIsLoading,
    storeProducts,
    storeProductsIsLoading,
  ]);

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
      store_combos: [],
      store_products: [],
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
    products,
    setProducts,
    combos,
    setCombos,
  };
};

export default useEditStore;
