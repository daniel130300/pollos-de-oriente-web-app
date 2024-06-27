import { productFormsValidations } from 'src/constants/formValidations';
import useGetProducts from '../products/useGetProducts';
import * as yup from 'yup';
import { Dispatch, useState } from 'react';
import { useFormik } from 'formik';
import { EditableProduct } from '../products/interface';

const useEditProductToAddToStoreInventory = ({
  index,
  productsList,
  product,
  setProducts,
}: {
  index: number;
  productsList: EditableProduct[];
  product: EditableProduct;
  setProducts: Dispatch<React.SetStateAction<EditableProduct[]>>;
}) => {
  const [search, setSearch] = useState(product.name);
  const {
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
    onSubmit: values => {
      const { id, name, quantity, sale_price } = values;
      const idExists = productsList.some(product => product.id === id);
      let indexToRemove = -1;

      if (idExists) {
        const updatedProducts = productsList.map(product => {
          if (product.id === id) {
            indexToRemove = index;
            return {
              ...product,
              name,
              quantity,
              sale_price,
              editable: false,
            };
          } else {
            return product;
          }
        });
        if (indexToRemove !== -1) updatedProducts.splice(indexToRemove, 1);
        setProducts(updatedProducts);
      } else {
        const updatedProducts = productsList.map((product, idx) => {
          if (idx === index) {
            return {
              ...product,
              id,
              name,
              quantity,
              sale_price,
              editable: false,
            };
          } else {
            return product;
          }
        });
        setProducts(updatedProducts);
      }
      setSearch('');
      formik.resetForm();
    },
    enableReinitialize: true,
  });

  const productSelectError = !!formik.errors.id && !!formik.errors.name;

  const handleDeleteProduct = (productId: string) => {
    const filteredProducts = productsList.filter(
      product => product.id !== productId,
    );
    setProducts(filteredProducts);
  };

  const toggleProductEditable = (productId: string) => {
    const updatedProducts = productsList.map(product =>
      product.id === productId
        ? { ...product, editable: !product.editable }
        : { ...product, editable: false },
    );
    setProducts(updatedProducts);
    if (!productsList.find(product => product.id === productId)?.editable) {
      const productToEdit = productsList.find(
        product => product.id === productId,
      );
      if (productToEdit) {
        formik.setValues({
          id: productToEdit.id,
          name: productToEdit.name,
          quantity: productToEdit.quantity,
          sale_price: productToEdit.sale_price,
          editable: true,
        });
        setSearch(productToEdit.name);
      }
    }
  };

  return {
    search,
    setSearch,
    autoCompleteProducts,
    autoCompleteProductsLoading,
    handleDeleteProduct,
    toggleProductEditable,
    formik,
    productSelectError,
  };
};

export default useEditProductToAddToStoreInventory;
