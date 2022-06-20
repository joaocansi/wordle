import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import themes from 'styles/themes';
import { DEFAULT_THEME } from 'utils/settings';

interface ThemesContextProps {
  theme: DefaultTheme;
  changeTheme: (name: string) => void;
}

interface ThemesProviderProps {
  children: ReactNode;
}

const ThemesContext = createContext({} as ThemesContextProps);
export const ThemesProvider = ({ children }: ThemesProviderProps) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return themes[DEFAULT_THEME];

    var localTheme = localStorage.getItem('@wordle:theme');

    if (!localTheme || !Object.keys(themes).includes(localTheme)) {
      localStorage.setItem('@wordle:theme', DEFAULT_THEME);
      return themes[DEFAULT_THEME];
    }

    return themes[localStorage.getItem('@wordle:theme')];
  });

  const changeTheme = (name: string) => {
    if (!Object.keys(themes).includes(name)) {
      setTheme(themes[DEFAULT_THEME]);
      localStorage.setItem('@wordle:theme', DEFAULT_THEME);
      return;
    }

    localStorage.setItem('@wordle:theme', name);
    setTheme(themes[name]);
  };

  return (
    <ThemesContext.Provider value={{ theme, changeTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemesContext.Provider>
  );
};

export const useThemes = () => useContext(ThemesContext);
