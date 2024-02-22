import InputField from '../atoms/InputField'
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from '@tanstack/react-router';
import useSignUp from '../../hooks/useSignUp';
import AuthFormTemplate from '../templates/AuthFormTemplate';
import Link from '@mui/material/Link';

export const SignUp: React.FC = () => {

  const { formik, submitLoading } = useSignUp();

  return (
    <AuthFormTemplate
      title="Crear Cuenta"
      submitButtonText='Crear Cuenta'
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
      <Typography>
        Ya tienes una cuenta? <Link component={RouterLink} to='/'>Iniciar Sesión</Link>
      </Typography>
    </AuthFormTemplate>
  )
}

export default SignUp;