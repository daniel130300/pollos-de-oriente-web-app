import AutoCompleteSelect from '../molecules/AutoCompleteSelect';
import InputField from '../atoms/InputField';
import Button from '@mui/material/Button';
import { productFormsValidations } from 'src/constants';
import { apiItems } from 'src/constants/selectItems';
import { EditableStoreProduct } from 'src/hooks/stores/interface';
import useAddStoreProductItem from 'src/hooks/stores/useAddStoreProductItem';

interface AddStoreProductItemProps {
  productsList: EditableStoreProduct[];
  setProducts: React.Dispatch<React.SetStateAction<EditableStoreProduct[]>>;
}

export const AddStoreProductItem = ({
  productsList,
  setProducts,
}: AddStoreProductItemProps) => {
  const {
    search,
    autoCompleteProducts,
    autoCompleteProductsLoading,
    formik,
    productSelectError,
    setSearch,
  } = useAddStoreProductItem({
    productsList,
    setProducts,
  });

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
        id={'sale_price'}
        name={'sale_price'}
        label="Precio de Venta"
        type="number"
        formik={formik}
      />
      <Button variant="outlined" onClick={() => formik.handleSubmit()}>
        Agregar
      </Button>
    </>
  );
};

export default AddStoreProductItem;
