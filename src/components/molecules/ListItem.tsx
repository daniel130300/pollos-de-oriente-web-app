import { ListItem as MuiListItem, SvgIconTypeMap } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import Typography from '@mui/material/Typography';
import { Link } from '@tanstack/react-router';
import React from 'react';
import { useTheme } from '@mui/material/styles';

type RouteProps = {
  title: string;
  href: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
};

interface ListItemProps {
  route: RouteProps;
}

export const ListItem: React.FC<ListItemProps> = ({ route }) => {
  const theme = useTheme();

  return (
    <MuiListItem
      key={route.title}
      disablePadding
      component={Link}
      to={route.href}
      activeProps={{ style: { color: theme.palette.primary.main } }}
      inactiveProps={{ style: { color: theme.palette.text.primary } }}
    >
      <ListItemButton>
        <ListItemIcon sx={{ pr: 2, minWidth: 0, color: 'inherit' }}>
          <route.icon />
        </ListItemIcon>
        <ListItemText
          primary={<Typography>{route.title}</Typography>}
          disableTypography
          sx={{ textDecoration: 'none' }}
        />
      </ListItemButton>
    </MuiListItem>
  );
};

export default ListItem;
