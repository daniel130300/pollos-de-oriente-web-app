import {ListItem as MuiListItem, SvgIconTypeMap} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Link } from "@tanstack/react-router";
import React from "react";
import { useTheme } from '@mui/material/styles';
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface RouteItem {
  title: string;
  href: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  } | null;
  subMenu: Pick<RouteItem, 'title' | 'href' | 'icon'>[] | [];
}

interface ListItemProps {
  route: RouteItem;
}

export const ListItem: React.FC<ListItemProps> = ({route}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <MuiListItem 
        key={route.title} 
        {...(route.subMenu.length === 0 ? 
          { 
            component: Link, 
            to: route.href,
            activeProps: { style: { color: theme.palette.primary.main } },
            inactiveProps: { style: { color: theme. palette.text.primary } },
          } : 
          {
            component: MuiListItem,
            componentsProps: {root: {style: { padding: 0 }}}
          })}
        disablePadding
        onClick={handleClick}
      >
        <ListItemButton>
          <ListItemIcon sx={{ pr: 2, minWidth: 0, color: 'inherit' }}>
            {route.icon ? React.createElement(route.icon) : null}
          </ListItemIcon>
          <ListItemText
            primary={<Typography>{route.title}</Typography>}
            disableTypography
            sx={{ textDecoration: 'none' }}
          />
          {route.subMenu.length > 0 && (
            open ? <ExpandLessIcon /> : <ExpandMoreIcon />
          )}
        </ListItemButton>
      </MuiListItem>
      {open && route.subMenu.length > 0 && (
        <>
          {route.subMenu.map((subItem, index) => (
            <MuiListItem 
              key={subItem.title + index}
              disablePadding
              component={Link} 
              to={`${route.href}/${subItem.href}`}
              activeProps={{ style: { color: theme.palette.primary.main } }}
              inactiveProps={{ style: { color: theme.palette.text.primary } }}
            >
              <ListItemButton>
                <ListItemIcon sx={{ pr: 2, minWidth: 0, color: 'inherit' }}>
                  {subItem.icon ? React.createElement(subItem.icon) : null}
                </ListItemIcon>
                <ListItemText
                  primary={<Typography>{subItem.title}</Typography>}
                  disableTypography
                  sx={{ textDecoration: 'none' }}
                />
              </ListItemButton>
            </MuiListItem>
          ))}
        </>
      )}
    </>
  )
}

export default ListItem;