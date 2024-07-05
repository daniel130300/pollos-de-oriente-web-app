import { Dispatch } from 'react';
import useGetProducts from '../products/useGetProducts';
import * as yup from 'yup';
import { productFormsValidations } from 'src/constants';
import { useFormik } from 'formik';
import { EditableComboProduct } from './interface';

const useAddComboProduct = ({
  productsList,
  setProducts,
}: {
  productsList: EditableComboProduct[];
  setProducts: Dispatch<React.SetStateAction<EditableComboProduct[]>>;
}) => {
  const {
    search,
    setSearch,
    products: autoCompleteProducts,
    productsIsLoading: autoCompleteProductsLoading,
  } = useGetProducts();

  const productSchema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    quantity: yup
      .number()
      .typeError(productFormsValidations.quantity.typeError)
      .required(productFormsValidations.quantity.required)
      .min(0, productFormsValidations.quantity.min(0)),
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      quantity: '',
      editable: false,
    },
    validationSchema: productSchema,
    onSubmit: async values => {
      const { id, quantity } = values;
      const existingProductIndex = productsList.findIndex(
        product => product.id === id,
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...productsList];
        updatedProducts[existingProductIndex].quantity += quantity;
        setProducts(updatedProducts);
      } else {
        setProducts(previousProducts => [...previousProducts, values]);
      }
      setSearch('');
      formik.resetForm();
    },
    enableReinitialize: true,
  });

  const productSelectError = !!formik.errors.id && !!formik.errors.name;

  return {
    search,
    setSearch,
    autoCompleteProducts,
    autoCompleteProductsLoading,
    formik,
    productSelectError,
  };
};

export default useAddComboProduct;
