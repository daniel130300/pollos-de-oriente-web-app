import { createLazyFileRoute } from '@tanstack/react-router';
import Stack from '@mui/material/Stack';
import InputField from 'src/components/atoms/InputField';
import Button from 'src/components/atoms/Button';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import useAddWarehouse from 'src/hooks/warehouses/useAddWarehouse';

export const Route = createLazyFileRoute(
  '/_auth/establishments/warehouses/add-warehouse',
)({
  component: AddWarehouse,
});

function AddWarehouse() {
  const { formik, isLoading } = useAddWarehouse();

  return (
    <DetailsTemplate
      title="Agregar Bodega"
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
          Agregar Bodega
        </Button>
      </>
    </DetailsTemplate>
  );
}

export default AddWarehouse;
