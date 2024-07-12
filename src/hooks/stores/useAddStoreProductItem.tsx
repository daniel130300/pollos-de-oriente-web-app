import { Dispatch } from 'react';
import * as yup from 'yup';
import { productFormsValidations } from 'src/constants';
import { useFormik } from 'formik';
import { EditableStoreProduct } from './interface';
import useGetProducts from '../products/useGetProducts';

const useAddStoreProductItem = ({
  productsList,
  setProducts,
}: {
  productsList: EditableStoreProduct[];
  setProducts: Dispatch<React.SetStateAction<EditableStoreProduct[]>>;
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
    sale_price: yup
      .number()
      .typeError(productFormsValidations.sale_price.typeError)
      .required(productFormsValidations.sale_price.required)
      .min(1, productFormsValidations.sale_price.min(1)),
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      sale_price: '',
      editable: false,
    },
    validationSchema: productSchema,
    onSubmit: async values => {
      const { id, sale_price } = values;
      const existingProductIndex = productsList.findIndex(
        product => product.id === id,
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...productsList];
        updatedProducts[existingProductIndex].sale_price += sale_price;
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

export default useAddStoreProductItem;
