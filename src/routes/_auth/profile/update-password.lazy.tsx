import { createLazyFileRoute } from '@tanstack/react-router';
import { Grid, Stack, Typography } from '@mui/material';
import InputField from 'src/components/atoms/InputField';
import useUpdatePassword from 'src/hooks/auth/useUpdatePassword';
import Button from 'src/components/atoms/Button';

export const Route = createLazyFileRoute('/_auth/profile/update-password')({
  component: UpdatePassword,
});

function UpdatePassword() {
  const { isLoading, formik } = useUpdatePassword();

  return (
    <Grid container>
      <Grid item xs={8} mx="auto">
        <Typography variant="h1" mb={2}>
          Cambiar Contraseña
        </Typography>
        <Stack spacing={4} mb={4}>
          <InputField
            id="password"
            name="password"
            label="Password"
            type="password"
            formik={formik}
          />
          <InputField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            formik={formik}
          />
        </Stack>
        <Button onClick={() => formik.handleSubmit()} isLoading={isLoading}>
          Cambiar Contraseña
        </Button>
      </Grid>
    </Grid>
  );
}
