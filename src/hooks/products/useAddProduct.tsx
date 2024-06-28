import * as yup from 'yup';
import { useState } from 'react';
import {
  productFormsValidations,
  productSnackbarMessages,
} from 'src/constants';
import { EditableProductDetail, Product } from './interface';
import useAddEntity from '../common/useAddEntity';
import { generateFilename } from 'src/utils';
import { supabase } from 'src/supabaseClient';

type AddProduct = Omit<Product, 'id'> & {
  has_product_detail: boolean;
  product_detail: EditableProductDetail[];
};

const useAddProduct = () => {
  const productSchema = yup.object().shape({
    search_id: yup
      .string()
      .required(productFormsValidations.search_id.required),
    name: yup.string().required(productFormsValidations.name.required),
    can_be_purchased_only: yup
      .string()
      .required(productFormsValidations.can_be_purchased_only.required),
    inventory_subtraction: yup
      .string()
      .required(productFormsValidations.inventory_subtraction.required),
    expense_category_id: yup
      .string()
      .required(productFormsValidations.expense_category_id.required),
    product_image: yup
      .mixed()
      .test('fileType', productFormsValidations.product_image, (value: any) => {
        if (!value) return true;
        if (typeof value === 'string') return true;
        return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
      })
      .nullable(),
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [hasProductDetail, setHasProductDetail] = useState<boolean>(false);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    formik.setFieldValue('product_image', file);
  };

  const handleHasProductDetail = (hasProductDetail: boolean) => {
    setHasProductDetail(hasProductDetail);
    formik.setFieldValue('has_product_detail', hasProductDetail);
  };

  const mutationFn = async (values: AddProduct) => {
    if (values.product_image) {
      const image_file_name = generateFilename(
        values.name,
        values.product_image,
      );

      const { data: image, error: imageError } = await supabase.storage
        .from('uploads')
        .upload(image_file_name, values.product_image);

      if (imageError) {
        throw imageError;
      }

      values.bucket_id = 'uploads';
      values.file_name = image.path;
    }

    const { product_image, has_product_detail, product_detail, ...rest } =
      values;

    const { data: productData } = await supabase
      .from('products')
      .insert([rest])
      .select()
      .throwOnError();

    if (hasProductDetail && product_detail.length !== 0) {
      const formattedProductDetail = product_detail.map(detail => ({
        parent_product_id: (productData as any)[0].id,
        child_product_id: detail.id,
        arithmetic_quantity: detail.arithmetic_quantity,
      }));

      const { data: productDetailData } = await supabase
        .from('product_details')
        .insert(formattedProductDetail)
        .select()
        .throwOnError();

      return { productData, productDetailData };
    }

    return { productData };
  };

  const { formik, isLoading } = useAddEntity<AddProduct>({
    initialValues: {
      name: '',
      product_image: null,
      bucket_id: null,
      file_name: null,
      expense_category_id: '',
      can_be_purchased_only: '',
      inventory_subtraction: '',
      search_id: '',
      has_product_detail: false,
      product_detail: [],
    },
    validationSchema: productSchema,
    onSuccessPath: '/products',
    successMessage: productSnackbarMessages.success.create,
    errorMessage: productSnackbarMessages.errors.create,
    mutationFn,
  });

  return {
    formik,
    selectedFile,
    handleFileSelect,
    hasProductDetail,
    handleHasProductDetail,
    isLoading,
  };
};

export default useAddProduct;
