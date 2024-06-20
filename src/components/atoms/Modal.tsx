import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { Modal as MuiModal } from '@mui/material';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useModalStore } from '../../zustand/useModalStore';
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
  const { open, handleClose, title, description, buttons } = useModalStore();

  return (
    <div>
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
            <CloseIcon
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                cursor: 'pointer',
              }}
              onClick={handleClose}
            />
            <Typography id="transition-modal-title" variant="h2" component="h2">
              {title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ my: 2 }}>
              {description}
            </Typography>
            {buttons}
          </Box>
        </Fade>
      </MuiModal>
    </div>
  );
}
