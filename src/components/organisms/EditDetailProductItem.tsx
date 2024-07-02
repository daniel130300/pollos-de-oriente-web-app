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
import useEditDetailProduct from 'src/hooks/products/useEditDetailProduct';
import { productFormsValidations } from 'src/constants';
import { EditableProductDetail } from 'src/hooks/products/interface';
import { apiItems } from 'src/constants/selectItems';

export const EditDetailProductItem = ({
  index,
  product,
  productsList,
  setProducts,
}: {
  index: number;
  product: EditableProductDetail;
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
    handleDeleteProduct,
    toggleProductEditable,
  } = useEditDetailProduct({
    index,
    productsList,
    setProducts,
    product,
  });

  return (
    <ListItem key={product.id}>
      {product.editable ? (
        <Stack direction="row" spacing={2}>
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
        </Stack>
      ) : (
        <ListItemText
          primary={`Nombre: ${product.name}, Cantidad: ${product.arithmetic_quantity}`}
          disableTypography
        />
      )}
      <ListItemSecondaryAction>
        {product.editable ? (
          <Stack direction="row" spacing={1}>
            <Tooltip title="Confirmar" sx={{ cursor: 'pointer' }}>
              <CheckCircleIcon
                onClick={() => formik.handleSubmit()}
                color="success"
              />
            </Tooltip>
            <Tooltip title="Cancelar" sx={{ cursor: 'pointer' }}>
              <CancelIcon
                onClick={() => toggleProductEditable(product.id)}
                color="error"
              />
            </Tooltip>
          </Stack>
        ) : (
          <Tooltip title="Editar" sx={{ cursor: 'pointer' }}>
            <EditIcon
              onClick={() => toggleProductEditable(product.id)}
              color="primary"
            />
          </Tooltip>
        )}
        {!product.editable && (
          <Tooltip title="Eliminar" sx={{ cursor: 'pointer' }}>
            <DeleteIcon
              onClick={() => handleDeleteProduct(product.id)}
              color="error"
            />
          </Tooltip>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default EditDetailProductItem;
