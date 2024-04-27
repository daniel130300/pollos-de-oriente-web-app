import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from 'src/supabaseClient';
import { useMutation } from '@tanstack/react-query';
import { storeFormsValidations, storeSnackbarMessages } from 'src/constants';
import { Store } from  './interface';

type AddStore = Omit<Store, 'id'>;

const useAddStore = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const storeSchema = yup.object().shape({
    name: yup.string().required(storeFormsValidations.name.required),
    is_main: yup.boolean().required(storeFormsValidations.is_main.required),
  });

  const {
    isPending,
    mutate
  } = useMutation(
    {
      mutationFn: async(values: AddStore) => {
        const { products, ...rest } = values;
        const { data: storeData } = await supabase
                            .from('stores')
                            .insert([rest])
                            .select()
                            .throwOnError();

        if (values.products?.length === 0) return storeData;

        const insertProducts = products?.map((product) => ({
          store_id: storeData?.at(0).id,
          product_id: product.id,
          quantity: product.quantity,
          sale_price: product.sale_price
        }))

        const { data: productsData } = await supabase
                                      .from('store_products')
                                      .insert([insertProducts])
                                      .select()
                                      .throwOnError();
        
        return { storeData, productsData }
      },
      onSuccess: () => {
        enqueueSnackbar(storeSnackbarMessages.success.create, { variant: 'success' });
        navigate({ to: '/stores' });
      },
      onError: () => {
        enqueueSnackbar(storeSnackbarMessages.errors.create, { variant: 'error' });
      }
    }
  );

  const formik = useFormik<AddStore>({
    initialValues: {
      name: '',
      is_main: false,
      products: []
    },
    validationSchema: storeSchema,
    onSubmit: async (values) => {
      mutate(values);
    },
    enableReinitialize: true
  });

  return {
    formik,
    isLoading: isPending
  };
};

export default useAddStore;