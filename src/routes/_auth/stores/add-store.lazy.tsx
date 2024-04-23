import { createLazyFileRoute } from '@tanstack/react-router';
import { useState, ChangeEvent, FormEvent } from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import InputField from 'src/components/atoms/InputField';
import Button from 'src/components/atoms/Button';
import SelectField from 'src/components/atoms/SelectField';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import useAddStore from 'src/hooks/stores/useAddStore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface Product {
  id: string;
  quantity: string;
  price: string;
  editable: boolean;
}

const selectItems = [
  { label: 'Si', value: 'true' },
  { label: 'No', value: 'false' }
];

const AddStore: React.FC = () => {
  const { formik, isLoading } = useAddStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [addProduct, setAddProduct] = useState<Product>({ id: '', quantity: '', price: '', editable: false });
  const [editProduct, setEditProduct] = useState<Product>({ id: '', quantity: '', price: '', editable: false });

  const handleAddProduct = () => {
    if (addProduct.id && addProduct.quantity && addProduct.price) {
      setProducts([...products, addProduct]);
      setAddProduct({ id: '', quantity: '', price: '', editable: false });
    }
  };

  const handleEditProduct = (productId: string) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, id: editProduct.id, quantity: editProduct.quantity, price: editProduct.price, editable: false }
        : product
    );
    setProducts(updatedProducts);
    setEditProduct({ id: '', quantity: '', price: '', editable: false });
  };

  const handleDeleteProduct = (productId: string) => {
    const filteredProducts = products.filter((product) => product.id !== productId);
    setProducts(filteredProducts);
  };

  const toggleProductEditable = (productId: string) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, editable: !product.editable }
        : { ...product, editable: false }
    );
    setProducts(updatedProducts);
    if (!products.find((product) => product.id === productId)?.editable) {
      const productToEdit = products.find((product) => product.id === productId);
      if (productToEdit) {
        setEditProduct(productToEdit);
      }
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, field: string, isEdit = false) => {
    const { value } = event.target;
    if (isEdit) {
      setEditProduct({ ...editProduct, [field]: value });
    } else {
      setAddProduct({ ...addProduct, [field]: value });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  return (
    <DetailsTemplate title="Agregar Tienda" returnButtonProps={{ to: '/stores', params: {} }}>
      <Stack spacing={4} mb={4}>
        <Card sx={{ px: 4, pb: 4 }}>
          <CardContent>
            <Typography variant="h2" gutterBottom>
              Informacion General
            </Typography>
            <Stack spacing={4}>
              <InputField id="name" name="name" label="Nombre" type="text" formik={formik} />
              <SelectField
                id="is_main"
                labelId="label-is_main"
                name="is_main"
                label="Principal"
                selectItems={selectItems}
                formik={formik}
              />
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ px: 4, pb: 4 }}>
          <CardContent>
            <Typography variant="h2">Productos</Typography>
            <Stack spacing={4}>
              <List>
                {products.map((product, index) => (
                  <ListItem key={index}>
                    {product.editable ? (
                      <Stack direction="row" spacing={2}>
                        <InputField
                          id="id"
                          name="id"
                          label="Id"
                          value={editProduct.id}
                          onChange={(event) => handleInputChange(event, 'id', true)}
                        />
                        <InputField
                          id="quantity"
                          name="quantity"
                          label="Cantidad"
                          value={editProduct.quantity}
                          onChange={(event) => handleInputChange(event, 'quantity', true)}
                        />
                        <InputField
                          id="price"
                          name="price"
                          label="Precio"
                          value={editProduct.price}
                          onChange={(event) => handleInputChange(event, 'price', true)}
                        />
                      </Stack>
                    ) : (
                      <ListItemText
                        primary={`ID: ${product.id}, Cantidad: ${product.quantity}, Precio: ${product.price}`}
                      />
                    )}
                    <ListItemSecondaryAction>
                      {product.editable ? (
                        <Stack direction="row" spacing={2}>
                          <Tooltip title="Confirmar" sx={{ cursor: 'pointer' }}>
                            <CheckCircleIcon onClick={() => handleEditProduct(product.id)} color="success" />
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
                ))}
              </List>

              <Stack direction="row" spacing={2}>
                <InputField id="id" name="id" label="Id" value={addProduct.id} onChange={(event) => handleInputChange(event, 'id')} />
                <InputField
                  id="quantity"
                  name="quantity"
                  label="Cantidad"
                  value={addProduct.quantity}
                  onChange={(event) => handleInputChange(event, 'quantity')}
                />
                <InputField
                  id="price"
                  name="price"
                  label="Precio de venta"
                  value={addProduct.price}
                  onChange={(event) => handleInputChange(event, 'price')}
                />
                <Button variant="outlined" onClick={handleAddProduct}>
                  Agregar
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
      <Button onClick={handleSubmit} isLoading={isLoading}>
        Agregar Tienda
      </Button>
    </DetailsTemplate>
  );
};

export const Route = createLazyFileRoute('/_auth/stores/add-store')({
  component: AddStore
});

export default AddStore;