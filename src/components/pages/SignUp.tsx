import { useState } from 'react'
import { supabase } from '../../supabaseClient'
import InputField from '../atoms/InputField'
import Stack from '@mui/material/Stack';
import Button from '../atoms/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from '@tanstack/react-router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormHelperText from '@mui/material/FormHelperText';

const userSchema = yup.object().shape({
  email: yup.string().email('El correo debe ser valido').required('El correo es un campo requerido'),
  password: yup.string().required().min(8, 'La contraseña debe contener al menos 8 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'La contraseña debe contener al menos una letra mayuscula, una letra minuscula, un numero y un caracter especial')
});

export const SignUp: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email: values.email, password: values.password })
      if (error) {
       setSignUpError(error.message)
      }
      setLoading(false);
      navigate({to: '/'});
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
          <InputField 
            id='email' 
            label='Correo' 
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={
              formik.touched.email && Boolean(formik.errors.email)
            }
            helperText={formik.touched.email && formik.errors.email}
          />
          <InputField 
            id='password' 
            label='Contraseña' 
            type='password'
            onChange={formik.handleChange}
            value={formik.values.password}
            error={
              formik.touched.password && Boolean(formik.errors.password)
            }
            helperText={formik.touched.password && formik.errors.password}
          />
          {signUpError && <FormHelperText error>{signUpError}</FormHelperText>}
          <Button disabled={loading} onClick={() => formik.handleSubmit()}>{!loading ? 'Crear Cuenta' : 'Cargando...'}</Button>
          <Typography>
            Ya tienes una cuenta? <Link to='/'>Iniciar Sesión</Link>
          </Typography>
        </Stack>
      </Card>
    </Box>
  )
}

export default SignUp;