import ListItem from '@mui/material/ListItem';
import { Dispatch } from 'react';
import AutoCompleteSelect from '../molecules/AutoCompleteSelect';
import Stack from '@mui/material/Stack';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import InputField from '../atoms/InputField';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { productFormsValidations } from 'src/constants';
import { apiItems } from 'src/constants/selectItems';
import { EditableStoreCombo } from 'src/hooks/stores/interface';
import useEditStoreComboItem from 'src/hooks/stores/useEditStoreComoItem';

export const EditStoreComboItem = ({
  index,
  combo,
  combosList,
  setCombos,
}: {
  index: number;
  combo: EditableStoreCombo;
  combosList: EditableStoreCombo[];
  setCombos: Dispatch<React.SetStateAction<EditableStoreCombo[]>>;
}) => {
  const {
    search,
    autoCompleteCombos,
    autoCompleteCombosLoading,
    formik,
    comboSelectError,
    setSearch,
    handleDeleteCombo,
    toggleComboEditable,
  } = useEditStoreComboItem({
    index,
    combosList,
    setCombos,
    combo,
  });

  return (
    <ListItem key={combo.id}>
      {combo.editable ? (
        <Stack direction="row" spacing={2}>
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
            errorMessage={productFormsValidations.select_product.required}
          />
          <InputField
            id={'sale_price'}
            name={'sale_price'}
            label="Precio de Venta"
            type="number"
            formik={formik}
          />
        </Stack>
      ) : (
        <ListItemText
          primary={`Nombre: ${combo.name}, Precio de Venta: ${combo.sale_price}`}
          disableTypography
        />
      )}
      <ListItemSecondaryAction>
        {combo.editable ? (
          <Stack direction="row" spacing={1}>
            <Tooltip title="Confirmar" sx={{ cursor: 'pointer' }}>
              <CheckCircleIcon
                onClick={() => formik.handleSubmit()}
                color="success"
              />
            </Tooltip>
            <Tooltip title="Cancelar" sx={{ cursor: 'pointer' }}>
              <CancelIcon
                onClick={() => toggleComboEditable(combo.id)}
                color="error"
              />
            </Tooltip>
          </Stack>
        ) : (
          <Tooltip title="Editar" sx={{ cursor: 'pointer' }}>
            <EditIcon
              onClick={() => toggleComboEditable(combo.id)}
              color="primary"
            />
          </Tooltip>
        )}
        {!combo.editable && (
          <Tooltip title="Eliminar" sx={{ cursor: 'pointer' }}>
            <DeleteIcon
              onClick={() => handleDeleteCombo(combo.id)}
              color="error"
            />
          </Tooltip>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default EditStoreComboItem;
