import { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  productFormsValidations,
  productSnackbarMessages,
} from 'src/constants';
import { generateFilename } from 'src/utils';
import { supabase } from 'src/supabaseClient';
import { useEditEntity } from '../common/useEditEntity';
import { EditableProductDetail, Product } from './interface';
import useGetProductDetails from './useGetProductDetail';

type EditProduct = Omit<Product, 'id'> & {
  has_product_detail: boolean;
  product_detail: EditableProductDetail[];
};

const useEditProduct = ({
  id,
  product,
}: {
  id: string;
  product: EditProduct;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [productDetail, setProductDetail] = useState<EditableProductDetail[]>(
    [],
  );

  const { productDetails, productDetailsIsLoading } = useGetProductDetails({
    parent_product_id: id,
  });

  useEffect(() => {
    if (product && productDetails && !productDetailsIsLoading) {
      formik.setValues({
        name: product.name,
        product_image: null,
        bucket_id: product.bucket_id,
        file_name: product.file_name,
        search_id: product.search_id,
        inventory_subtraction: product.inventory_subtraction,
        can_be_purchased_only: product.can_be_purchased_only,
        expense_category_id: product.expense_category_id,
        has_product_detail: productDetails?.length > 0,
        product_detail: productDetails || [],
      });
    }
  }, [product, productDetailsIsLoading, productDetails]);

  useEffect(() => {
    if (productDetails && !productDetailsIsLoading) {
      const reformattedProductDetails = productDetails.map((detail: any) => ({
        id: detail.products.id,
        name: detail.products.name,
        arithmetic_quantity: detail.arithmetic_quantity,
        editable: false,
      }));

      setProductDetail(reformattedProductDetails);
    }
  }, [productDetails, productDetailsIsLoading]);

  const productSchema = yup.object().shape({
    name: yup.string().required(productFormsValidations.name.required),
    product_image: yup
      .mixed()
      .test('fileType', productFormsValidations.product_image, (value: any) => {
        if (!value) return true;
        if (typeof value === 'string') return true;
        return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
      })
      .nullable(),
  });

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    formik.setFieldValue('product_image', file);
  };

  const mutationFn = async (values: EditProduct) => {
    if (values.product_image && values.product_image instanceof File) {
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

    const { product_image, ...rest } = values;

    const { data } = await supabase
      .from('products')
      .update(rest)
      .eq('id', id)
      .select()
      .throwOnError();

    return data;
  };

  const { formik, isLoading } = useEditEntity<EditProduct>({
    id,
    initialValues: {
      name: '',
      product_image: null,
      bucket_id: null,
      file_name: null,
      can_be_purchased_only: '',
      inventory_subtraction: '',
      search_id: '',
      expense_category_id: '',
      has_product_detail: false,
      product_detail: [],
    },
    validationSchema: productSchema,
    successMessage: productSnackbarMessages.success.edit,
    errorMessage: productSnackbarMessages.errors.edit,
    onSuccessPath: '/products',
    mutationFn,
  });

  return {
    formik,
    selectedFile,
    handleFileSelect,
    isLoading,
    productDetail,
    setProductDetail,
  };
};

export default useEditProduct;
