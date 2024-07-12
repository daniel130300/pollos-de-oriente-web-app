import { createLazyFileRoute } from '@tanstack/react-router';
import Stack from '@mui/material/Stack';
import InputField from 'src/components/atoms/InputField';
import { Button } from 'src/components/atoms/Button';
import SelectField from 'src/components/atoms/SelectField';
import Loader from 'src/components/atoms/Loader';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import useGetStore from 'src/hooks/stores/useGetStore';
import useEditStore from 'src/hooks/stores/useEditStore';
import { booleanItems } from 'src/constants/selectItems';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { EditStoreItem } from 'src/components/organisms/EditStoreItem';
import { AddStoreItem } from 'src/components/organisms/AddStoreItem';

export const Route = createLazyFileRoute(
  '/_auth/establishments/stores/$id/edit',
)({
  component: EditStore,
});

function EditStore() {
  const { id } = Route.useParams();
  const { store, storeIsLoading, storeIsFetching } = useGetStore({
    id,
  });
  const { formik, isLoading, combos, setCombos, products, setProducts } =
    useEditStore({
      id,
      store,
    });

  if (storeIsLoading || storeIsFetching) return <Loader type="cover" />;

  return (
    <DetailsTemplate
      title="Editar Tienda"
      returnButtonProps={{ to: '/establishments/stores', params: {} }}
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
              {products.map((product, index) => (
                <EditStoreItem
                  key={product.id}
                  index={index}
                  item={product}
                  itemsList={products}
                  setItems={setProducts}
                  isProduct={true}
                />
              ))}
            </List>
            <Stack direction="row" spacing={2}>
              <AddStoreItem
                itemsList={products}
                setItems={setProducts}
                isProduct={true}
              />
            </Stack>
          </Stack>
          <Typography variant="h4">Combos</Typography>
          <Stack spacing={4}>
            <List>
              {combos.map((combo, index) => (
                <EditStoreItem
                  key={combo.id}
                  index={index}
                  item={combo}
                  itemsList={combos}
                  setItems={setCombos}
                  isProduct={false}
                />
              ))}
            </List>
            <Stack direction="row" spacing={2}>
              <AddStoreItem
                itemsList={combos}
                setItems={setCombos}
                isProduct={false}
              />
            </Stack>
          </Stack>
        </Stack>
        <Button onClick={() => formik.handleSubmit()} isLoading={isLoading}>
          Editar Tienda
        </Button>
      </>
    </DetailsTemplate>
  );
}

export default EditStore;
