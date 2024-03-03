import { createLazyFileRoute } from '@tanstack/react-router'
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from '@tanstack/react-router';
import useSignUp from 'src/hooks/auth/useSignUp';
import Link from '@mui/material/Link';
import AuthFormTemplate from 'src/components/templates/AuthFormTemplate';
import InputField from 'src/components/atoms/InputField';

export const Route = createLazyFileRoute('/_no_auth/signup')({
  component: SignUp
})

function SignUp () {
  const { formik, isLoading } = useSignUp();

  return (
    <AuthFormTemplate
      title="Crear Cuenta"
      submitButtonText='Crear Cuenta'
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
        name="password"
        label='Contraseña'
        type='password'
        formik={formik}
      />
      <Typography>
        Ya tienes una cuenta? <Link component={RouterLink} to='/'>Iniciar Sesión</Link>
      </Typography>
    </AuthFormTemplate>
  )
}