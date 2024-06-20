import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import InputField from 'src/components/atoms/InputField';
import Button from 'src/components/atoms/Button';
import SelectField from 'src/components/atoms/SelectField';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import useAddStore from 'src/hooks/stores/useAddStore';
import AddProductItem from 'src/components/organisms/AddProductItem';
import EditProductItem from 'src/components/organisms/EditProductItem';
import { EditableProduct } from 'src/hooks/products/interface';

const selectItems = [
  { label: 'Si', value: 'true' },
  { label: 'No', value: 'false' },
];

const AddStore = () => {
  const { formik, isLoading } = useAddStore();
  const [products, setProducts] = useState<EditableProduct[]>([]);

  const handleSubmit = () => {
    formik.setFieldValue('products', products);
    formik.handleSubmit();
  };

  return (
    <DetailsTemplate
      title="Agregar Tienda"
      returnButtonProps={{ to: '/stores', params: {} }}
    >
      <Stack spacing={4} mb={4}>
        <Card sx={{ px: 4, pb: 4 }}>
          <CardContent>
            <Typography variant="h2" gutterBottom>
              Informacion General
            </Typography>
            <Stack spacing={4}>
              <InputField
                id="name"
                name="name"
                label="Nombre"
                type="text"
                formik={formik}
              />
              <SelectField
                id="is_main"
                labelId="label-is_main"
                name="is_main"
                label="Principal"
                items={selectItems}
                formik={formik}
              />
            </Stack>
          </CardContent>
        </Card>

        <Card
          sx={{
            px: 4,
            pb: 4,
            zIndex: 1,
            position: 'relative',
            overflow: 'visible',
          }}
        >
          <CardContent>
            <Typography variant="h2">Productos</Typography>
            <Stack spacing={4}>
              <List>
                {products.map((product, index) => (
                  <EditProductItem
                    key={product.id}
                    index={index}
                    product={product}
                    productsList={products}
                    setProducts={setProducts}
                  />
                ))}
              </List>
              <Stack direction="row" spacing={2}>
                <AddProductItem
                  productsList={products}
                  setProducts={setProducts}
                />
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
  component: AddStore,
});

export default AddStore;
