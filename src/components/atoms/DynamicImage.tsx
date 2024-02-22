import React, { useState } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

type SkeletonSize = {
  xs?: string | number;
  sm?: string | number;
  md?: string | number;
  lg?: string | number;
  xl?: string | number;
};

export interface DynamicCardMediaProps
  extends React.HTMLProps<HTMLImageElement> {
  loadingHeight?: SkeletonSize;
  loadingWidth?: SkeletonSize;
  maxHeight?: string;
}

export const AppDynamicImage: React.FC<DynamicCardMediaProps> = ({
  src,
  alt,
  loadingHeight = '100%',
  loadingWidth = '100%',
  maxHeight,
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
        height: "100%",
        maxHeight: maxHeight || "inherit",
        overflow: "hidden",
      }}
    >
      {loading && (
        <Skeleton
          variant="rectangular"
          sx={{
            height: loadingHeight,
            width: loadingWidth
          }}
          animation="wave"
        />
      )}
      <img
        src={src}
        alt={alt}
        style={{
          width: rest.width ? rest.width : "100%",
          height: rest.height ? rest.height : "100%",
          objectFit: "cover",
          display: loading ? "none" : "block",
        }}
        onLoad={handleImageLoad}
        {...rest}
      />
    </Box>
  );
};

export default AppDynamicImage;
