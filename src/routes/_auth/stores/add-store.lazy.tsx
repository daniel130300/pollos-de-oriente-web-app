import { createLazyFileRoute } from '@tanstack/react-router'
import Stack from "@mui/material/Stack";
import InputField from 'src/components/atoms/InputField';
import Button from 'src/components/atoms/Button';
import SelectField from 'src/components/atoms/SelectField';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import useAddStore from 'src/hooks/stores/useAddStore';

export const Route = createLazyFileRoute('/_auth/stores/add-store')({
  component: AddStore
})

const selectItems = [
  {label: "Si", value: 'true'},
  {label: "No", value: 'false'}
];

function AddStore () {
  const {
    formik,
    isLoading
  } = useAddStore();

  return (
    <DetailsTemplate title='Agregar Tienda' returnButtonProps={{to: '/stores', params: {}}} >
      <>
        <Stack spacing={3} mb={4}>
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
            selectItems={selectItems} 
            formik={formik}
          />
        </Stack>
        <Button onClick={() => formik.handleSubmit()} isLoading={isLoading}>Agregar Tienda</Button>
      </>
    </DetailsTemplate>
  );
};

export default AddStore;