import { Button, ButtonProps } from "@mui/material";
import { Link, LinkProps } from "@tanstack/react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type ReturnButtonProps = ButtonProps & LinkProps

const ReturnButton: React.FC<ReturnButtonProps> = (props) => {
  const {
    variant = 'contained',
    to,
    params,
    sx,
    ...rest
  } = props;

  return (
    <Button startIcon={<ArrowBackIcon />} component={Link} to={to} params={params} sx={{ mb: 2, px: 0, ...sx }} {...rest}>
      Regresar
    </Button>
  )
}

export default ReturnButton;