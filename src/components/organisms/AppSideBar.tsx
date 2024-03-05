import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { Link } from '@tanstack/react-router';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { sideBarRoutes } from 'src/constants/routes';

interface AppSideBarProps {
  mobileOpen: boolean;
  drawerWidth: number;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
}

export const AppSideBar: React.FC<AppSideBarProps> = ({
  mobileOpen,
  drawerWidth,
  handleDrawerClose,
  handleDrawerTransitionEnd
}) => {

  const drawer = (
    <List sx={{pt: 10}}>
      {sideBarRoutes.map((route) => (
        <ListItem key={route.title} disablePadding component={Link} to={route.href} activeProps={{}}>
          <ListItemButton>
            <ListItemIcon sx={{pr: 2, minWidth: 0}}>
              <route.icon />
            </ListItemIcon>
            <ListItemText  
              primary={<Typography color="initial">{route.title}</Typography>}
              disableTypography
              sx={{textDecoration: 'none'}}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, zIndex: 0 },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default AppSideBar;