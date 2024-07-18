import { createLazyFileRoute } from '@tanstack/react-router';
import Stack from '@mui/material/Stack';
import InputField from 'src/components/atoms/InputField';
import { Button } from 'src/components/atoms/Button';
import Loader from 'src/components/atoms/Loader';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import useGetWarehouse from 'src/hooks/warehouses/useGetWarehouse';
import useEditWarehouse from 'src/hooks/warehouses/useEditWarehouse';

export const Route = createLazyFileRoute(
  '/_auth/establishments/warehouses/$id/edit',
)({
  component: EditWarehouse,
});

function EditWarehouse() {
  const { id } = Route.useParams();
  const { warehouse, warehouseIsLoading, warehouseIsFetching } =
    useGetWarehouse({
      id,
    });
  const { formik, isLoading } = useEditWarehouse({ id, warehouse });

  if (warehouseIsLoading || warehouseIsFetching) return <Loader type="cover" />;

  return (
    <DetailsTemplate
      title="Editar Bodega"
      returnButtonProps={{ to: '/establishments/warehouses', params: {} }}
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
        </Stack>
        <Button onClick={() => formik.handleSubmit()} isLoading={isLoading}>
          Editar Bodega
        </Button>
      </>
    </DetailsTemplate>
  );
}

export default EditWarehouse;
