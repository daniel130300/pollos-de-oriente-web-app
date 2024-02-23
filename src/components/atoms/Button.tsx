import { Button as MuiButton, ButtonProps } from "@mui/material"
import { forwardRef } from "react";

export const Button = forwardRef(
  <C extends React.ElementType>(
    props: ButtonProps<C, { component?: C }>,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    const { children, variant = 'contained', color, size, ...rest } = props;

    return (
      <MuiButton 
      variant={variant}
      color={color}
      size={size}
      {...rest}
      ref={ref} 
      >
        {children}
      </MuiButton>
    );
  }
);

export default Button;