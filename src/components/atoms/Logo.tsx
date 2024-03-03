import Avatar, { AvatarProps } from "@mui/material/Avatar"

export const Logo: React.FC<AvatarProps> = ({
  src = '/logo.jpeg',
  ...rest
}) => {
  return <Avatar alt="logo" src={src} {...rest} />
}

export default Logo;