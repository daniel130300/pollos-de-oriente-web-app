import { Dispatch } from "react";
import { Product } from "src/routes/_auth/stores/add-store.lazy";
import AutoCompleteSelect from "../molecules/AutoCompleteSelect";
import InputField from "../atoms/InputField";
import Button from "@mui/material/Button";
import { productFormsValidations } from "src/constants";
import { Box } from "@mui/material";
import useAddProductToStoreInventory from "src/hooks/stores/useAddProductToStoreInventory";

export const AddProductItem = ({
  productsList,
  setProducts
} : {
  productsList: Product[],
  setProducts: Dispatch<React.SetStateAction<Product[]>>
}) => {
  const {  
    search,
    autoCompleteProducts,
    autoCompleteProductsLoading,
    formik,
    productSelectError,
    setSearch
  } = useAddProductToStoreInventory({productsList, setProducts});

  return (
    <>
      <Box>
        <AutoCompleteSelect
          id='id'
          name='id'
          label='Producto'
          options={autoCompleteProducts}
          onSelectChange={(option) => {
            formik.setFieldValue('id', option.id);
            formik.setFieldValue('name', option.name);
          }}
          inputValue={search}
          setInputValue={setSearch}
          loading={autoCompleteProductsLoading}
          error={productSelectError}
          errorMessage={productFormsValidations.select_product.required}
        />
      </Box>
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
        label="Precio de venta"
        type="number"
        formik={formik}
      />
      <Button variant="outlined" onClick={() => formik.handleSubmit()}>
        Agregar
      </Button>
    </>
  )
}

export default AddProductItem;