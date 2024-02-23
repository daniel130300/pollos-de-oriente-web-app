import { SxProps, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface InputFileUploadProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  sx?: SxProps
}

export const InputFileUpload: React.FC<InputFileUploadProps> = ({ 
  onChange, 
  label = 'Subir Archivo',
  sx= {}
}) => {
  return (
    <label>
      <Button
        component="span"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={sx}
      >
        {label}
      </Button>
      <VisuallyHiddenInput type="file" onChange={onChange} />
    </label>
  );
}

export default InputFileUpload;