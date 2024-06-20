import StoreIcon from '@mui/icons-material/Store';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventoryIcon from '@mui/icons-material/Inventory';
import FastfoodIcon from '@mui/icons-material/Fastfood';

export const sideBarRoutes = [
  {title: 'Productos', href: '/products', icon: InventoryIcon}, 
  {title: 'Establecimientos', href: '/establishments', icon: StoreIcon},
  {title: 'Combos', href: '/combos', icon: FastfoodIcon},
  {title: 'Ventas', href: '/sales', icon: AttachMoneyIcon},
  {title: 'Compras', href: '/purchases', icon: ReceiptIcon}
]

export const profileTopBarRoutes = ({
  handleCloseUserMenu,
  handleLogOut
} : {
  handleCloseUserMenu: () => void
  handleLogOut: () => Promise<void>
}) => [
  { title: 'Perfil', onClick: handleCloseUserMenu },
  { title: 'Cerrar Sesión', onClick: handleLogOut }
];