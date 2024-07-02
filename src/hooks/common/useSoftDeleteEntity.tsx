import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from 'src/supabaseClient';
import { useModalStore } from 'src/stores/useModalStore';
import { generateTimestampTZ } from 'src/utils';
import { deleteModal } from 'src/constants';

type DeleteEntityOptions = {
  entityName: string;
  queryKey: string;
  successMessage: string;
  errorMessage: string;
  entityDisplayName?: string;
};

const useSoftDeleteEntity = <T extends { id: string; name: string }>({
  entityName,
  queryKey,
  successMessage,
  errorMessage,
  entityDisplayName,
}: DeleteEntityOptions) => {
  const [entityToDelete, setEntityToDelete] = useState<T | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { handleOpen, handleClose } = useModalStore();

  const { isPending, mutate } = useMutation({
    mutationFn: async (entity: T) => {
      const { data } = await supabase
        .from(entityName)
        .update({ deleted_at: generateTimestampTZ() })
        .eq('id', entity.id)
        .throwOnError();
      return data;
    },
    onSuccess: () => {
      setEntityToDelete(null);
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      handleClose();
      enqueueSnackbar(successMessage, { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar(errorMessage, { variant: 'error' });
    },
  });

  useEffect(() => {
    if (!entityToDelete || !entityDisplayName) return;

    handleOpen(
      deleteModal({
        entity: entityDisplayName,
        name: entityToDelete.name,
        handleClose: () => handleClose(),
        handleDelete: () => mutate(entityToDelete),
        isLoading: isPending,
      }),
    );
  }, [entityToDelete, isPending]);

  return {
    entityToDelete,
    setEntityToDelete,
    mutate,
    isLoading: isPending,
  };
};

export default useSoftDeleteEntity;
