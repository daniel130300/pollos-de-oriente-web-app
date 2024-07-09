import { createLazyFileRoute } from '@tanstack/react-router';
import Stack from '@mui/material/Stack';
import InputField from 'src/components/atoms/InputField';
import { Button } from 'src/components/atoms/Button';
import Loader from 'src/components/atoms/Loader';
import ImageUploadCard from 'src/components/molecules/ImageUploadCard';
import useDeleteFile from 'src/hooks/common/useDeleteFile';
import { API_KEYS } from 'src/query/keys/queryConfig';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import Divider from 'src/components/atoms/Divider';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import EditProductItem from 'src/components/organisms/EditProductItem';
import AddProductItem from 'src/components/organisms/AddProductItem';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useGetCombo from 'src/hooks/combos/useGetCombo';
import useEditCombo from 'src/hooks/combos/useEditCombo';

export const Route = createLazyFileRoute('/_auth/combos/$id/edit')({
  component: EditCombo,
});

function EditCombo() {
  const { id } = Route.useParams();
  const { combo, comboIsLoading, comboIsFetching } = useGetCombo({
    id,
  });
  const {
    formik,
    isLoading,
    selectedFile,
    handleFileSelect,
    comboProduct,
    setComboProduct,
    handleSubmit,
  } = useEditCombo({
    id,
    combo,
  });

  const { mutate, isLoading: deleteImageIsLoading } = useDeleteFile();

  const handleDeleteImage = () => {
    mutate({
      id: combo.id,
      tableName: 'combos',
      bucket_id: combo.bucket_id,
      file_name: combo.file_name,
      invalidators: [API_KEYS.FETCH_COMBO],
    });
  };

  if (comboIsLoading) return <Loader type="cover" />;

  return (
    <DetailsTemplate
      title="Editar Combo"
      returnButtonProps={{ to: '/combos', params: {} }}
      gridSizes={{ xs: 10, sm: 10, md: 12 }}
    >
      <>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={6}>
            <Stack spacing={4} mb={4}>
              <InputField
                id="search_id"
                name="search_id"
                label="Id de busqueda"
                type="text"
                formik={formik}
              />
              <InputField
                id="name"
                name="name"
                label="Nombre"
                type="text"
                formik={formik}
              />
              <Divider />
              <Typography variant="h3">Productos Combo</Typography>
              <Stack spacing={4}>
                <List>
                  {comboProduct.map((product, index) => (
                    <EditProductItem
                      key={product.id}
                      index={index}
                      product={product}
                      productsList={comboProduct}
                      setProducts={setComboProduct}
                      isCombo={true}
                    />
                  ))}
                </List>
                <Stack direction="row" spacing={2}>
                  <AddProductItem
                    productsList={comboProduct}
                    setProducts={setComboProduct}
                    isCombo={true}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <ImageUploadCard
              file={selectedFile}
              setSelectedFile={handleFileSelect}
              src={combo.imagePublicUrl}
              handleDelete={handleDeleteImage}
              loading={deleteImageIsLoading || comboIsFetching}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', mt: 4, justifyContent: 'end' }}>
          <Button onClick={() => handleSubmit()} isLoading={isLoading}>
            Editar Combo
          </Button>
        </Box>
      </>
    </DetailsTemplate>
  );
}

export default EditCombo;
