import Typography from "@mui/material/Typography";
import InputField from "../atoms/InputField";
import SelectField from "../atoms/SelectField";
import Stack from "@mui/material/Stack";
import ImageUploadCard from "../molecules/ImageUpload";
import { Button } from "../atoms/Button";
import Grid from "@mui/material/Grid";
import useProductForm from "../../hooks/useProductForm";

const selectItems = [
  {label: "Unidad", value:"unidad"},
  {label: "Libra", value: "libra"}
];

export const AddProduct = () => {

  const {
    formik,
    selectedFile,
    handleFileSelect 
  } = useProductForm();

  return (
    <Grid container>
      <Grid item xs={6} mx="auto">
      <Typography variant="h1" mb={2}>Agregar Producto</Typography>
      <Stack spacing={3} mb={4}>
        <ImageUploadCard file={selectedFile} setSelectedFile={handleFileSelect}/> {/* Pass the handleFileSelect function */}
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
      <Button onClick={() => formik.handleSubmit()}>Agregar Producto</Button>
      </Grid>
    </Grid>
  );
};

export default AddProduct;