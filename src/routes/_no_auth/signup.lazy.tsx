import { createLazyFileRoute } from '@tanstack/react-router'
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from '@tanstack/react-router';
import useSignUp from '../../hooks/auth/useSignUp';
import Link from '@mui/material/Link';
import AuthFormTemplate from '../../components/templates/AuthFormTemplate';
import InputField from '../../components/atoms/InputField';

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
      <Typography>
        Ya tienes una cuenta? <Link component={RouterLink} to='/'>Iniciar Sesión</Link>
      </Typography>
    </AuthFormTemplate>
  )
}