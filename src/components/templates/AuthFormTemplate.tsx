import Stack from '@mui/material/Stack';
import Button from '../atoms/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import React from 'react';

interface AuthFormTemplateProps {
  title: string;
  submitButtonText: string;
  onSubmit: () => void; 
  submitLoading: boolean; 
  errorText: string | null; 
  children: React.ReactNode
}

export const AuthFormTemplate: React.FC<AuthFormTemplateProps> = ({ 
  title, 
  submitButtonText, 
  onSubmit, 
  submitLoading, 
  errorText, 
  children 
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
      <Card sx={{width: '100%', maxWidth: 400, p: 8}}>
        <Typography variant='h4' sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {title}
        </Typography>
        <Stack spacing={3}>
          {children}
          {errorText && <FormHelperText error>{errorText}</FormHelperText>}
          <Button disabled={submitLoading} onClick={onSubmit}>{!submitLoading ? submitButtonText : 'Cargando...'}</Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default AuthFormTemplate;