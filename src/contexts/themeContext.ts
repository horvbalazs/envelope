import { createContext } from 'react';

interface IThemeContext {
  mode: 'light' | 'dark';
  changeTheme?: (mode: 'light' | 'dark') => void;
}

const defaultValue: IThemeContext = {
  mode: 'light',
};

const ThemeContext = createContext<IThemeContext>(defaultValue);

export default ThemeContext;
