import { createLazyFileRoute } from '@tanstack/react-router';
import Stack from '@mui/material/Stack';
import InputField from 'src/components/atoms/InputField';
import { Button } from 'src/components/atoms/Button';
import useGetProduct from 'src/hooks/products/useGetProduct';
import Loader from 'src/components/atoms/Loader';
import useEditProduct from 'src/hooks/products/useEditProduct';
import ImageUploadCard from 'src/components/molecules/ImageUploadCard';
import useDeleteFile from 'src/hooks/common/useDeleteFile';
import { API_KEYS } from 'src/query/keys/queryConfig';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import { SelectField } from 'src/components/atoms/SelectField';
import AutoCompleteSelect from 'src/components/molecules/AutoCompleteSelect';
import {
  apiItems,
  establishmentItems,
  inventorySubtractionItems,
  productFormsValidations,
} from 'src/constants';
import useGetExpenseCategories from 'src/hooks/expense-category/useGetExpenseCategories';
import Checkbox from 'src/components/atoms/Checkbox';
import Divider from 'src/components/atoms/Divider';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import EditDetailProductItem from 'src/components/organisms/EditDetailProductItem';
import AddDetailProductItem from 'src/components/organisms/AddDetailProductItem';

export const Route = createLazyFileRoute('/_auth/products/$id/edit')({
  component: EditProduct,
});

function EditProduct() {
  const { id } = Route.useParams();
  const { product, productIsLoading, productIsFetching } = useGetProduct({
    id,
  });
  const {
    formik,
    isLoading,
    selectedFile,
    handleFileSelect,
    productDetail,
    setProductDetail,
    handleSubmit,
  } = useEditProduct({
    id,
    product,
  });

  const { mutate, isLoading: deleteImageIsLoading } = useDeleteFile();
  const {
    expenseCategories,
    expenseCategoriesIsLoading,
    search: expenseCategorySearch,
    setSearch: setExpenseCategorySearch,
  } = useGetExpenseCategories({
    searchTerm: product?.expense_categories?.name,
  });

  const handleDeleteImage = () => {
    mutate({
      id: product.id,
      tableName: 'products',
      bucket_id: product.bucket_id,
      file_name: product.file_name,
      invalidators: [API_KEYS.FETCH_PRODUCT],
    });
  };

  if (productIsLoading) return <Loader type="cover" />;

  return (
    <DetailsTemplate
      title="Editar Producto"
      returnButtonProps={{ to: '/products', params: {} }}
    >
      <>
        <Stack spacing={4} mb={4}>
          <ImageUploadCard
            file={selectedFile}
            setSelectedFile={handleFileSelect}
            src={product.imagePublicUrl}
            handleDelete={handleDeleteImage}
            loading={deleteImageIsLoading || productIsFetching}
          />
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
          <SelectField
            id="can_be_purchased_only"
            name="can_be_purchased_only"
            label="Solo se puede comprar en"
            items={establishmentItems}
            formik={formik}
          />
          <SelectField
            id="inventory_subtraction"
            name="inventory_subtraction"
            label="Se resta de manera"
            items={inventorySubtractionItems}
            formik={formik}
          />
          <>
            {expenseCategoriesIsLoading ? (
              <Loader />
            ) : (
              <AutoCompleteSelect
                id="expense_category_id"
                name="expense_category_id"
                label="Se ingresa como"
                items={apiItems(expenseCategories)}
                onSelectChange={option => {
                  formik.setFieldValue('expense_category_id', option.value);
                }}
                inputValue={expenseCategorySearch}
                setInputValue={setExpenseCategorySearch}
                loading={expenseCategoriesIsLoading}
                errorMessage={
                  productFormsValidations.expense_category_id.required
                }
                error={!!formik.errors.expense_category_id}
              />
            )}
          </>
          <Checkbox
            id="has_product_detail"
            name="has_product_detail"
            label="Es equivalente a otros productos?"
            formik={formik}
          />
          {formik.values.has_product_detail && (
            <>
              <Divider />
              <Typography variant="h3">Productos Relacionados</Typography>
              <Stack spacing={4}>
                <List>
                  {productDetail.map((product, index) => (
                    <EditDetailProductItem
                      key={product.id}
                      index={index}
                      product={product}
                      productsList={productDetail}
                      setProducts={setProductDetail}
                    />
                  ))}
                </List>
                <Stack direction="row" spacing={2}>
                  <AddDetailProductItem
                    productsList={productDetail}
                    setProducts={setProductDetail}
                  />
                </Stack>
              </Stack>
            </>
          )}
        </Stack>
        <Button onClick={() => handleSubmit()} isLoading={isLoading}>
          Editar Producto
        </Button>
      </>
    </DetailsTemplate>
  );
}

export default EditProduct;
