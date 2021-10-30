import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AppText from '../components/AppText';
import EvolutionComparator from '../components/EvolutionComparator';
import Loader from '../components/Loader';
import elementsPalette from '../data/elementsPalette';
import useEvolutionData from '../hooks/useEvolutionData';
import { PokemonResponse } from '../interfaces/pokemonsInterfaces';
import fontPresets from '../theme/fontPresets';
import globalStyles from '../theme/globalStyles';

interface Props {
  pokemon: PokemonResponse;
};

const EvolutionScreen = ({ pokemon: { species, types } }: Props) => {
  const typeColor: string = elementsPalette[types[0].type.name];

  const { evolutions, isLoading } = useEvolutionData(species);

  if (isLoading) return <Loader />;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={globalStyles.screenContainer}>
        <AppText
          text="Evolution Chart"
          customStyles={{
            ...styles.titleSection,
            color: typeColor
          }}
        />
        {
          evolutions.map((item) => (
            <EvolutionComparator
              key={item.nextPokemon.id}
              pokemonEvolution={item}
            />
          ))
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    marginVertical: hp(3),
    fontFamily: fontPresets.weights.bold
  }
});

export default EvolutionScreen;
