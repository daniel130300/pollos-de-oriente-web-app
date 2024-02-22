import { useState, ChangeEvent } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import InputFileUpload from "../atoms/ImageUpload";
import DynamicImage from "../atoms/DynamicImage";
import Box from "@mui/material/Box";

const ImageUploadCard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const renderUploadedState = () => (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <DynamicImage
          height={300}
          src={selectedFile ? URL.createObjectURL(selectedFile) : '/src/assets/placeholder-image.jpeg'}
          alt="Uploaded"
          loadingHeight={{ sm: 300 }}
        />
      </Grid>
      <InputFileUpload onChange={handleUploadClick} label="Subir Imagen" />
    </Grid>
  );

  return (
    <div>
      <Card sx={{p: 4}}>
        {renderUploadedState()}
      </Card>
    </div>
  );
};

export default ImageUploadCard;