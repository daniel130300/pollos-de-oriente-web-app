import InputField from '../atoms/InputField'
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from '@tanstack/react-router';
import useSignIn from '../../hooks/useSignIn';
import AuthFormTemplate from '../templates/AuthFormTemplate';
import Link from '@mui/material/Link';

export const SignIn: React.FC = () => {

  const { formik, submitLoading } = useSignIn();

  return (
    <AuthFormTemplate 
      title="Iniciar Sesión"
      submitButtonText='Iniciar Sesión'
      onSubmit={formik.handleSubmit}
      submitLoading={submitLoading}
    >
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
        <Link component={RouterLink} to='/reset-password'>Se te olvido tu contraseña?</Link>
      </Typography>
      <Typography>
        No tienes una cuenta? <Link component={RouterLink} to='/signup'>Crear Cuenta</Link>
      </Typography>
    </AuthFormTemplate>
  )
}

export default SignIn;