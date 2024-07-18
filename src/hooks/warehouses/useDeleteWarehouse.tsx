import { warehouseSnackbarMessages } from 'src/constants/snackbarMessages';
import { API_KEYS } from 'src/query/keys/queryConfig';
import { Warehouse } from './inteface';
import useSoftDeleteEntity from '../common/useSoftDeleteEntity';

const useDeleteWarehouse = () => {
  const {
    entityToDelete: warehouseToDelete,
    setEntityToDelete: setWarehouseToDelete,
    mutate,
    isLoading,
  } = useSoftDeleteEntity<Warehouse>({
    entityName: 'establishments',
    queryKey: API_KEYS.FETCH_WAREHOUSES,
    successMessage: warehouseSnackbarMessages.success.delete,
    errorMessage: warehouseSnackbarMessages.errors.delete,
    entityDisplayName: 'Bodega',
  });

  return {
    warehouseToDelete,
    setWarehouseToDelete,
    mutate,
    isLoading,
  };
};

export default useDeleteWarehouse;
