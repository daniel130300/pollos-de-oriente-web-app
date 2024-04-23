import { createLazyFileRoute } from '@tanstack/react-router'
import { ColumnDef } from "@tanstack/react-table";
import usePagination from 'src/hooks/common/usePagination';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import Button from 'src/components/atoms/Button';
import { InputField } from 'src/components/atoms/InputField';
import TableUI from 'src/components/atoms/TableUI';
import { formatTimestamp, formatBooleanToStringLabel } from 'src/utils';
import { useNavigate } from '@tanstack/react-router';
import useGetStores from 'src/hooks/stores/useGetStores';
import useDeleteStore from 'src/hooks/stores/useDeleteStore';
import Loader from 'src/components/atoms/Loader';
import { useModalStore } from 'src/zustand/useModalStore';

export const Route = createLazyFileRoute('/_auth/stores/')({
  component: Stores
})

const columns: ColumnDef<any, any>[] = [
  { accessorKey: "id", header: "Id", cell: (store) => <span>{store.row.original.id}</span> },
  { accessorKey: "name", header: "Nombre", cell: (store) => <span>{store.row.original.name}</span>},
  { accessorKey: "is_main", header: "Principal", cell: (store) => <span>{formatBooleanToStringLabel(store.row.original.is_main)}</span>},
  { accessorKey: "created_at", header: "Creado", cell: (store) => <span>{formatTimestamp(store.row.original.created_at)}</span> },
  { accessorKey: "updated_at", header: "Actualizado", cell: (store) => <span>{formatTimestamp(store.row.original.updated_at)}</span> }
];

function Stores() {
  const navigate = useNavigate();
  const { 
    page, 
    handleChangePage,
    rowsPerPage, 
    handleChangeRowsPerPage
  } = usePagination();
  const { handleOpen, handleClose } = useModalStore();
  const [search, setSearch] = useState('');
  const { stores, storesIsLoading, storesCount, storesCountIsLoading } = useGetStores({page, rowsPerPage, search});
  const { mutate, isLoading, storeToDelete, setStoreToDelete } = useDeleteStore();

  const handleViewRow = (store: any) => {
    navigate({ to: '/stores/$id', params: { id: store.id } })
  }

  const handleEditRow = (store: any) => {
    navigate({ to: '/stores/$id/edit', params: { id: store.id } })
  }

  const handleDelete = (store: any) => {
    mutate(store);
  }

  const handleDeleteRow = (store: any) => {
    setStoreToDelete(store);
  }

  useEffect(() => {
    if(!storeToDelete) return;

    handleOpen({
      title: 'Eliminar Tienda', 
      description: `¿Estas seguro que deseas eliminar la siguiente tienda: ${storeToDelete.name}?`,
      buttons: <>
        {(isLoading) ? (
          <Loader />
        ) : (
          <Stack direction="row" spacing={1}>
            <Button onClick={() => handleClose()} color="action">Cancelar</Button>
            <Button onClick={() => handleDelete(storeToDelete)} color="error">Eliminar</Button>
          </Stack>
        )}
      </>
    });

  }, [isLoading, storeToDelete]);

  return (
    <>
      <Typography variant='h1'>Tiendas</Typography>
      <Box my={2}>
        <Stack spacing={2} direction={{xs:'column', sm: 'row'}} justifyContent="flex-end">
          <InputField 
            id="search" 
            name="search"
            label='Buscar por nombre de tienda' 
            type="text" 
            variant='outlined'
            size='small'
            sx={{minWidth: '300px'}}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button 
            endIcon={<AddCircleIcon/>} 
            sx={{mx: "auto", mb: 2}} 
            component={Link} 
            to='/stores/add-store'
          >
            Agregar Tienda
          </Button>
        </Stack>
      </Box>
      <TableUI
        data={stores || []}
        columns={columns}
        emptyText="No se encontraron tiendas"
        isFetching={storesIsLoading}
        page={page}
        handleChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        recordsCount={storesCount}
        recordsCountLoading={storesCountIsLoading}
        handleViewRow={handleViewRow}
        handleEditRow={handleEditRow}
        handleDeleteRow={handleDeleteRow}
      />
    </>
  );
};