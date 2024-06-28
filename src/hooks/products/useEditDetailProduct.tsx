import { productFormsValidations } from 'src/constants/formValidations';
import useGetProducts from './useGetProducts';
import * as yup from 'yup';
import { Dispatch } from 'react';
import { useFormik } from 'formik';
import { EditableProduct } from './interface';

const useEditDetailProduct = ({
  index,
  productsList,
  setProducts,
}: {
  index: number;
  productsList: EditableProduct[];
  setProducts: Dispatch<React.SetStateAction<EditableProduct[]>>;
}) => {
  const {
    products: autoCompleteProducts,
    productsIsLoading: autoCompleteProductsLoading,
    search,
    setSearch,
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
    onSubmit: values => {
      const { id, name, quantity } = values;
      const idExists =
        productsList.filter(
          (product, idx) => idx !== index && product.id === id,
        ).length > 0;
      let indexToRemove = -1;

      if (idExists) {
        const updatedProducts = productsList.map(product => {
          if (product.id === id) {
            indexToRemove = index;
            return {
              ...product,
              name,
              quantity,
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

export default useEditDetailProduct;
