import { ChangeEvent } from "react";
import Card from "@mui/material/Card";
import InputFileUpload from "../atoms/ImageUpload";
import DynamicImage from "../atoms/DynamicImage";
import { Button, Stack } from "@mui/material";

interface ImageUploadCardProps {
  file: File | null;
  setSelectedFile: (file: File | null) => void;
}

const ImageUploadCard: React.FC<ImageUploadCardProps> = ({
  file,
  setSelectedFile
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

  return (
    <Card sx={{p: 4}}>
      <DynamicImage
        src={file ? URL.createObjectURL(file) : '/src/assets/placeholder-image.jpeg'}
        alt="Uploaded"
        height="250px"
      />
      <Stack spacing={2} direction={"row"} mt={4} justifyContent={"center"}>
        <InputFileUpload onChange={handleUploadClick} label="Subir Imagen"/>
        {file && (
          <Button onClick={() => setSelectedFile(null)} color="error" variant="contained">
            Eliminar Imagen
          </Button>
        )}
      </Stack>
    </Card>
  );
};

export default ImageUploadCard;