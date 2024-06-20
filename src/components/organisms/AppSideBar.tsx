import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { sideBarRoutes } from 'src/constants/routes';
import ListItem from '../molecules/ListItem';

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
  handleDrawerTransitionEnd,
}) => {
  const drawer = (
    <List sx={{ pt: 8 }}>
      {sideBarRoutes.map(route => (
        <ListItem key={route.title} route={route} />
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
          keepMounted: true,
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
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            zIndex: 0,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default AppSideBar;
