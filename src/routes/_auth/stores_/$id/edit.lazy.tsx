import { useEffect } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router'
import Stack from "@mui/material/Stack";
import InputField from 'src/components/atoms/InputField';
import { Button } from 'src/components/atoms/Button';
import SelectField from 'src/components/atoms/SelectField';
import Loader from 'src/components/atoms/Loader';
import useEditStore from 'src/hooks/stores/useEditStore';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import useGetStore from 'src/hooks/stores/useGetStore';

export const Route = createLazyFileRoute('/_auth/stores/$id/edit')({
  component: EditStore
})

const selectItems = [
  {label: "Si", value: true},
  {label: "No", value: false}
];

function EditStore () {
  const { id } = Route.useParams();
  const { store, storeIsLoading, storeIsError } = useGetStore({id})
  const { formik, isLoading } = useEditStore({id})

  useEffect(() => {
    if (!storeIsLoading && !storeIsError) {
      formik.setValues({
        name: store.name,
        is_main: store.is_main
      })
    }
  }, [store, storeIsError, storeIsLoading])

  if (storeIsLoading) return <Loader type='cover'/>

  return (
    <DetailsTemplate title='Editar Tienda' returnButtonProps={{to: '/stores', params: {}}}>
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
            id="is_main" 
            name="is_main"
            label="Principal" 
            items={selectItems}
            formik={formik}
          />
        </Stack>
        <Button onClick={() => formik.handleSubmit()} isLoading={isLoading}>Editar Tienda</Button>
      </>
    </DetailsTemplate>
  );
};

export default EditStore;