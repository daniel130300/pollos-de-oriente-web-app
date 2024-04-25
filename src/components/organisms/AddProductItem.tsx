import { ChangeEvent, Dispatch, useState } from "react";
import { Product } from "src/routes/_auth/stores/add-store.lazy";
import AutoCompleteSelect from "../molecules/AutoCompleteSelect";
import useGetProducts from "src/hooks/products/useGetProducts";
import InputField from "../atoms/InputField";
import Button from "@mui/material/Button";

export const AddProductItem = ({
  setProducts
} : {
  setProducts: Dispatch<React.SetStateAction<Product[]>>
}) => {
  const [addProduct, setAddProduct] = useState<Product>({ id: '', name: '', quantity: '', price: '', editable: false });
  const [search, setSearch] = useState('');
  const { products: autoCompleteProducts, productsIsLoading: autoCompleteProductsLoading } = useGetProducts({page: 0, rowsPerPage: 10, search});

  const handleProductChange = ({
    event,
    value,
    field
  }: {
    event?: ChangeEvent<HTMLInputElement>;
    value?: string;
    field: string;
  }): void => {
    const fieldValue = event ? event.target.value : value;
    setAddProduct((previousProductInfo) => ({
      ...previousProductInfo,
      [field]: fieldValue,
    }));
  };

  const handleAddProduct = () => {
    if (addProduct) {
      setProducts((previousProducts) => ([...previousProducts, addProduct]));
      setAddProduct({ id: '', name: '', quantity: '', price: '', editable: false });
      setSearch('');
    }
  };

  return (
    <>
      <AutoCompleteSelect
        id='id'
        name='id'
        label='Producto'
        options={autoCompleteProducts}
        onSelectChange={(option) => {
          handleProductChange({value: option.id, field: 'id'});
          handleProductChange({value: option.name, field: 'name'});
        }}
        inputValue={search}
        setInputValue={setSearch}
        loading={autoCompleteProductsLoading}
      />
      <InputField
        id="quantity"
        name="quantity"
        label="Cantidad"
        value={addProduct.quantity}
        onChange={(event) => handleProductChange({event, field: 'quantity'})}
      />
      <InputField
        id="price"
        name="price"
        label="Precio de venta"
        value={addProduct.price}
        onChange={(event) => handleProductChange({event, field: 'price'})}
      />
      <Button variant="outlined" onClick={handleAddProduct}>
        Agregar
      </Button>
    </>
  )
}

export default AddProductItem;