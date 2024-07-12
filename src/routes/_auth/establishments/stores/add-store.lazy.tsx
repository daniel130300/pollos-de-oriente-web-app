import { createLazyFileRoute } from '@tanstack/react-router';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputField from 'src/components/atoms/InputField';
import Button from 'src/components/atoms/Button';
import SelectField from 'src/components/atoms/SelectField';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import useAddStore from 'src/hooks/stores/useAddStore';
import { booleanItems } from 'src/constants/selectItems';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import AddStoreProductItem from 'src/components/organisms/AddStoreProductItem';
import EditStoreProductItem from 'src/components/organisms/EditStoreProductItem';
import AddStoreComboItem from 'src/components/organisms/AddStoreComboItem';
import EditStoreComboItem from 'src/components/organisms/EditStoreComboItem';

const AddStore = () => {
  const {
    formik,
    isLoading,
    storeProducts,
    setStoreProducts,
    storeCombos,
    setStoreCombos,
  } = useAddStore();

  return (
    <DetailsTemplate
      title="Agregar Tienda"
      returnButtonProps={{ to: '/establishments/stores', params: {} }}
      displaySubtitle={false}
    >
      <>
        <Stack spacing={4} mb={4}>
          <InputField
            id="name"
            name="name"
            label="Nombre"
            type="text"
            formik={formik}
          />
          <SelectField
            id="has_delivery"
            name="has_delivery"
            label="Tiene Delivery?"
            items={booleanItems}
            formik={formik}
          />
          <SelectField
            id="has_pos"
            name="has_pos"
            label="Tiene POS?"
            items={booleanItems}
            formik={formik}
          />
          <Divider />
          <Typography variant="h3">Menu</Typography>
          <Typography variant="h4">Productos</Typography>
          <Stack spacing={4}>
            <List>
              {storeProducts.map((product, index) => (
                <EditStoreProductItem
                  key={product.id}
                  index={index}
                  product={product}
                  productsList={storeProducts}
                  setProducts={setStoreProducts}
                />
              ))}
            </List>
            <Stack direction="row" spacing={2}>
              <AddStoreProductItem
                productsList={storeProducts}
                setProducts={setStoreProducts}
              />
            </Stack>
          </Stack>
          <Typography variant="h4">Combos</Typography>
          <Stack spacing={4}>
            <List>
              {storeCombos.map((combo, index) => (
                <EditStoreComboItem
                  key={combo.id}
                  index={index}
                  combo={combo}
                  combosList={storeCombos}
                  setCombos={setStoreCombos}
                />
              ))}
            </List>
            <Stack direction="row" spacing={2}>
              <AddStoreComboItem
                combosList={storeCombos}
                setCombos={setStoreCombos}
              />
            </Stack>
          </Stack>
        </Stack>
        <Button onClick={() => formik.handleSubmit()} isLoading={isLoading}>
          Agregar Tienda
        </Button>
      </>
    </DetailsTemplate>
  );
};

export const Route = createLazyFileRoute(
  '/_auth/establishments/stores/add-store',
)({
  component: AddStore,
});

export default AddStore;
