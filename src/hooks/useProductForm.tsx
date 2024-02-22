import { useFormik } from "formik";
import * as yup from 'yup';
import { useSnackbar } from "notistack";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "../supabaseClient";

const useProductForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const productSchema = yup.object().shape({
    name: yup.string().required('El nombre es un campo requerido'),
    unity: yup.string().required('La unidad es un campo requerido'),
    sale_price: yup.number().typeError('El precio de venta debe ser un número').required('El precio de venta es un campo requerido').min(0, 'El precio de venta debe ser mayor o igual a 0'),
    purchase_price: yup.number().typeError('El precio de compra debe ser un número').required('El precio de compra es un campo requerido').min(0, 'El precio de compra debe ser mayor o igual a 0')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      unity: '',
      sale_price: '',
      purchase_price: ''
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      const { error } = await supabase
      .from('products')
      .insert([
        values
      ])
      .select()

      if(error) {
        enqueueSnackbar('Error creando el producto', {variant: 'error'})
        return;
      }

      enqueueSnackbar('Producto creado exitosamente', {variant: 'success'} )
      navigate({to: '/'})
    },
    enableReinitialize: true
  });

  return { formik };
};

export default useProductForm;