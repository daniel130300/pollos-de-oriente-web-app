import Typography from "@mui/material/Typography";
import InputField from "../atoms/InputField";
import SelectField from "../atoms/SelectField";
import Stack from "@mui/material/Stack";
import ImageUploadCard from "../molecules/ImageUpload";
import Grid from "@mui/material/Grid";
import { Button } from "../atoms/Button";
import useProductForm from "../../hooks/useProductForm";

const selectItems = [
  {label: "Unidad", value:"unidad"},
  {label: "Libra", value: "libra"}
];

export const AddProduct = () => {
  
  const { formik } = useProductForm();

  return (
    <>
      <Grid container spacing={4} my="auto">
        <Grid item xs={8} m="auto">
          <Typography variant="h1" mb={2}>Agregar Producto</Typography>
          <Stack spacing={3}>
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
        </Grid>

        <Grid item xs={4} my="auto">
          <ImageUploadCard />
        </Grid>
      </Grid>
      <Button onClick={() => formik.handleSubmit()}>Agregar Producto</Button>
    </>
  );
};

export default AddProduct;