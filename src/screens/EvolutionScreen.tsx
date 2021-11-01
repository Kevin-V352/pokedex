/* eslint-disable global-require */
import React, { useContext } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import AppText from '../components/AppText';
import EvolutionComparator from '../components/EvolutionComparator';
import Loader from '../components/Loader';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import elementsPalette from '../data/elementsPalette';
import useEvolutionData from '../hooks/useEvolutionData';
import { PokemonResponse } from '../interfaces/pokemonsInterfaces';
import fontPresets from '../theme/fontPresets';

interface Props {
  pokemon: PokemonResponse;
};

const EvolutionScreen = ({ pokemon: { species, types } }: Props) => {
  const typeColor: string = elementsPalette[types[0].type.name];

  const { currentTheme: { secondaryColor } } = useContext(ThemeContext);

  const { evolutions, isLoading } = useEvolutionData(species);

  if (isLoading) return <Loader />;

  if (!isLoading && evolutions.length === 0) {
    return (
      <View style={styles.undefinedContainer}>
        <Image
          source={require('../../assets/images/undefined-icon.png')}
          style={styles.undefinedImage}
        />
        <AppText
          text="No known evolutions"
          customStyles={{
            ...styles.undefinedText,
            color: secondaryColor
          }}
        />
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
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
  container: {
    marginBottom: hp(-1),
    paddingHorizontal: wp(5)
  },
  titleSection: {
    marginBottom: hp(3),
    fontFamily: fontPresets.weights.bold,
    marginTop: hp(2)
  },
  undefinedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  undefinedImage: {
    height: hp(20),
    width: hp(20)
  },
  undefinedText: { fontSize: fontPresets.sizes.tertiarySize }
});

export default EvolutionScreen;
