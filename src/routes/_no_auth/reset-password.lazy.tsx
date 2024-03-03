import { createLazyFileRoute } from '@tanstack/react-router'
import { Typography } from "@mui/material";
import AuthFormTemplate from "src/components/templates/AuthFormTemplate"
import useResetPassword from "src/hooks/auth/useResetPassword"
import { Link as RouterLink } from "@tanstack/react-router";
import Link from '@mui/material/Link'
import InputField from 'src/components/atoms/InputField';

export const Route = createLazyFileRoute('/_no_auth/reset-password')({
  component: ResetPassword
})

function ResetPassword () {

  const { formik, isLoading } = useResetPassword();

  return (
    <AuthFormTemplate
      title="Reestablecer Contraseña"
      submitButtonText="Reestablecer Contraseña"
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
      <Typography align='left'>
        Regresar a <Link component={RouterLink} to='/signin'>Iniciar Sesión</Link>
      </Typography>
    </AuthFormTemplate>
  )
}