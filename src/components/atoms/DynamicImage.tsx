import React, { useState } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";


export const DynamicImage: React.FC<React.HTMLProps<HTMLImageElement>> = ({
  src,
  alt,
  height,
  width,
  ...rest
}) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%"
      }}
    >
      {loading && (
        <Skeleton
          variant="rectangular"
          sx={{
            height,
            width
          }}
          animation="wave"
        />
      )}
      <img
        src={src}
        alt={alt}
        style={{
          objectFit: "cover",
          display: loading ? "none" : "block",
          margin: "auto",
          height: height,
          width: width
        }}
        onLoad={handleImageLoad}
        {...rest}
      />
    </Box>
  );
};

export default DynamicImage;