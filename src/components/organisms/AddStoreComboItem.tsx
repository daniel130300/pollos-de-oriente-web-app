import AutoCompleteSelect from '../molecules/AutoCompleteSelect';
import InputField from '../atoms/InputField';
import Button from '@mui/material/Button';
import { comboFormsValidations } from 'src/constants';
import { apiItems } from 'src/constants/selectItems';
import useAddStoreComboItem from 'src/hooks/stores/useAddStoreComboItem';
import { EditableStoreCombo } from 'src/hooks/stores/interface';

interface AddStoreComboItemProps {
  combosList: EditableStoreCombo[];
  setCombos: React.Dispatch<React.SetStateAction<EditableStoreCombo[]>>;
}

export const AddStoreComboItem = ({
  combosList,
  setCombos,
}: AddStoreComboItemProps) => {
  const {
    search,
    autoCompleteCombos,
    autoCompleteCombosLoading,
    formik,
    comboSelectError,
    setSearch,
  } = useAddStoreComboItem({
    combosList,
    setCombos,
  });

  return (
    <>
      <AutoCompleteSelect
        id="id"
        name="id"
        label="Combo"
        items={apiItems(autoCompleteCombos)}
        onSelectChange={option => {
          formik.setFieldValue('id', option.value);
          formik.setFieldValue('name', option.label);
        }}
        inputValue={search}
        setInputValue={setSearch}
        loading={autoCompleteCombosLoading}
        error={comboSelectError}
        errorMessage={comboFormsValidations.select_combo.required}
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

export default AddStoreComboItem;
