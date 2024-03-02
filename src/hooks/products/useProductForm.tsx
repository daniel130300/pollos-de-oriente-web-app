import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from '@tanstack/react-router';
import { generateFilename } from '../../utils/generateFileName';
import { supabase } from '../../supabaseClient';
import { useMutation } from '@tanstack/react-query';

interface Product {
  name: string;
  unity: string;
  sale_price: number | string;
  purchase_price: number | string;
  product_image: File | null;
  image_id: string | null;
}

const useProductForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const productSchema = yup.object().shape({
    name: yup.string().required('El nombre es un campo requerido'),
    unity: yup.string().required('La unidad es un campo requerido'),
    sale_price: yup
      .number()
      .typeError('El precio de venta debe ser un número')
      .required('El precio de venta es un campo requerido')
      .min(0, 'El precio de venta debe ser mayor o igual a 0'),
    purchase_price: yup
      .number()
      .typeError('El precio de compra debe ser un número')
      .required('El precio de compra es un campo requerido')
      .min(0, 'El precio de compra debe ser mayor o igual a 0'),
    product_image: yup
      .mixed()
      .test('fileType', 'La imagen debe ser un archivo de imagen válido', (value: any) => {
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
          
          values.image_id = (image as any).id
        }
  
        const { product_image, ...rest } = values;
  
        await supabase
          .from('products')
          .insert([rest])
          .select()
          .throwOnError();
  
        return 'Producto creado exitosamente';
      },
      onSuccess: (data) => {
        enqueueSnackbar(data, { variant: 'success' });
        navigate({ to: '/' });
      },
      onError: () => {
        enqueueSnackbar('Error creando el producto', { variant: 'error' });
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
      image_id: ''
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      mutate(values);
    },
    enableReinitialize: true
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

export default useProductForm;