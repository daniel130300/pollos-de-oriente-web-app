import { useState } from 'react'
import { supabase } from '../../supabaseClient'
import InputField from '../atoms/InputField'
import Stack from '@mui/material/Stack';
import Button from '../atoms/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from '@tanstack/react-router';
import { useFormik } from 'formik';
import { object, string } from 'yup';

const userSchema = object().shape({
  email: string().email().required(),
  password: string().required().min(8, 'Password must be at least 8 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character')
});

export default function Auth() {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userSchema, // Our Yup schema
    onSubmit: async (values) => {
      const { error } = await supabase.auth.signUp({ email: values.email, password: values.password })
      if (error) {
        alert(error.message)
      }
    },
    enableReinitialize: true
  })

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
      <Card sx={{width: '100%', maxWidth: 400, p: 8}}>
        <Typography variant='h4' sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          Crear Cuenta
        </Typography>

        <Stack spacing={3}>
          <InputField id='email' label='Email' variant='standard' type="email"/>
          <InputField id='password' label='Contraseña' variant='standard' type='password'/>
        </Stack>
          <Button sx={{width: '100%', my: 4}}>Crear Cuenta</Button>
          <Typography>
            Ya tienes una cuenta? <Link to='/'>Iniciar Sesión</Link>
          </Typography>
      </Card>
    </Box>
  )
}