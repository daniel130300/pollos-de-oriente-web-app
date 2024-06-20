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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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

  console.log('STORE INFO', store);

  return (
    <DetailsTemplate title='Editar Tienda' returnButtonProps={{to: '/stores', params: {}}}>
      <>
        <Card sx={{ px: 4, pb: 4 }}>
          <CardContent>
            <Typography variant="h2" gutterBottom>
              Informacion General
            </Typography>
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
                labelId="label-is_main"
                name="is_main"
                label="Principal" 
                items={selectItems}
                formik={formik}
              />
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ px: 4, pb: 4, zIndex: 1, position: 'relative', overflow: 'visible' }}>
          <CardContent>
            <Typography variant="h2">Productos</Typography>
            <Stack spacing={4}>
              {/* <List>
                {products.map((product, index) => (
                  <EditProductItem 
                    key={product.id}
                    index={index}
                    product={product}
                    productsList={products}
                    setProducts={setProducts}
                  />
                ))}
              </List>
              <Stack direction="row" spacing={2}>
                <AddProductItem 
                  productsList={products}
                  setProducts={setProducts}
                />
              </Stack> */}
            </Stack>
          </CardContent>
        </Card>
        <Button onClick={() => formik.handleSubmit()} isLoading={isLoading}>Editar Tienda</Button>
      </>
    </DetailsTemplate>
  );
};

export default EditStore;