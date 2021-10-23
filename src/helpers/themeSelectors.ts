import { Theme } from '../interfaces/themeInterfaces';

export const colorSelector = (objectTheme: Theme) => {
  const { name, primaryColor, tertiaryColor } = objectTheme;

  return (name === 'light') ? tertiaryColor : primaryColor;
};

export default colorSelector;
