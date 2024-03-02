import React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Loader: React.FC<CircularProgressProps> = ({
  ...rest
}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress {...rest}/>
    </Box>
  );
};

export default Loader;