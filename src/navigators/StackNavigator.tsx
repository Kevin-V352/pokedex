import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { SinglePokemonResponse } from '../interfaces/pokemonsInterfaces';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParams = {
  HomeScreen: undefined
  DetailsScreen: SinglePokemonResponse
};

const Stack = createStackNavigator<RootStackParams>();

const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
  </Stack.Navigator>
);

export default StackNavigator;
