import { API_KEYS } from 'src/query/keys/queryConfig';
import { combosSnackbarMessages } from 'src/constants';
import useGetSingleEntity from 'src/hooks/common/useGetSingleEntity';
import { supabase } from 'src/supabaseClient';

const useGetCombo = ({ id }: { id: string }) => {
  const processData = (data: any) => {
    if (data.bucket_id && data.file_name) {
      const { data: image } = supabase.storage
        .from(data.bucket_id)
        .getPublicUrl(data.file_name);
      data.imagePublicUrl = image?.publicUrl;
    }
    return data;
  };

  const {
    isLoading: comboIsLoading,
    isFetching: comboIsFetching,
    isError: comboIsError,
    data: combo,
  } = useGetSingleEntity({
    id,
    entity: 'combos',
    queryKey: API_KEYS.FETCH_COMBO,
    snackbarMessages: combosSnackbarMessages,
    processData,
    selectStatement: `*, combo_products(product_id, quantity))`,
  });

  return {
    comboIsLoading,
    comboIsFetching,
    comboIsError,
    combo,
  };
};

export default useGetCombo;
