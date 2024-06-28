import { Dispatch } from 'react';
import AutoCompleteSelect from '../molecules/AutoCompleteSelect';
import InputField from '../atoms/InputField';
import Button from '@mui/material/Button';
import { productFormsValidations } from 'src/constants';
import useAddProductDetail from 'src/hooks/products/useAddProductDetail';
import { EditableProductDetail } from 'src/hooks/products/interface';
import { apiItems } from 'src/constants/selectItems';

export const AddDetailProductItem = ({
  productsList,
  setProducts,
}: {
  productsList: EditableProductDetail[];
  setProducts: Dispatch<React.SetStateAction<EditableProductDetail[]>>;
}) => {
  const {
    search,
    autoCompleteProducts,
    autoCompleteProductsLoading,
    formik,
    productSelectError,
    setSearch,
  } = useAddProductDetail({ productsList, setProducts });

  return (
    <>
      <AutoCompleteSelect
        id="id"
        name="id"
        label="Producto"
        items={apiItems(autoCompleteProducts)}
        onSelectChange={option => {
          formik.setFieldValue('id', option.value);
          formik.setFieldValue('name', option.label);
        }}
        inputValue={search}
        setInputValue={setSearch}
        loading={autoCompleteProductsLoading}
        error={productSelectError}
        errorMessage={productFormsValidations.select_product.required}
      />
      <InputField
        id="arithmetic_quantity"
        name="arithmetic_quantity"
        label="Cantidad"
        type="number"
        formik={formik}
      />
      <Button variant="outlined" onClick={() => formik.handleSubmit()}>
        Agregar
      </Button>
    </>
  );
};

export default AddDetailProductItem;
