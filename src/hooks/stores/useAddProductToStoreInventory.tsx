import { Dispatch, useState } from 'react';
import useGetProducts from '../products/useGetProducts';
import * as yup from 'yup';
import { productFormsValidations } from 'src/constants';
import { useFormik } from 'formik';
import { EditableProduct } from '../products/interface';

const useAddProductToStoreInventory = ({
  productsList,
  setProducts,
}: {
  productsList: EditableProduct[];
  setProducts: Dispatch<React.SetStateAction<EditableProduct[]>>;
}) => {
  const [search, setSearch] = useState('');
  const {
    products: autoCompleteProducts,
    productsIsLoading: autoCompleteProductsLoading,
  } = useGetProducts({ page: 0, rowsPerPage: 10, search });

  const productSchema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    quantity: yup
      .number()
      .typeError(productFormsValidations.quantity.typeError)
      .required(productFormsValidations.quantity.required)
      .min(0, productFormsValidations.quantity.min(0)),
    sale_price: yup
      .number()
      .typeError(productFormsValidations.sale_price.typeError)
      .required(productFormsValidations.sale_price.required)
      .min(0, productFormsValidations.sale_price.min(0)),
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      quantity: '',
      sale_price: '',
      editable: false,
    },
    validationSchema: productSchema,
    onSubmit: async values => {
      const { id, quantity, sale_price } = values;
      const existingProductIndex = productsList.findIndex(
        product => product.id === id,
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...productsList];
        updatedProducts[existingProductIndex].quantity += quantity;
        updatedProducts[existingProductIndex].sale_price = sale_price;
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

export default useAddProductToStoreInventory;
