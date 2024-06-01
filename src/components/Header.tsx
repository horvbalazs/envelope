import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useContext } from 'react';
import ThemeContext from '../contexts/themeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function Header() {
  const { mode, changeTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    changeTheme?.(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <AppBar component="header">
      <Toolbar>
        <Typography
          variant="h4"
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
          component="a"
          href="/"
        >
          Funvelope
        </Typography>
        <Tooltip
          placement="left"
          title={mode === 'light' ? 'Toggle dark mode' : 'Toggle light mode'}
        >
          <IconButton onClick={toggleTheme}>
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
