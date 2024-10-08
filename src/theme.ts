import { createTheme, responsiveFontSizes } from '@mui/material/styles';

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
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '2.25rem', // Equivalent to 36px
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem', // Equivalent to 32px
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem', // Equivalent to 28px
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem', // Equivalent to 24px
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1.25rem', // Equivalent to 16px
    },
    subtitle2: {
      fontSize: '1rem', // Equivalent to 14px
    },
    body1: {
      fontSize: '1rem', // Equivalent to 16px
    },
    body2: {
      fontSize: '0.875rem', // Equivalent to 14px
    },
    button: {
      fontSize: '1rem', // Equivalent to 16px
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem', // Equivalent to 12px
    },
    overline: {
      fontSize: '0.75rem', // Equivalent to 12px
    },
  },
});

export default responsiveFontSizes(theme);
