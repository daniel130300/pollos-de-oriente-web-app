import { createLazyFileRoute } from '@tanstack/react-router';
import Stack from '@mui/material/Stack';
import InputField from 'src/components/atoms/InputField';
import Button from 'src/components/atoms/Button';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import {
  apiItems,
  roleFormsValidations,
  userFormsValidations,
} from 'src/constants';
import useGetStores from 'src/hooks/stores/useGetStores';
import AutoCompleteSelect from 'src/components/molecules/AutoCompleteSelect';
import useAddUser from 'src/hooks/users/useAddUser';
import usGetRoles from 'src/hooks/roles/useGetRoles';

export const Route = createLazyFileRoute('/_auth/users/add-user')({
  component: AddUser,
});

function AddUser() {
  const {
    stores,
    storesIsLoading,
    search: storeSearch,
    setSearch: setStoreSearch,
  } = useGetStores();

  const {
    roles,
    rolesIsLoading,
    search: roleSearch,
    setSearch: setRoleSearch,
  } = usGetRoles();

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
            label="Tienda"
            items={apiItems(stores)}
            onSelectChange={option => {
              formik.setFieldValue('establishment_id', option.value);
            }}
            inputValue={storeSearch}
            setInputValue={setStoreSearch}
            loading={storesIsLoading}
            error={!!formik.errors.establishment_id}
            errorMessage={userFormsValidations.select_store.required}
          />
          <AutoCompleteSelect
            id="role"
            name="role"
            label="Rol"
            items={apiItems(roles)}
            onSelectChange={option => {
              formik.setFieldValue('role_id', option.value);
            }}
            inputValue={roleSearch}
            setInputValue={setRoleSearch}
            loading={rolesIsLoading}
            error={!!formik.errors.role_id}
            errorMessage={roleFormsValidations.select_role.required}
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
