import { useSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "src/supabaseClient";
import { expenseCategorySnackbarMessages } from "src/constants/snackbarMessages";
import { useQueryClient } from "@tanstack/react-query";
import { API_KEYS } from "src/query/keys/queryConfig";
import { useState } from "react";
import { useModalStore } from "src/stores/useModalStore";
import { generateTimestampTZ } from "src/utils";
import { ExpenseCategory } from "./interface";

const useDeleteExpenseCategory = () => {
  const [expenseCategoryToDelete, setExpenseCategoryToDelete] = useState<null | any>(null);
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { handleClose } = useModalStore();
  
  const {
    isPending,
    mutate
  } = useMutation(
    {
      mutationFn: async(values: ExpenseCategory) => {
         const { data } = await supabase
                                .from('expense_categories')
                                .update({
                                  deleted_at: generateTimestampTZ()
                                })
                                .eq('id', values.id)
                                .select()
                                .throwOnError();
        return data;
      },
      onSuccess: () => {
        setExpenseCategoryToDelete(null);
        queryClient.invalidateQueries({queryKey: [API_KEYS.FETCH_EXPENSE_CATEGORIES]})
        handleClose();
        enqueueSnackbar(expenseCategorySnackbarMessages.success.delete, { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar(expenseCategorySnackbarMessages.errors.delete, { variant: 'error' });
      }
    }
  );

  return {
    expenseCategoryToDelete, 
    setExpenseCategoryToDelete,
    mutate,
    isLoading: isPending,
  };
};

export default useDeleteExpenseCategory;