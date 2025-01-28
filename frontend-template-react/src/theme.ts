// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffcc00', // Primary color (can be updated globally)
    },
    secondary: {
      main: '#1976d2', // Secondary color (optional)
    },
    background: {
      default: '#1a1a1a', // Default background color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded button corners
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5", // Input background color
          borderRadius: 4, // Rounded inputs
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Light shadow for card-like effect
          borderRadius: 8, // Rounded corners for paper components
        },
      },
    },
  },
});

export default theme;
