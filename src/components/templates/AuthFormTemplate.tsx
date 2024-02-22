import Stack from '@mui/material/Stack';
import Button from '../atoms/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import Logo from '../atoms/Logo';

interface AuthFormTemplateProps {
  title: string;
  submitButtonText: string;
  onSubmit: () => void; 
  submitLoading: boolean; 
  children: React.ReactNode
}

export const AuthFormTemplate: React.FC<AuthFormTemplateProps> = ({ 
  title, 
  submitButtonText, 
  onSubmit, 
  submitLoading, 
  children 
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
      <Card sx={{width: '100%', maxWidth: {xs: 260, sm: 400}, p: {xs: 4, sm: 8}}}>
        <Logo sx={{ width: 80, height: 80, mb: 2, mx: 'auto' }}/>
        <Typography variant='h1' sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4}}>
          {title}
        </Typography>
        <Stack spacing={3}>
          {children}
          <Button disabled={submitLoading} onClick={onSubmit}>{!submitLoading ? submitButtonText : 'Cargando...'}</Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default AuthFormTemplate;