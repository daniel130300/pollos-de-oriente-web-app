import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF8F00', // Moderately aggressive orange color
      light: '#FFBD45',
      dark: '#C65E00',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FB7916',
      light: '#FC9546',
      dark: '#361801',
      contrastText: '#fff',
    },
  },
});

export default theme;