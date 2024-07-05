import AutoCompleteSelect from '../molecules/AutoCompleteSelect';
import InputField from '../atoms/InputField';
import Button from '@mui/material/Button';
import { productFormsValidations } from 'src/constants';
import { apiItems } from 'src/constants/selectItems';
import useAddProductDetail from 'src/hooks/products/useAddProductDetail';
import useAddComboProduct from 'src/hooks/combos/useAddComboProduct';
import { EditableProductDetail } from 'src/hooks/products/interface';
import { EditableComboProduct } from 'src/hooks/combos/interface';

interface AddProductItemProps {
  productsList: EditableProductDetail[] | EditableComboProduct[];
  setProducts:
    | React.Dispatch<React.SetStateAction<EditableProductDetail[]>>
    | React.Dispatch<React.SetStateAction<EditableComboProduct[]>>;
  isCombo: boolean;
}

export const AddProductItem = ({
  productsList,
  setProducts,
  isCombo,
}: AddProductItemProps) => {
  const {
    search,
    autoCompleteProducts,
    autoCompleteProductsLoading,
    formik,
    productSelectError,
    setSearch,
  } = isCombo
    ? useAddComboProduct({
        productsList: productsList as EditableComboProduct[],
        setProducts: setProducts as React.Dispatch<
          React.SetStateAction<EditableComboProduct[]>
        >,
      })
    : useAddProductDetail({
        productsList: productsList as EditableProductDetail[],
        setProducts: setProducts as React.Dispatch<
          React.SetStateAction<EditableProductDetail[]>
        >,
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
        id={isCombo ? 'quantity' : 'arithmetic_quantity'}
        name={isCombo ? 'quantity' : 'arithmetic_quantity'}
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

export default AddProductItem;
