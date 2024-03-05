import StoreIcon from '@mui/icons-material/Store';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventoryIcon from '@mui/icons-material/Inventory';
import FastfoodIcon from '@mui/icons-material/Fastfood';

export const sideBarRoutes = [
  {title: 'Productos', href: '/products', icon: InventoryIcon}, 
  {title: 'Tiendas', href: '', icon: StoreIcon},
  {title: 'Combos', href: '', icon: FastfoodIcon},
  {title: 'Ventas', href: '', icon: AttachMoneyIcon},
  {title: 'Compras', href: '', icon: ReceiptIcon}
]

export const profileTopBarRoutes = (
  handleCloseUserMenu: () => void,
  handleLogOut: () => Promise<void>
) => [
  { title: 'Perfil', onClick: handleCloseUserMenu },
  { title: 'Cerrar Sesión', onClick: handleLogOut }
];