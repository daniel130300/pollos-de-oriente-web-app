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
import { EditableComboProduct } from 'src/hooks/combos/interface';
import useEditComboProduct from 'src/hooks/combos/useEditComboProduct';

export const EditProductItem = ({
  index,
  product,
  productsList,
  setProducts,
  isCombo,
}: {
  index: number;
  product: EditableProductDetail | EditableComboProduct;
  productsList: EditableProductDetail[] | EditableComboProduct[];
  setProducts:
    | Dispatch<React.SetStateAction<EditableProductDetail[]>>
    | Dispatch<React.SetStateAction<EditableComboProduct[]>>;
  isCombo: boolean;
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
  } = isCombo
    ? useEditComboProduct({
        index,
        productsList: productsList as EditableComboProduct[],
        setProducts: setProducts as Dispatch<
          React.SetStateAction<EditableComboProduct[]>
        >,
        product: product as EditableComboProduct,
      })
    : useEditDetailProduct({
        index,
        productsList: productsList as EditableProductDetail[],
        setProducts: setProducts as Dispatch<
          React.SetStateAction<EditableProductDetail[]>
        >,
        product: product as EditableProductDetail,
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
            id={isCombo ? 'quantity' : 'arithmetic_quantity'}
            name={isCombo ? 'quantity' : 'arithmetic_quantity'}
            label="Cantidad"
            type="number"
            formik={formik}
          />
        </Stack>
      ) : (
        <ListItemText
          primary={`Nombre: ${product.name}, Cantidad: ${isCombo ? (product as EditableComboProduct).quantity : (product as EditableProductDetail).arithmetic_quantity}`}
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

export default EditProductItem;
