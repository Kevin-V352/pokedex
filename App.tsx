import 'react-native-gesture-handler';

import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigators/StackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
};

export default App;
