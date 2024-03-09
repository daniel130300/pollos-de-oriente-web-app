import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton/IconButton";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import { Logo } from "../atoms/Logo";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { profileTopBarRoutes } from "src/constants/routes";
import useLogout from "src/hooks/auth/useLogout";
import useGetUser from "src/hooks/auth/useGetUser";

interface AppTopBarProps {
  isClosing: boolean;
  setMobileOpen: any;
  mobileOpen: boolean;
}

export const AppTopBar: React.FC<AppTopBarProps>  = ({
  isClosing, 
  setMobileOpen, 
  mobileOpen
})=> {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { mutateAsync } = useLogout();
  const { user } = useGetUser();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = async () => {
    handleCloseUserMenu()
    await mutateAsync();
  }

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const profileRoutes = profileTopBarRoutes({handleCloseUserMenu, handleLogOut});

  return (
    <AppBar
      position="fixed"
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
          <Logo/>
          <Typography
          variant="h1"
          noWrap
          component="a"
          sx={{
            ml: 2,
            flexGrow: 1,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Pollos de Oriente
        </Typography>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Perfil">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={(user?.email || '').toUpperCase()} src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {profileRoutes.map((route) => (
              <MenuItem key={route.title} onClick={() => route.onClick()}>
                <Typography textAlign="center">{route.title}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default AppTopBar;