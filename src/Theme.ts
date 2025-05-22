import { createTheme } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material/styles';

const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#D8284B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: mode === 'light' ? '#424242' : '#A0A0A0',
    },
    background: {
      default: mode === 'light' ? '#F9FAFB' : '#121212',
      paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
    },
    text: {
      primary: mode === 'light' ? '#1F2937' : '#FFFFFF',
      secondary: mode === 'light' ? '#6B7280' : '#A0A0A0',
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
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
          color: mode === 'light' ? '#1F2937' : '#FFFFFF',
        },
      },
    },
  },
});

export default getTheme;
