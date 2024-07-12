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
import {
  EditableStoreProduct,
  EditableStoreCombo,
} from 'src/hooks/stores/interface';
import useEditStoreProduct from 'src/hooks/stores/useEditStoreProduct';
import useEditStoreCombo from 'src/hooks/stores/useEditStoreCombo';

export const EditStoreItem = ({
  isProduct,
  index,
  item,
  itemsList,
  setItems,
}: {
  index: number;
  item: EditableStoreProduct | EditableStoreCombo;
  itemsList: (EditableStoreProduct | EditableStoreCombo)[];
  setItems: Dispatch<
    React.SetStateAction<EditableStoreProduct[] | EditableStoreCombo[]>
  >;
  isProduct: boolean;
}) => {
  const {
    search,
    autoCompleteItems,
    autoCompleteItemsLoading,
    formik,
    itemSelectError,
    setSearch,
    handleDeleteItem,
    toggleItemEditable,
  } = isProduct
    ? useEditStoreProduct({
        index,
        productsList: itemsList,
        setProducts: setItems,
        product: item,
      })
    : useEditStoreCombo({
        index,
        combosList: itemsList,
        setCombos: setItems,
        combo: item,
      });

  return (
    <ListItem key={item.id}>
      {item.editable ? (
        <Stack direction="row" spacing={2}>
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
          primary={`Nombre: ${item.name}, Precio de Venta: ${item.sale_price}`}
          disableTypography
        />
      )}
      <ListItemSecondaryAction>
        {item.editable ? (
          <Stack direction="row" spacing={1}>
            <Tooltip title="Confirmar" sx={{ cursor: 'pointer' }}>
              <CheckCircleIcon
                onClick={() => formik.handleSubmit()}
                color="success"
              />
            </Tooltip>
            <Tooltip title="Cancelar" sx={{ cursor: 'pointer' }}>
              <CancelIcon
                onClick={() => toggleItemEditable(item.id)}
                color="error"
              />
            </Tooltip>
          </Stack>
        ) : (
          <Tooltip title="Editar" sx={{ cursor: 'pointer' }}>
            <EditIcon
              onClick={() => toggleItemEditable(item.id)}
              color="primary"
            />
          </Tooltip>
        )}
        {!item.editable && (
          <Tooltip title="Eliminar" sx={{ cursor: 'pointer' }}>
            <DeleteIcon
              onClick={() => handleDeleteItem(item.id)}
              color="error"
            />
          </Tooltip>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default EditStoreItem;
