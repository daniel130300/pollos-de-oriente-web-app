import Stack from "@mui/material/Stack"
import { Button } from "src/components/atoms/Button"
import Loader from "src/components/atoms/Loader"

export const deleteModal = ({
  entity, 
  name, 
  isLoading, 
  handleClose,
  handleDelete
} : {
  entity: string, 
  name: string, 
  isLoading: boolean, 
  handleClose: () => void, 
  handleDelete: (...args: any[]) => void
}) => {
  return {
    title: `Eliminar ${entity}`,
    description: `¿Estas seguro que deseas eliminar el siguiente producto: ${name}?`,
    buttons: (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <Stack direction="row" spacing={1}>
            <Button onClick={handleClose} color="action">Cancelar</Button>
            <Button onClick={handleDelete} color="error">Eliminar</Button>
          </Stack>
        )}
      </>
    )
  }
}