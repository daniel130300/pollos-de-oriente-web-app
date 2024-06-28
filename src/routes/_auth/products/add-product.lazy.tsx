import { useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import Stack from '@mui/material/Stack';
import useAddProduct from 'src/hooks/products/useAddProduct';
import ImageUploadCard from 'src/components/molecules/ImageUploadCard';
import InputField from 'src/components/atoms/InputField';
import Button from 'src/components/atoms/Button';
import DetailsTemplate from 'src/components/templates/DetailsTemplate';
import SelectField from 'src/components/atoms/SelectField';
import {
  establishmentItems,
  inventorySubtractionItems,
} from 'src/constants/selectItems';
import useGetExpenseCategories from 'src/hooks/expense-category/useGetExpenseCategories';
import { apiItems } from 'src/constants/selectItems';
import AutoCompleteSelect from 'src/components/molecules/AutoCompleteSelect';
import Checkbox from 'src/components/atoms/Checkbox';
import Divider from 'src/components/atoms/Divider';
import Typography from '@mui/material/Typography';
import { EditableProductDetail } from 'src/hooks/products/interface';
import { AddDetailProductItem } from 'src/components/organisms/AddDetailProductItem';
import EditDetailProductItem from 'src/components/organisms/EditDetailProductItem';
import List from '@mui/material/List';
import { productFormsValidations } from 'src/constants';

export const Route = createLazyFileRoute('/_auth/products/add-product')({
  component: AddProduct,
});

function AddProduct() {
  const {
    formik,
    selectedFile,
    handleFileSelect,
    isLoading,
    hasProductDetail,
    handleHasProductDetail,
  } = useAddProduct();

  const {
    expenseCategories,
    expenseCategoriesIsLoading,
    search: expenseCategorySearch,
    setSearch: setExpenseCategorySearch,
  } = useGetExpenseCategories();

  const [productDetail, setProductDetail] = useState<EditableProductDetail[]>(
    [],
  );
  const handleSubmit = () => {
    formik.setValues({ ...formik.values, product_detail: productDetail });
    formik.handleSubmit();
  };

  return (
    <DetailsTemplate
      title="Agregar Producto"
      returnButtonProps={{ to: '/products', params: {} }}
    >
      <>
        <Stack spacing={4} mb={4}>
          <ImageUploadCard
            file={selectedFile}
            setSelectedFile={handleFileSelect}
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
            errorMessage={productFormsValidations.expense_category_id.required}
            error={!!formik.errors.expense_category_id}
          />
          <Checkbox
            id="has_product_detail"
            name="has_product_detail"
            label="Es equivalente a otros productos?"
            checked={hasProductDetail}
            onChange={e => handleHasProductDetail(e.target.checked)}
          />
          {hasProductDetail && (
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
          Agregar Producto
        </Button>
      </>
    </DetailsTemplate>
  );
}

export default AddProduct;
