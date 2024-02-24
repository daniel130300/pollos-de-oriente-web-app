import { createLazyFileRoute } from '@tanstack/react-router'
import { Typography } from "@mui/material";
import AuthFormTemplate from "../../components/templates/AuthFormTemplate"
import useResetPassword from "../../hooks/useResetPassword"
import { Link as RouterLink } from "@tanstack/react-router";
import Link from '@mui/material/Link'
import InputField from '../../components/atoms/InputField';

export const Route = createLazyFileRoute('/_no_auth/reset-password')({
  component: ResetPassword
})

function ResetPassword () {

  const { formik, submitLoading } = useResetPassword();

  return (
    <AuthFormTemplate
      title="Reestablecer Contraseña"
      submitButtonText="Reestablecer Contraseña"
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
      <Typography align='left'>
        Regresar a <Link component={RouterLink} to='/signin'>Iniciar Sesión</Link>
      </Typography>
    </AuthFormTemplate>
  )
}