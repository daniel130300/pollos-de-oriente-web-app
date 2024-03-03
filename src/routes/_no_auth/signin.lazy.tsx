import { createLazyFileRoute } from '@tanstack/react-router'
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from '@tanstack/react-router';
import useSignIn from 'src/hooks/auth/useSignIn';
import Link from '@mui/material/Link';
import AuthFormTemplate from 'src/components/templates/AuthFormTemplate';
import InputField from 'src/components/atoms/InputField';

export const Route = createLazyFileRoute('/_no_auth/signin')({
  component: SignIn
})

function SignIn() {
  const { formik, isLoading } = useSignIn();

  return (
    <AuthFormTemplate 
      title="Iniciar Sesión"
      submitButtonText='Iniciar Sesión'
      onSubmit={formik.handleSubmit}
      submitLoading={isLoading}
    >
      <InputField 
        id='email'
        name="email"
        label='Correo' 
        type="email"
        formik={formik}
      />
      <InputField 
        id='password'
        name='password' 
        label='Contraseña' 
        type='password'
        formik={formik}
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