import InputField from '../atoms/InputField'
import Typography from '@mui/material/Typography';
import { Link } from '@tanstack/react-router';
import useSignIn from '../../hooks/useSignIn';
import AuthFormTemplate from '../templates/AuthFormTemplate';

export const SignIn: React.FC = () => {

  const { formik, submitLoading, signInError } = useSignIn();

  return (
    <AuthFormTemplate 
      title="Iniciar Sesión"
      submitButtonText='Iniciar Sesión'
      onSubmit={formik.handleSubmit}
      submitLoading={submitLoading}
      errorText={signInError}
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
        <Link to='/'>Se te olvido tu contraseña?</Link>
      </Typography>
      <Typography>
        No tienes una cuenta? <Link to='/signup'>Crear Cuenta</Link>
      </Typography>
    </AuthFormTemplate>
  )
}

export default SignIn;