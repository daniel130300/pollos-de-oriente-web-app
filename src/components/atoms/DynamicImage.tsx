import React, { useState } from "react";
import Box, {BoxProps} from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

interface DynamicImageProps extends BoxProps<any>{
  loading?: boolean;
}

export const DynamicImage: React.FC<DynamicImageProps> = ({
  src,
  alt,
  height,
  width,
  loading = false,
  ...rest
}) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%"
      }}
    >
      {(imageLoading || loading) && (
        <Skeleton
          variant="rectangular"
          sx={{height: {xs: 100, sm: 200, md: 300}}}
          animation="wave"
        />
      )}
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          objectFit: "cover",
          display: (imageLoading || loading) ? "none" : "block",
          margin: "auto",
          height: {xs: 100, sm: 200, md: 300}
        }}
        onLoad={handleImageLoad}
        {...rest}
      />
    </Box>
  );
};

export default DynamicImage;