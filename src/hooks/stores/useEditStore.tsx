import * as yup from 'yup';
import { storeFormsValidations, storeSnackbarMessages } from 'src/constants';
import useEditEntity from '../common/useEditEntity';
import { EditableStoreCombo, EditableStoreProduct, Store } from './interface';
import { supabase } from 'src/supabaseClient';
import { useEffect, useState } from 'react';
import { EstablishmentTypes } from '../expense-category/interface';
import useGetStoreProducts from './useGetStoreProducts';
import useGetStoreCombos from './useGetStoreCombos';
import { findElementsToDelete } from 'src/utils';

type EditStore = Omit<Store, 'id'> & {
  store_combos: EditableStoreCombo[];
  store_products: EditableStoreProduct[];
};

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
    const formattedStoreCombos = storeCombos.map((storeCombo: any) => ({
      id: storeCombo.combo_id,
      name: storeCombo.combos.name,
      sale_price: storeCombo.sale_price,
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
    store_combos: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.string().required(),
          name: yup.string().required(),
          sale_price: yup.number().required(),
        }),
      )
      .min(1, storeFormsValidations.combo_store_or_products.min(1))
      .when('store_combos', {
        is: (store_combos: any) => !store_combos || store_combos.length === 0,
        then: yup
          .array()
          .min(1, storeFormsValidations.combo_store_or_products.min(1)) as any,
      }),
    store_products: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.string().required(),
          name: yup.string().required(),
          sale_price: yup.number().required(),
        }),
      )
      .min(1, storeFormsValidations.combo_store_or_products.min(1))
      .when('store_combos', {
        is: (store_combos: any) => !store_combos || store_combos.length === 0,
        then: yup
          .array()
          .min(1, storeFormsValidations.combo_store_or_products.min(1)) as any,
      }),
  });

  const mutationFn = async (values: EditStore) => {
    const { store_products, store_combos, ...rest } = values;

    const { data: storeData } = await supabase
      .from('establishments')
      .update(rest)
      .eq('id', id)
      .select()
      .throwOnError();

    const formattedStoreCombos = store_combos.map((storeCombo: any) => ({
      establishment_id: (storeData as any)[0].id,
      combo_id: storeCombo.id,
      sale_price: storeCombo.sale_price,
      deleted_at: null,
    }));

    const reformattedStoreCombos = storeCombos.map((storeCombo: any) => ({
      establishment_id: (storeData as any)[0].id,
      combo_id: storeCombo.product_id,
      sale_price: storeCombo.sale_price,
    }));

    const storeCombosToDelete = findElementsToDelete(
      formattedStoreCombos,
      reformattedStoreCombos,
    );

    const { data: storeMenuCombos } = await supabase
      .from('establishment_combos_menu')
      .upsert([...formattedStoreCombos, ...storeCombosToDelete])
      .select()
      .throwOnError();

    const formattedStoreProducts = store_products.map((storeProduct: any) => ({
      establishment_id: (storeData as any)[0].id,
      product_id: storeProduct.id,
      sale_price: storeProduct.sale_price,
      deleted_at: null,
    }));

    const reformattedStoreProducts = storeProducts.map((storeProduct: any) => ({
      establishment_id: (storeData as any)[0].id,
      product_id: storeProduct.product_id,
      sale_price: storeProduct.sale_price,
    }));

    const storeProductsToDelete = findElementsToDelete(
      formattedStoreProducts,
      reformattedStoreProducts,
    );

    const { data: storeMenuProducts } = await supabase
      .from('establishment_products_menu')
      .upsert([...formattedStoreProducts, ...storeProductsToDelete])
      .select()
      .throwOnError();

    return {
      storeData,
      storeMenuCombos,
      storeMenuProducts,
    };
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
