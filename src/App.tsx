import {
  Box,
  Snackbar,
  Stack,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import Header from './components/Header';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { useState } from 'react';
import ThemeContext from './contexts/themeContext';
import SnackBarContext from './contexts/snackBarContext';

declare module '@mui/material/styles' {
  interface Palette {
    envelope: {
      frontFlap: string;
      sideFlap: string;
      bottomFlap: string;
    };
  }
  interface PaletteOptions {
    envelope: {
      frontFlap: string;
      sideFlap: string;
      bottomFlap: string;
    };
  }
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
    },
    envelope: {
      frontFlap: '#dbb95a',
      sideFlap: '#ebd9a7',
      bottomFlap: '#ba9120',
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'serif',
      color: '#fff',
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    envelope: {
      frontFlap: '#ba9120',
      sideFlap: '#ebd9a7',
      bottomFlap: '#dbb95a',
    },
    background: {
      default: '#89CFF0',
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'serif',
    },
  },
});

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const themeMode = mode === 'light' ? lightTheme : darkTheme;
  const [snackBarValue, setSnackBarValue] = useState<string>();

  const handleShowSnackBar = (value: string) => {
    setSnackBarValue(value);
  };

  return (
    <Stack sx={{ height: '100vh' }}>
      <ThemeProvider theme={themeMode}>
        <ThemeContext.Provider value={{ mode, changeTheme: setMode }}>
          <SnackBarContext.Provider value={{ showSnack: handleShowSnackBar }}>
            <Header />
            <Box
              sx={{
                marginTop: themeMode.spacing(8),
                flexGrow: 1,
                backgroundColor: themeMode.palette.background.default,
                alignContent: 'center',
              }}
            >
              <RouterProvider router={router} />
            </Box>
          </SnackBarContext.Provider>
        </ThemeContext.Provider>
      </ThemeProvider>
      <Snackbar
        open={!!snackBarValue}
        autoHideDuration={6000}
        onClose={() => setSnackBarValue(undefined)}
        message={snackBarValue}
      />
    </Stack>
  );
}
