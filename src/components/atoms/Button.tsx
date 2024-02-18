import { Button as MuiButton, ButtonProps } from "@mui/material"

export const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  color,
  size,
  children,
  ...rest
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      {...rest}
    >
      {children}
    </MuiButton>
  )
}

export default Button;