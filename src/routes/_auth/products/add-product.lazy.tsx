import { createLazyFileRoute } from '@tanstack/react-router'
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import useProductForm from "../../../hooks/products/useProductForm";
import ImageUploadCard from '../../../components/molecules/ImageUpload';
import InputField from '../../../components/atoms/InputField';
import { Button } from '../../../components/atoms/Button';
import SelectField from '../../../components/atoms/SelectField';
import ReturnButton from '../../../components/molecules/ReturnButton';

export const Route = createLazyFileRoute('/_auth/products/add-product')({
  component: AddProduct
})

const selectItems = [
  {label: "Unidad", value:"unidad"},
  {label: "Libra", value: "libra"}
];

function AddProduct () {
  const {
    formik,
    selectedFile,
    handleFileSelect,
    isLoading
  } = useProductForm();

  return (
    <Grid container>
      <Grid item xs={6} mx="auto">
        <ReturnButton to='/products' params={{}}/>
        <Typography variant="h1" mb={2}>Agregar Producto</Typography>
        <Stack spacing={3} mb={4}>
          <ImageUploadCard file={selectedFile} setSelectedFile={handleFileSelect}/>
          <InputField 
            id="name"
            label="Nombre" 
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={
              formik.touched.name && Boolean(formik.errors.name)
            }
            helperText={formik.touched.name && formik.errors.name}
          />
          <SelectField 
            id="unity" 
            labelId="label-unity"
            name="unity"
            label="Unidad" 
            selectItems={selectItems} 
            onChange={formik.handleChange}
            value={formik.values.unity}
            error={
              formik.touched.unity && Boolean(formik.errors.unity)
            }
            helperText={formik.touched.unity && formik.errors.unity}
          />
          <InputField 
            id="sale_price" 
            label="Precio de Venta" 
            type="number"
            onChange={formik.handleChange}
            value={formik.values.sale_price}
            error={
              formik.touched.sale_price && Boolean(formik.errors.sale_price)
            }
            helperText={formik.touched.sale_price && formik.errors.sale_price}
          />
          <InputField 
            id="purchase_price" 
            label="Precio de Compra" 
            type="number"
            onChange={formik.handleChange}
            value={formik.values.purchase_price}
            error={
              formik.touched.purchase_price && Boolean(formik.errors.purchase_price)
            }
            helperText={formik.touched.purchase_price && formik.errors.purchase_price}
          />
        </Stack>
        <Button onClick={() => formik.handleSubmit()} isLoading={isLoading}>Agregar Producto</Button>
      </Grid>
    </Grid>
  );
};

export default AddProduct;