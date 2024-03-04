import React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoaderProps extends CircularProgressProps {
  type?: 'cover' | 'default'
}

export const Loader: React.FC<LoaderProps> = ({
  type = 'default',
  ...rest
}) => {
  switch (type) {
    case 'cover':
      return (
        <Box sx={{position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255, 255, 255, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999}}>
          <CircularProgress {...rest}/>
        </Box>
      );
    case 'default':
    default:
      return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <CircularProgress {...rest}/>
        </Box>
      );
  }
};

export default Loader;