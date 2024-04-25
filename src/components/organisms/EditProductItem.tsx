import ListItem from "@mui/material/ListItem";
import { ChangeEvent, Dispatch, useState } from "react";
import useGetProducts from "src/hooks/products/useGetProducts";
import { Product } from "src/routes/_auth/stores/add-store.lazy";
import AutoCompleteSelect from "../molecules/AutoCompleteSelect";
import Stack from "@mui/material/Stack";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import InputField from "../atoms/InputField";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export const EditProductItem = ({
  index,
  product,
  productsList,
  setProducts
} : {
  index: number,
  product: Product, 
  productsList: Product[],
  setProducts:  Dispatch<React.SetStateAction<Product[]>>
}) => {
  const [editProduct, setEditProduct] = useState<Product>({ id: '', name: '', quantity: '', price: '', editable: false });
  const [search, setSearch] = useState(product.name);
  const { products: autoCompleteProducts, productsIsLoading: autoCompleteProductsLoading } = useGetProducts({page: 0, rowsPerPage: 10, search});

  const handleEditProduct = (index: number) => {
    const updatedProducts = productsList.map((product, idx) => {
      if (idx === index) {
        return {
          ...product,
          id: editProduct.id,
          name: editProduct.name,
          quantity: editProduct.quantity,
          price: editProduct.price,
          editable: false
        };
      } else {
        return product;
      }
    });
    setProducts(updatedProducts);
    setEditProduct({ id: '', name: '', quantity: '', price: '', editable: false });
  };

  const handleDeleteProduct = (productId: string) => {
    const filteredProducts = productsList.filter((product) => product.id !== productId);
    setProducts(filteredProducts);
  };

  const toggleProductEditable = (productId: string) => {
    const updatedProducts = productsList.map((product) =>
      product.id === productId
        ? { ...product, editable: !product.editable }
        : { ...product, editable: false }
    );
    setProducts(updatedProducts);
    if (!productsList.find((product) => product.id === productId)?.editable) {
      const productToEdit = productsList.find((product) => product.id === productId);
      if (productToEdit) {
        setEditProduct(productToEdit);
      }
    };
  }

  const handleProductChange = ({
    event,
    value,
    field,
  }: {
    event?: ChangeEvent<HTMLInputElement>;
    value?: string;
    field: string;
  }): void => {
    const fieldValue = event ? event.target.value : value;
    setEditProduct((previousEdit) => ({
      ...previousEdit,
      [field]: fieldValue,
    }));
  };

  return (
    <ListItem key={product.id}>
      {product.editable ? (
        <Stack direction="row" spacing={2}>
          <AutoCompleteSelect
            id='id'
            name='id'
            label='Producto'
            options={autoCompleteProducts}
            onSelectChange={(option) => {
              handleProductChange({value: option.id, field: 'id'});
              handleProductChange({value: option.name, field: 'name'});
            }}
            selectValue={product.id}
            inputValue={search}
            setInputValue={setSearch}
            loading={autoCompleteProductsLoading}
          />
          <InputField
            id="quantity"
            name="quantity"
            label="Cantidad"
            value={editProduct.quantity}
            onChange={(event) => handleProductChange({event, field: 'quantity'})}
          />
          <InputField
            id="price"
            name="price"
            label="Precio"
            value={editProduct.price}
            onChange={(event) => handleProductChange({event, field: 'price'})}
          />
        </Stack>
      ) : (
        <ListItemText
          primary={`Nombre: ${product.name}, Cantidad: ${product.quantity}, Precio: ${product.price}`}
        />
      )}
      <ListItemSecondaryAction>
        {product.editable ? (
          <Stack direction="row" spacing={2}>
            <Tooltip title="Confirmar" sx={{ cursor: 'pointer' }}>
              <CheckCircleIcon onClick={() => handleEditProduct(index)} color="success" />
            </Tooltip>
            <Tooltip title="Cancelar" sx={{ cursor: 'pointer' }}>
              <CancelIcon onClick={() => toggleProductEditable(product.id)} color="error" />
            </Tooltip>
          </Stack>
        ) : (
          <Tooltip title="Editar" sx={{ cursor: 'pointer' }}>
            <EditIcon onClick={() => toggleProductEditable(product.id)} color="primary" />
          </Tooltip>
        )}
        {!product.editable && (
          <Tooltip title="Eliminar" sx={{ cursor: 'pointer' }}>
            <DeleteIcon onClick={() => handleDeleteProduct(product.id)} color="error" />
          </Tooltip>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default EditProductItem;