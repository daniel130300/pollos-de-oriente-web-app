import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { productForm, productEnqueue } from 'src/localization';

interface Product {
  name: string;
  unity: string;
  sale_price: number | string;
  purchase_price: number | string;
  product_image: File | null;
  bucket_id: string | null;
  file_name: string | null
}

const useEditProduct = ({id}: {id: string}) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const productSchema = yup.object().shape({
    name: yup.string().required(productForm.name.required),
    unity: yup.string().required(productForm.unity.required),
    sale_price: yup
      .number()
      .typeError(productForm.sale_price.typeError)
      .required(productForm.sale_price.required)
      .min(0, productForm.sale_price.min(0)),
    purchase_price: yup
      .number()
      .typeError(productForm.purchase_price.typeError)
      .required(productForm.purchase_price.required)
      .min(0, productForm.purchase_price.min(0)),
    product_image: yup
      .mixed()
      .test('fileType', productForm.product_image, (value: any) => {
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
       // add logic here to handle edit
      },
      onSuccess: () => {
        enqueueSnackbar(productEnqueue.success.edit, { variant: 'success' });
        navigate({ to: '/' });
      },
      onError: () => {
        enqueueSnackbar(productEnqueue.errors.edit, { variant: 'error' });
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

export default useEditProduct;