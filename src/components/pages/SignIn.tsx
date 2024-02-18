import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import InputField from '../atoms/InputField'
import Stack from '@mui/material/Stack';
import Button from '../atoms/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from '@tanstack/react-router';
import * as yup from 'yup';
import { useFormik } from 'formik';
import FormHelperText from '@mui/material/FormHelperText';
import { Session } from '@supabase/supabase-js';
import LinearProgress from '@mui/material/LinearProgress';

export const SignIn: React.FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null)
  const [authLoading, setAuthLoading] = useState(true);

  const userSchema = yup.object().shape({
    email: yup.string().email('El correo debe ser valido').required('El correo es un campo requerido'),
    password: yup.string().required().min(8, 'La contraseña debe contener al menos 8 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'La contraseña debe contener al menos una letra mayuscula, una letra minuscula, un numero y un caracter especial')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      setSubmitLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email: values.email, password: values.password })
      if (error) {
        setSignInError(error.message);
      }
      setSubmitLoading(false);
    },
    enableReinitialize: true
  })

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setAuthLoading(false);
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
      {authLoading ? <LinearProgress/> : (
        <>
          {session ? <Typography>Logged In!</Typography> : (
            <Card sx={{width: '100%', maxWidth: 400, p: 8}}>
              <Typography variant='h4' sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                Iniciar Sesión
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
                <Typography align='right'>
                  <Link to='/'>Se te olvido tu contraseña?</Link>
                </Typography>
                {signInError && <FormHelperText error>{signInError}</FormHelperText>}
                <Button disabled={submitLoading} onClick={() => formik.handleSubmit()}>{!submitLoading ? 'Iniciar Sesión' : 'Cargando...'}</Button>
                <Typography>
                  No tienes una cuenta? <Link to='/signup'>Crear Cuenta</Link>
                </Typography>
              </Stack>
            </Card>
          )}
        </>
      )}
  </Box>
  )
}

export default SignIn;