/* eslint-disable react/no-children-prop */

import React, { useContext } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import elementsPalette from '../data/elementsPalette';
import { calculateWidth } from '../helpers/dimensionFormatters';
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

  const { currentTheme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      backBehavior="none"
      sceneContainerStyle={{ backgroundColor: 'white' }}
      screenOptions={{
        lazy: true,

        tabBarLabelStyle: {
          textTransform: 'none',
          fontFamily: fontPresets.weights.semiBold,
          fontSize: fontPresets.sizes.secondarySize
        },
        /* tabBarItemStyle: { backgroundColor: 'red', alignSelf: 'flex-end' }, */
        tabBarStyle: {
          // Remove shaded border in IOS
          shadowColor: currentTheme.secondaryColor,
          // Remove shaded border in Android
          elevation: 0
        },
        tabBarPressColor: 'transparent'
      }}
    >
      <Tab.Screen
        name="About"
        children={() => <AboutScreen pokemon={pokemon} />}
        options={{ tabBarIndicatorStyle: calculateWidth('Stats', typeColor) }}
      />
      <Tab.Screen
        name="Stats"
        children={() => <StatsScreen pokemon={pokemon} />}
        options={{ tabBarIndicatorStyle: calculateWidth('Stats', typeColor) }}
      />
      <Tab.Screen
        name="Evolution"
        children={() => <EvolutionScreen pokemon={pokemon} />}
        options={{ tabBarIndicatorStyle: calculateWidth('Evolution', typeColor) }}
      />
    </Tab.Navigator>
  );
};

export default MaterialTopTabNavigator;
