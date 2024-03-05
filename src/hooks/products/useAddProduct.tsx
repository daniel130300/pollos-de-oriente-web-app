import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from '@tanstack/react-router';
import { generateFilename } from 'src/utils/generateFileName';
import { supabase } from 'src/supabaseClient';
import { useMutation } from '@tanstack/react-query';
import { productFormsValidations, productSnackbarMessages } from 'src/constants';

interface Product {
  name: string;
  unity: string;
  sale_price: number | string;
  purchase_price: number | string;
  product_image: File | null;
  bucket_id: string | null;
  file_name: string | null
}

const useAddProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const productSchema = yup.object().shape({
    name: yup.string().required(productFormsValidations.name.required),
    unity: yup.string().required(productFormsValidations.unity.required),
    sale_price: yup
      .number()
      .typeError(productFormsValidations.sale_price.typeError)
      .required(productFormsValidations.sale_price.required)
      .min(0, productFormsValidations.sale_price.min(0)),
    purchase_price: yup
      .number()
      .typeError(productFormsValidations.purchase_price.typeError)
      .required(productFormsValidations.purchase_price.required)
      .min(0, productFormsValidations.purchase_price.min(0)),
    product_image: yup
      .mixed()
      .test('fileType', productFormsValidations.product_image, (value: any) => {
        if (!value) return true;
        if (typeof value === 'string') return true;
        return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
      })
      .nullable()
  });

  const {
    isPending,
    mutate
  } = useMutation(
    {
      mutationFn: async(values: Product) => {
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
      onSuccess: () => {
        enqueueSnackbar(productSnackbarMessages.success.create, { variant: 'success' });
        navigate({ to: '/' });
      },
      onError: () => {
        enqueueSnackbar(productSnackbarMessages.errors.create, { variant: 'error' });
      }
    }
  );

  const formik = useFormik<Product>({
    initialValues: {
      name: '',
      unity: '',
      sale_price: '',
      purchase_price: '',
      product_image: null,
      bucket_id: null,
      file_name: null
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      mutate(values);
    },
    enableReinitialize: true
  });

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    formik.setFieldValue('product_image', file);
  };

  return {
    formik,
    selectedFile,
    handleFileSelect,
    isLoading: isPending
  };
};

export default useAddProduct;