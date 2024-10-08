import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { comboFormsValidations, combosSnackbarMessages } from 'src/constants';
import { findElementsToDelete, generateFilename } from 'src/utils';
import { supabase } from 'src/supabaseClient';
import { useEditEntity } from '../common/useEditEntity';
import { Combo, EditableComboProduct } from './interface';
import useGetComboProducts from './useGetComboProduct';

type EditCombo = Omit<Combo, 'id'> & {
  combo_products: EditableComboProduct[];
};

const useEditCombo = ({ id, combo }: { id: string; combo: EditCombo }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [products, setProducts] = useState<EditableComboProduct[]>([]);
  const [productsError, setProductsError] = useState<null | string>(null);

  useEffect(() => {
    if (products.length > 0) {
      setProductsError(null);
    }
  }, [products]);

  const { comboProducts, comboProductsIsLoading } = useGetComboProducts({
    comboId: id,
  });

  useEffect(() => {
    if (combo && comboProducts && !comboProductsIsLoading) {
      const formattedComboProducts = comboProducts.map((comboProduct: any) => ({
        id: comboProduct.product_id,
        name: comboProduct.products.name,
        quantity: comboProduct.quantity,
        editable: false,
      }));
      formik.setValues({
        name: combo.name,
        combo_image: null,
        bucket_id: combo.bucket_id,
        file_name: combo.file_name,
        search_id: combo.search_id,
        combo_products: formattedComboProducts || [],
      });
      setProducts(formattedComboProducts);
    }
  }, [combo, comboProducts, comboProductsIsLoading]);

  const comboSchema = yup.object().shape({
    search_id: yup.string().required(comboFormsValidations.search_id.required),
    name: yup.string().required(comboFormsValidations.name.required),
    combo_image: yup
      .mixed()
      .test('fileType', comboFormsValidations.combo_image, (value: any) => {
        if (!value) return true;
        if (typeof value === 'string') return true;
        return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
      })
      .nullable(),
  });

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    formik.setFieldValue('combo_image', file);
  };

  const handleSubmit = () => {
    formik.setValues({ ...formik.values, combo_products: products });
    if (products.length === 0) {
      setProductsError(comboFormsValidations.combo_products.min(1));
      return;
    }
    formik.handleSubmit();
  };

  const mutationFn = async (values: EditCombo) => {
    if (values.combo_image && values.combo_image instanceof File) {
      const image_file_name = generateFilename(values.name, values.combo_image);

      const { data: image, error: imageError } = await supabase.storage
        .from('uploads')
        .upload(image_file_name, values.combo_image);

      if (imageError) {
        throw imageError;
      }

      values.bucket_id = 'uploads';
      values.file_name = image.path;
    }

    const { combo_image, combo_products, ...rest } = values;

    const { data: comboData } = await supabase
      .from('combos')
      .update(rest)
      .eq('id', id)
      .select()
      .throwOnError();

    const formattedComboProducts = combo_products.map((comboProduct: any) => ({
      combo_id: (comboData as any)[0].id,
      product_id: comboProduct.id,
      quantity: comboProduct.quantity,
      deleted_at: null,
    }));

    const reformattedComboProducts = comboProducts.map((comboProduct: any) => ({
      combo_id: (comboData as any)[0].id,
      product_id: comboProduct.product_id,
      quantity: comboProduct.quantity,
    }));

    const comboProductsToDelete = findElementsToDelete(
      formattedComboProducts,
      reformattedComboProducts,
    );

    const { data: productsCombo } = await supabase
      .from('combo_products')
      .upsert([...formattedComboProducts, ...comboProductsToDelete])
      .select()
      .throwOnError();

    return {
      comboData,
      productsCombo,
    };
  };

  const { formik, isLoading } = useEditEntity<EditCombo>({
    id,
    initialValues: {
      name: '',
      combo_image: null,
      bucket_id: null,
      file_name: null,
      search_id: '',
      combo_products: [],
    },
    validationSchema: comboSchema,
    successMessage: combosSnackbarMessages.success.edit,
    errorMessage: combosSnackbarMessages.errors.edit,
    onSuccessPath: '/combos',
    mutationFn,
  });

  return {
    formik,
    selectedFile,
    handleFileSelect,
    isLoading,
    products,
    setProducts,
    handleSubmit,
    productsError,
  };
};

export default useEditCombo;
