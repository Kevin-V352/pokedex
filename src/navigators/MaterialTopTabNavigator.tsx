/* eslint-disable react/no-children-prop */

import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import elementsPalette from '../data/elementsPalette';
import { calculateWidth } from '../helpers/dimensionFormatters';
import { SinglePokemonResponse } from '../interfaces/pokemonsInterfaces';
import AboutScreen from '../screens/AboutScreen';
import EvolutionScreen from '../screens/EvolutionScreen';
import StatsScreen from '../screens/StatsScreen';
import fontPresets from '../theme/fontPresets';

interface Props {
  pokemon: SinglePokemonResponse;
};

const Tab = createMaterialTopTabNavigator();

const MaterialTopTabNavigator = ({ pokemon }: Props) => {
  const typeColor: string = elementsPalette[pokemon.types[0].type.name];

  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'white' }}
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'none',
          fontFamily: fontPresets.weights.semiBold,
          fontSize: fontPresets.sizes.secondarySize
        },
        tabBarStyle: {
          // Remove shaded border in IOS
          shadowColor: 'transparent',
          // Remove shaded border in Android
          elevation: 0
        },
        tabBarPressColor: 'transparent'
      }}
    >
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{ tabBarIndicatorStyle: calculateWidth('Stats', typeColor) }}
      />
      <Tab.Screen
        name="Stats"
        children={() => <StatsScreen stats={pokemon.stats} />}
        options={{ tabBarIndicatorStyle: calculateWidth('Stats', typeColor) }}
      />
      <Tab.Screen
        name="Evolution"
        component={EvolutionScreen}
        options={{ tabBarIndicatorStyle: calculateWidth('Evolution', typeColor) }}
      />
    </Tab.Navigator>
  );
};

export default MaterialTopTabNavigator;
