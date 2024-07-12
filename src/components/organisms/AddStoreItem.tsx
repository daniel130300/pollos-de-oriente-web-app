import AutoCompleteSelect from '../molecules/AutoCompleteSelect';
import InputField from '../atoms/InputField';
import Button from '@mui/material/Button';
import { apiItems, productFormsValidations } from 'src/constants';
import { EditableStoreProduct } from 'src/hooks/stores/interface';
import useAddStoreProductItem from 'src/hooks/stores/useAddStoreProductItem';
import { comboFormsValidations } from 'src/constants';
import { EditableStoreCombo } from 'src/hooks/stores/interface';
import useAddStoreComboItem from 'src/hooks/stores/useAddStoreComboItem';

interface AddStoreItemProps {
  itemsList: EditableStoreProduct[] | EditableStoreCombo[];
  setItems: React.Dispatch<
    React.SetStateAction<EditableStoreProduct[] | EditableStoreCombo[]>
  >;
  isProduct: boolean;
}

export const AddStoreItem = ({
  itemsList,
  setItems,
  isProduct,
}: AddStoreItemProps) => {
  const {
    search,
    autoCompleteItems,
    autoCompleteItemsLoading,
    formik,
    itemSelectError,
    setSearch,
  } = isProduct
    ? useAddStoreProductItem({ productsList: itemsList, setProducts: setItems })
    : useAddStoreComboItem({ combosList: itemsList, setCombos: setItems });

  return (
    <>
      <AutoCompleteSelect
        id="id"
        name="id"
        label={isProduct ? 'Producto' : 'Combo'}
        items={apiItems(autoCompleteItems)}
        onSelectChange={option => {
          formik.setFieldValue('id', option.value);
          formik.setFieldValue('name', option.label);
        }}
        inputValue={search}
        setInputValue={setSearch}
        loading={autoCompleteItemsLoading}
        error={itemSelectError}
        errorMessage={
          isProduct
            ? productFormsValidations.select_product.required
            : comboFormsValidations.select_combo.required
        }
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

export default AddStoreItem;
