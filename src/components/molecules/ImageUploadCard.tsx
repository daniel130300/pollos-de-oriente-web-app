import { ChangeEvent } from 'react';
import Card from '@mui/material/Card';
import InputFileUpload from 'src/components/atoms/InputFileUpload';
import DynamicImage from 'src/components/atoms/DynamicImage';
import { Button, Stack } from '@mui/material';

interface ImageUploadCardProps {
  file: File | null;
  setSelectedFile: (file: File | null) => void;
  defaultSrc?: string;
  src?: string;
  uploadText?: string;
  deleteText?: string;
  handleDelete?: () => void;
  loading?: boolean;
}

const ImageUploadCard: React.FC<ImageUploadCardProps> = ({
  file,
  setSelectedFile,
  defaultSrc = '/placeholder-image.jpeg',
  src,
  uploadText = 'Subir Imagen',
  deleteText = 'Eliminar Imagen',
  handleDelete,
  loading = false,
}) => {
  const handleUploadClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile(file);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDeleteClick = () => {
    if (file) {
      setSelectedFile(null);
      return;
    }

    if (handleDelete) {
      handleDelete();
      return;
    }
  };

  return (
    <Card sx={{ p: 4 }}>
      <DynamicImage
        src={file ? URL.createObjectURL(file) : src || defaultSrc}
        alt="Uploaded"
        loading={loading}
      />
      <Stack spacing={2} direction={'row'} mt={4} justifyContent={'center'}>
        <InputFileUpload onChange={handleUploadClick} label={uploadText} />
        {(file || src) && (
          <Button onClick={handleDeleteClick} color="error" variant="contained">
            {deleteText}
          </Button>
        )}
      </Stack>
    </Card>
  );
};

export default ImageUploadCard;
