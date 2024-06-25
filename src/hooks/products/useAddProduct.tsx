import * as yup from 'yup';
import { useState } from 'react';
import { productFormsValidations, productSnackbarMessages } from 'src/constants';
import { Product } from './interface';
import { useAddEntity } from '../common/useAddEntity';
import { generateFilename } from 'src/utils';
import { supabase } from 'src/supabaseClient';

type AddProduct = Omit<Product, 'id'>;

const useAddProduct = () => {
  const productSchema = yup.object().shape({
    name: yup.string().required(productFormsValidations.name.required),
    product_image: yup
      .mixed()
      .test('fileType', productFormsValidations.product_image, (value: any) => {
        if (!value) return true;
        if (typeof value === 'string') return true;
        return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
      })
      .nullable()
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    formik.setFieldValue('product_image', file);
  };

  const { formik, isLoading } = useAddEntity<AddProduct>({
    initialValues: {
      name: '',
      product_image: null,
      bucket_id: null,
      file_name: null
    },
    validationSchema: productSchema,
    mutationFn: async(values: AddProduct) => {
      if (values.product_image) {
        const image_file_name = generateFilename(values.name, values.product_image);

        const { data: image, error: imageError } = await supabase.storage
          .from('uploads')
          .upload(image_file_name, values.product_image);

        if (imageError) {
          throw imageError;
        }

        values.bucket_id = 'uploads'
        values.file_name = image.path
      }

      const { product_image, ...rest } = values;

      const { data } = await supabase
                          .from('products')
                          .insert([rest])
                          .select()
                          .throwOnError();
      return data;
    },
    onSuccessPath: '/products',
    successMessage: productSnackbarMessages.success.create,
    errorMessage: productSnackbarMessages.errors.create
  });

  return {
    formik,
    selectedFile,
    handleFileSelect,
    isLoading
  };
};

export default useAddProduct;