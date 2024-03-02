import { createLazyFileRoute } from '@tanstack/react-router'
import { Grid, Stack, Typography } from "@mui/material";
import InputField from '../../../components/atoms/InputField';
import useUpdatePassword from '../../../hooks/auth/useUpdatePassword';
import Button from '../../../components/atoms/Button';

export const Route = createLazyFileRoute('/_auth/profile/update-password')({
  component: UpdatePassword
})

function UpdatePassword () {

  const { isLoading, formik } = useUpdatePassword();

  return (
    <Grid container>
      <Grid item xs={6} mx="auto">
      <Typography variant="h1" mb={2}>Cambiar Contraseña</Typography>
        <Stack spacing={3} mb={4}>
          <InputField
            id='password' 
            label='Password' 
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={
              formik.touched.password && Boolean(formik.errors.password)
            }
            helperText={formik.touched.password && formik.errors.password}
          />
          <InputField
            id='confirmPassword' 
            label='Confirm Password' 
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            error={
              formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
            }
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
        </Stack>
        <Button onClick={() => formik.handleSubmit()} isLoading={isLoading}>Cambiar Contraseña</Button>
      </Grid>
    </Grid>
  )
}