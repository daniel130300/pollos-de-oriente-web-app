import { productFormsValidations } from 'src/constants/formValidations';
import * as yup from 'yup';
import { Dispatch, useEffect } from 'react';
import { useFormik } from 'formik';
import useGetProducts from '../products/useGetProducts';
import { EditableStoreProduct } from './interface';

const useEditStoreProductItem = ({
  index,
  productsList,
  product,
  setProducts,
}: {
  index: number;
  productsList: EditableStoreProduct[];
  product: EditableStoreProduct;
  setProducts: Dispatch<React.SetStateAction<EditableStoreProduct[]>>;
}) => {
  const {
    products: autoCompleteItems,
    productsIsLoading: autoCompleteItemsLoading,
    search,
    setSearch,
  } = useGetProducts();

  useEffect(() => {
    setSearch(product.name);
  }, [product]);

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
    onSubmit: values => {
      const { id, name, sale_price } = values;
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

  const itemSelectError = !!formik.errors.id && !!formik.errors.name;

  const handleDeleteItem = (productId: string) => {
    const filteredProducts = productsList.filter(
      product => product.id !== productId,
    );
    setProducts(filteredProducts);
  };

  const toggleItemEditable = (productId: string) => {
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
    autoCompleteItems,
    autoCompleteItemsLoading,
    handleDeleteItem,
    toggleItemEditable,
    formik,
    itemSelectError,
  };
};

export default useEditStoreProductItem;
