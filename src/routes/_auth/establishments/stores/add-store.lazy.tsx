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
import AddStoreItem from 'src/components/organisms/AddStoreItem';
import EditStoreItem from 'src/components/organisms/EditStoreItem';

const AddStore = () => {
  const {
    formik,
    isLoading,
    storeProducts,
    setStoreProducts,
    storeCombos,
    setStoreCombos,
    handleSubmit,
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
                <EditStoreItem
                  key={product.id}
                  index={index}
                  item={product}
                  itemsList={storeProducts}
                  setItems={setStoreProducts}
                  isProduct={true}
                />
              ))}
            </List>
            <Stack direction="row" spacing={2}>
              <AddStoreItem
                itemsList={storeProducts}
                setItems={setStoreProducts}
                isProduct={true}
              />
            </Stack>
          </Stack>
          <Typography variant="h4">Combos</Typography>
          <Stack spacing={4}>
            <List>
              {storeCombos.map((combo, index) => (
                <EditStoreItem
                  key={combo.id}
                  index={index}
                  item={combo}
                  itemsList={storeCombos}
                  setItems={setStoreCombos}
                  isProduct={false}
                />
              ))}
            </List>
            <Stack direction="row" spacing={2}>
              <AddStoreItem
                itemsList={storeCombos}
                setItems={setStoreCombos}
                isProduct={false}
              />
            </Stack>
          </Stack>
        </Stack>
        <Button onClick={() => handleSubmit()} isLoading={isLoading}>
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
