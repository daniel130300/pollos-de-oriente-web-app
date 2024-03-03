import { useEffect } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router'
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import InputField from 'src/components/atoms/InputField';
import { Button } from 'src/components/atoms/Button';
import SelectField from 'src/components/atoms/SelectField';
import ReturnButton from 'src/components/molecules/ReturnButton';
import useGetProduct from 'src/hooks/products/useGetProduct';
import Loader from 'src/components/atoms/Loader';
import useEditProduct from 'src/hooks/products/useEditProduct';

export const Route = createLazyFileRoute('/_auth/products/$id/edit')({
  component: EditProduct
})

const selectItems = [
  {label: "Unidad", value:"unidad"},
  {label: "Libra", value: "libra"}
];

function EditProduct () {
  const { id } = Route.useParams();

  const { product, productIsLoading, productIsError } = useGetProduct({id})
  const { formik, isLoading } = useEditProduct({id})

  useEffect(() => {
    if (!productIsLoading && !productIsError) {
      formik.setValues({
        name: product.name,
        purchase_price: product.purchase_price,
        sale_price: product.sale_price,
        unity: product.unity,
        product_image: null,
        bucket_id: product.bucket_id,
        file_name: product.file_name
      })
    }
  }, [productIsError, productIsLoading])

  if (productIsLoading) return <Loader/>

  return (
    <Grid container>
      <Grid item xs={6} mx="auto">
        <ReturnButton to='/products' params={{}}/>
        <Typography variant="h1" mb={2}>Editar Producto</Typography>
        <Stack spacing={3} mb={4}>
          {/* <ImageUploadCard 
            file={selectedFile} 
            setSelectedFile={handleFileSelect}
          /> */}
          <InputField 
            id="name"
            name="name"
            label="Nombre"
            type="text"
            formik={formik}
            defaultValue={product.name}
          />
          <SelectField 
            id="unity" 
            labelId="label-unity"
            name="unity"
            label="Unidad" 
            selectItems={selectItems} 
            formik={formik}
            defaultValue={product.unity}
          />
          <InputField 
            id="sale_price"
            name="sale_price"
            label="Precio de Venta" 
            type="number"
            formik={formik}
            defaultValue={product.sale_price}
          />
          <InputField 
            id="purchase_price"
            name="purchase_price"
            label="Precio de Compra" 
            type="number"
            formik={formik}
            defaultValue={product.purchase_price}
          />
        </Stack>
        <Button onClick={() => formik.handleSubmit()} isLoading={isLoading}>Editar Producto</Button>
      </Grid>
    </Grid>
  );
};

export default EditProduct;