import { createLazyFileRoute } from '@tanstack/react-router'
import Stack from "@mui/material/Stack";
import useAddProduct from "src/hooks/products/useAddProduct";
import ImageUploadCard from 'src/components/molecules/ImageUploadCard';
import InputField from 'src/components/atoms/InputField';
import Button from 'src/components/atoms/Button';
import SelectField from 'src/components/atoms/SelectField';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';

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
  } = useAddProduct();

  return (
    <DetailsTemplate title='Agregar Producto' returnButtonProps={{to: '/products', params: {}}} >
      <>
        <Stack spacing={4} mb={4}>
          <ImageUploadCard 
            file={selectedFile} 
            setSelectedFile={handleFileSelect}
          />
          <InputField 
            id="name"
            name="name"
            label="Nombre"
            type="text"
            formik={formik}
          />
          <SelectField 
            id="unity" 
            labelId="label-unity"
            name="unity"
            label="Unidad" 
            selectItems={selectItems} 
            formik={formik}
          />
          <InputField 
            id="sale_price"
            name="sale_price"
            label="Precio de Venta" 
            type="number"
            formik={formik}
          />
          <InputField 
            id="purchase_price"
            name="purchase_price"
            label="Precio de Compra" 
            type="number"
            formik={formik}
          />
        </Stack>
        <Button onClick={() => formik.handleSubmit()} isLoading={isLoading}>Agregar Producto</Button>
      </>
    </DetailsTemplate>
  );
};

export default AddProduct;