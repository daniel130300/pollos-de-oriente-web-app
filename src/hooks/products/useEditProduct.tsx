import { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  productFormsValidations,
  productSnackbarMessages,
} from 'src/constants';
import {
  findElementsToDelete,
  generateFilename,
  generateTimestampTZ,
} from 'src/utils';
import { supabase } from 'src/supabaseClient';
import { useEditEntity } from '../common/useEditEntity';
import { EditableProductDetail, Product } from './interface';
import useGetProductDetails from './useGetProductDetail';
type EditProduct = Omit<Product, 'id'> & {
  has_product_detail: boolean;
  product_detail: EditableProductDetail[];
};

const useEditProduct = ({
  id,
  product,
}: {
  id: string;
  product: EditProduct;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [productDetail, setProductDetail] = useState<EditableProductDetail[]>(
    [],
  );

  const { productDetails, productDetailsIsLoading } = useGetProductDetails({
    parentProductId: id,
  });

  useEffect(() => {
    if (product && productDetails && !productDetailsIsLoading) {
      formik.setValues({
        name: product.name,
        product_image: null,
        bucket_id: product.bucket_id,
        file_name: product.file_name,
        search_id: product.search_id,
        inventory_subtraction: product.inventory_subtraction,
        can_be_purchased_only: product.can_be_purchased_only,
        expense_category_id: product.expense_category_id,
        has_product_detail: productDetails?.length > 0,
        product_detail: productDetails || [],
      });
    }
  }, [product, productDetailsIsLoading, productDetails]);

  useEffect(() => {
    if (productDetails && !productDetailsIsLoading) {
      const reformattedProductDetails = productDetails.map((detail: any) => ({
        id: detail.products.id,
        name: detail.products.name,
        arithmetic_quantity: detail.arithmetic_quantity,
        editable: false,
      }));

      setProductDetail(reformattedProductDetails);
    }
  }, [productDetails, productDetailsIsLoading]);

  const productSchema = yup.object().shape({
    search_id: yup
      .string()
      .required(productFormsValidations.search_id.required),
    name: yup.string().required(productFormsValidations.name.required),
    can_be_purchased_only: yup
      .string()
      .required(productFormsValidations.can_be_purchased_only.required),
    inventory_subtraction: yup
      .string()
      .required(productFormsValidations.inventory_subtraction.required),
    expense_category_id: yup
      .string()
      .required(productFormsValidations.expense_category_id.required),
    product_image: yup
      .mixed()
      .test('fileType', productFormsValidations.product_image, (value: any) => {
        if (!value) return true;
        if (typeof value === 'string') return true;
        return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
      })
      .nullable(),
  });

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    formik.setFieldValue('product_image', file);
  };

  const handleSubmit = () => {
    formik.setValues({ ...formik.values, product_detail: productDetail });
    formik.handleSubmit();
  };

  const mutationFn = async (values: EditProduct) => {
    if (values.product_image && values.product_image instanceof File) {
      const image_file_name = generateFilename(
        values.name,
        values.product_image,
      );

      const { data: image, error: imageError } = await supabase.storage
        .from('uploads')
        .upload(image_file_name, values.product_image);

      if (imageError) {
        throw imageError;
      }

      values.bucket_id = 'uploads';
      values.file_name = image.path;
    }

    const { product_image, has_product_detail, product_detail, ...rest } =
      values;

    const { data: productData } = await supabase
      .from('products')
      .update(rest)
      .eq('id', id)
      .select()
      .throwOnError();

    if (!has_product_detail && productDetail.length > 0) {
      const { data: productDetailData } = await supabase
        .from('product_details')
        .update({ deleted_at: generateTimestampTZ() })
        .eq('parent_product_id', id)
        .throwOnError();

      return { productData, productDetailData };
    }

    if (has_product_detail && product_detail.length !== 0) {
      const formattedProductDetail = product_detail.map(detail => ({
        parent_product_id: (productData as any)[0].id,
        child_product_id: detail.id,
        arithmetic_quantity: detail.arithmetic_quantity,
        deleted_at: null,
      }));

      const reformattedProductDetails = productDetails.map((detail: any) => ({
        parent_product_id: (productData as any)[0].id,
        child_product_id: detail.products.id,
        arithmetic_quantity: detail.arithmetic_quantity,
      }));

      const productDetailsToDelete = findElementsToDelete(
        formattedProductDetail,
        reformattedProductDetails,
      );

      const { data: productDetailData } = await supabase
        .from('product_details')
        .upsert([...formattedProductDetail, ...productDetailsToDelete])
        .select()
        .throwOnError();

      return { productData, productDetailData };
    }

    return { productData };
  };

  const { formik, isLoading } = useEditEntity<EditProduct>({
    id,
    initialValues: {
      name: '',
      product_image: null,
      bucket_id: null,
      file_name: null,
      can_be_purchased_only: '',
      inventory_subtraction: '',
      search_id: '',
      expense_category_id: '',
      has_product_detail: false,
      product_detail: [],
    },
    validationSchema: productSchema,
    successMessage: productSnackbarMessages.success.edit,
    errorMessage: productSnackbarMessages.errors.edit,
    onSuccessPath: '/products',
    mutationFn,
  });

  return {
    formik,
    selectedFile,
    handleFileSelect,
    isLoading,
    productDetail,
    setProductDetail,
    handleSubmit,
  };
};

export default useEditProduct;
