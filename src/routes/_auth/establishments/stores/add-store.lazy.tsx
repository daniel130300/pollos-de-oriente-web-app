import { createLazyFileRoute } from '@tanstack/react-router';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import InputField from 'src/components/atoms/InputField';
import Button from 'src/components/atoms/Button';
import SelectField from 'src/components/atoms/SelectField';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import useAddStore from 'src/hooks/stores/useAddStore';
import { booleanItems } from 'src/constants/selectItems';

const AddStore = () => {
  const { formik, isLoading } = useAddStore();

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <DetailsTemplate
      title="Agregar Tienda"
      returnButtonProps={{ to: '/establishments/stores', params: {} }}
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
          </CardContent>
        </Card>
      </Stack>
      <Button onClick={handleSubmit} isLoading={isLoading}>
        Agregar Tienda
      </Button>
    </DetailsTemplate>
  );
};

export const Route = createLazyFileRoute(
  '/_auth/establishments/stores/add-store',
)({
  component: AddStore,
});

export default AddStore;
