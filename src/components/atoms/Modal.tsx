import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { Modal as MuiModal } from '@mui/material';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useModalStore } from '../zustand/useModalStore';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Modal() {
  const { open, handleOpen, handleClose } = useModalStore();

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <MuiModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <CloseIcon sx={{position: 'absolute', top: 10, right: 10, cursor: 'pointer'}} onClick={handleClose}/>
            <Typography id="transition-modal-title" variant="h2" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </MuiModal>
    </div>
  );
}