import React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Loader: React.FC<CircularProgressProps> = ({
  ...rest
}) => {
  return (
    <Box sx={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <CircularProgress {...rest}/>
    </Box>
  );
};

export default Loader;