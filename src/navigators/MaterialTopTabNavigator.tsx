/* eslint-disable react/no-children-prop */

import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import elementsPalette from '../data/elementsPalette';
import { PokemonResponse } from '../interfaces/pokemonsInterfaces';
import AboutScreen from '../screens/AboutScreen';
import EvolutionScreen from '../screens/EvolutionScreen';
import StatsScreen from '../screens/StatsScreen';
import fontPresets from '../theme/fontPresets';

interface Props {
  pokemon: PokemonResponse;
};

const Tab = createMaterialTopTabNavigator();

const MaterialTopTabNavigator = ({ pokemon }: Props) => {
  const typeColor: string = elementsPalette[pokemon.types[0].type.name];

  const { currentTheme: { secondaryColor, tertiaryColor } } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={{
        lazy: true,
        tabBarContentContainerStyle: { backgroundColor: tertiaryColor },
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: typeColor,
        tabBarInactiveTintColor: secondaryColor,
        tabBarStyle: {
          // Remove shaded border in IOS
          shadowColor: secondaryColor,
          // Remove shaded border in Android
          elevation: 0
        },
        tabBarPressColor: 'transparent'
      }}
      sceneContainerStyle={{ backgroundColor: tertiaryColor }}
    >
      <Tab.Screen
        name="About"
        children={() => <AboutScreen pokemon={pokemon} />}
      />
      <Tab.Screen
        name="Stats"
        children={() => <StatsScreen pokemon={pokemon} />}
      />
      <Tab.Screen
        name="Evolution"
        children={() => <EvolutionScreen pokemon={pokemon} />}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    textTransform: 'none',
    fontFamily: fontPresets.weights.bold,
    fontSize: fontPresets.sizes.secondarySize
  },
  tabBarIndicatorStyle: { backgroundColor: 'transparent' }
});

export default MaterialTopTabNavigator;
