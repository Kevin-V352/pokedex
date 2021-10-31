import React, { createContext, FC, useState } from 'react';

import { Theme } from '../../interfaces/themeInterfaces';
import themes from '../../theme/themes';

export type ThemeOptions = 'light' | 'dark';

interface ThemeContextProps {
  currentTheme: Theme;
  changeTheme: (nextTheme: ThemeOptions) => void;
};

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider: FC = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.light);

  const changeTheme = (nextTheme: ThemeOptions) => setCurrentTheme(themes[nextTheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        changeTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
