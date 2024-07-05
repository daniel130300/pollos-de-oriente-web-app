import { createLazyFileRoute } from '@tanstack/react-router';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Loader from 'src/components/atoms/Loader';
import { formatTimestamp } from 'src/utils';
import Card from '@mui/material/Card';
import { DynamicImage } from 'src/components/atoms/DynamicImage';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
// import Divider from '@mui/material/Divider';
// import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import useGetCombo from 'src/hooks/combos/useGetCombo';

export const Route = createLazyFileRoute('/_auth/combos/$id')({
  component: ProductComponent,
});

function ProductComponent() {
  const { id } = Route.useParams();
  const { combo, comboIsLoading } = useGetCombo({ id });
  // const { productDetails, productDetailsIsLoading } = usetGetComboDetails({
  //   parent_product_id: id,
  // });

  if (comboIsLoading) return <Loader type="cover" />;

  return (
    <DetailsTemplate
      title="Detalle del Combo"
      returnButtonProps={{ to: '/combos', params: {} }}
      displaySubtitle={false}
      gridSizes={combo.imagePublicUrl ? { xs: 10, sm: 10, md: 12 } : undefined}
    >
      <Card sx={{ p: 4 }}>
        <Typography variant="h3" mb={4}>
          Información General
        </Typography>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={combo.imagePublicUrl ? 6 : 12}>
            <Stack spacing={4}>
              <Typography variant="body1">Id: {combo.id}</Typography>
              <Typography variant="body1">
                Id de Busqueda: {combo.search_id}
              </Typography>
              <Typography variant="body1">Nombre: {combo.name}</Typography>
              <Typography variant="body1">
                Creado: {formatTimestamp(combo.created_at)}
              </Typography>
              <Typography variant="body1">
                Actualizado: {formatTimestamp(combo.updated_at)}
              </Typography>
              {/* {productDetails.length > 0 && (
                <>
                  <Divider />
                  <Typography variant="h3">Productos Relacionados</Typography>
                  {productDetails.map((productDetail: any) => (
                    <ListItemText
                      key={productDetail.id}
                      primary={`Nombre: ${productDetail.products.name}, Cantidad: ${productDetail.arithmetic_quantity}`}
                      disableTypography
                    />
                  ))}
                </>
              )} */}
            </Stack>
          </Grid>
          {combo.imagePublicUrl && (
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="h3" mb={4} align="center">
                Imagen
              </Typography>
              <DynamicImage src={combo.imagePublicUrl} />
            </Grid>
          )}
        </Grid>
      </Card>
    </DetailsTemplate>
  );
}

export default ProductComponent;