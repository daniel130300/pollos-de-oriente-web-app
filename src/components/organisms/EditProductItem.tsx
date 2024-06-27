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
import useEditProductToAddToStoreInventory from 'src/hooks/stores/useEditProductToAddToStoreInventory';
import { productFormsValidations } from 'src/constants';
import { EditableProduct } from 'src/hooks/products/interface';

export const EditProductItem = ({
  index,
  product,
  productsList,
  setProducts,
}: {
  index: number;
  product: EditableProduct;
  productsList: EditableProduct[];
  setProducts: Dispatch<React.SetStateAction<EditableProduct[]>>;
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
  } = useEditProductToAddToStoreInventory({
    index,
    productsList,
    product,
    setProducts,
  });

  return (
    <ListItem key={product.id}>
      {product.editable ? (
        <Stack direction="row" spacing={2}>
          <AutoCompleteSelect
            id="id"
            name="id"
            label="Producto"
            options={autoCompleteProducts}
            onSelectChange={option => {
              formik.setFieldValue('id', option.id);
              formik.setFieldValue('name', option.name);
            }}
            selectValue={product.id}
            inputValue={search}
            setInputValue={setSearch}
            loading={autoCompleteProductsLoading}
            error={productSelectError}
            errorMessage={productFormsValidations.select_product.required}
          />
          <InputField
            id="quantity"
            name="quantity"
            label="Cantidad"
            type="number"
            formik={formik}
          />
          <InputField
            id="sale_price"
            name="sale_price"
            label="Precio"
            type="number"
            formik={formik}
          />
        </Stack>
      ) : (
        <ListItemText
          primary={`Nombre: ${product.name}, Cantidad: ${product.quantity}, Precio: ${product.sale_price}`}
        />
      )}
      <ListItemSecondaryAction>
        {product.editable ? (
          <Stack direction="row" spacing={2}>
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

export default EditProductItem;
