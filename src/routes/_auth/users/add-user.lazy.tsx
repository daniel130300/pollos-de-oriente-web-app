import { createLazyFileRoute } from '@tanstack/react-router';
import Stack from '@mui/material/Stack';
import InputField from 'src/components/atoms/InputField';
import Button from 'src/components/atoms/Button';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import { apiItems, userFormsValidations } from 'src/constants';
import useGetStores from 'src/hooks/stores/useGetStores';
import AutoCompleteSelect from 'src/components/molecules/AutoCompleteSelect';
import useAddUser from 'src/hooks/users/useAddUser';

export const Route = createLazyFileRoute('/_auth/users/add-user')({
  component: AddUser,
});

function AddUser() {
  const { stores, storesIsLoading, search, setSearch } = useGetStores();
  const { formik, isLoading } = useAddUser();

  return (
    <DetailsTemplate
      title="Agregar Usuario"
      returnButtonProps={{ to: '/users', params: {} }}
    >
      <>
        <Stack spacing={4} mb={4}>
          <InputField
            id="email"
            name="email"
            label="Correo"
            type="email"
            formik={formik}
          />
          <InputField
            id="first_name"
            name="first_name"
            label="Nombre"
            type="text"
            formik={formik}
          />
          <InputField
            id="last_name"
            name="last_name"
            label="Apellido"
            type="text"
            formik={formik}
          />
          <InputField
            id="phone_number"
            name="phone_number"
            label="Numero de Telefono"
            type="phone"
            formik={formik}
          />
          <AutoCompleteSelect
            id="store"
            name="store"
            label={'Tienda'}
            items={apiItems(stores)}
            onSelectChange={option => {
              formik.setFieldValue('establishment_id', option.value);
            }}
            inputValue={search}
            setInputValue={setSearch}
            loading={storesIsLoading}
            error={!!formik.errors.establishment_id}
            errorMessage={userFormsValidations.select_store.required}
          />
        </Stack>
        <Button onClick={() => formik.handleSubmit()} isLoading={isLoading}>
          Agregar Usuario
        </Button>
      </>
    </DetailsTemplate>
  );
}

export default AddUser;
