import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#D8284B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#424242', // dark gray
    },
    background: {
      default: '#F9FAFB', // light background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F2937', // dark slate gray
      secondary: '#6B7280', // muted gray
    },
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F59E0B',
    },
    success: {
      main: '#22C55E',
    },
    info: {
      main: '#3B82F6',
    },
  },
  typography: {
    fontFamily: ['"Inter"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
