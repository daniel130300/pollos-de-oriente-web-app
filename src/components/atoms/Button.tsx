import {
  Button as MuiButton,
  ButtonProps,
  CircularProgress,
  Typography,
} from '@mui/material';
import { forwardRef } from 'react';

export const Button = forwardRef(
  <C extends React.ElementType>(
    props: ButtonProps<C, { component?: C }>,
    ref?: React.Ref<HTMLButtonElement>,
  ) => {
    const {
      children,
      variant = 'contained',
      isLoading = false,
      color,
      disabled,
      size,
      ...rest
    } = props;

    return (
      <MuiButton
        variant={variant}
        color={color}
        size={size}
        {...rest}
        ref={ref}
        disabled={isLoading || disabled}
      >
        {isLoading ? (
          <>
            <Typography variant="button" mr={2}>
              Cargando
            </Typography>
            <CircularProgress size={25} color="primary" />
          </>
        ) : (
          children
        )}
      </MuiButton>
    );
  },
);

export default Button;
