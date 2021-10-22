import 'react-native-gesture-handler';

import React, { FC } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigators/StackNavigator';

import { ThemeProvider } from './src/contexts/themeContext/ThemeContext';

const App = () => {
  return (
    <AppState>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AppState>
  );
};

const AppState: FC = ({ children }) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
);

export default App;
