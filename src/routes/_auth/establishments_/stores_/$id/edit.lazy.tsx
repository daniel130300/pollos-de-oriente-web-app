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
  const { formik, isLoading } = useEditStore({ id, store });

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
        </Stack>
        <Button onClick={() => formik.handleSubmit()} isLoading={isLoading}>
          Editar Tienda
        </Button>
      </>
    </DetailsTemplate>
  );
}

export default EditStore;
