import { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  productFormsValidations,
  productSnackbarMessages,
} from 'src/constants';
import { generateFilename } from 'src/utils';
import { supabase } from 'src/supabaseClient';
import { useEditEntity } from '../common/useEditEntity';
import { Product } from './interface';

type EditProduct = Omit<Product, 'id'>;

const useEditProduct = ({
  id,
  product,
}: {
  id: string;
  product: EditProduct;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (product) {
      formik.setValues({
        name: product.name,
        product_image: null,
        bucket_id: product.bucket_id,
        file_name: product.file_name,
      });
    }
  }, [product]);

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
  };
};

export default useEditProduct;
