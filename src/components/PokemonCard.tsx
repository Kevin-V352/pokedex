import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';

import { SinglePokemonResponse } from '../interfaces/pokemonsInterfaces';

import { formatIndexNumber, formatName } from '../helpers/textFormatters';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import fontPresets from '../theme/fontPresets';

import elementsPalette from '../data/elementsPalette';

import AppText from './AppText';
import { FlatList } from 'react-native-gesture-handler';
import PokemonTypeBubble from './PokemonTypeBubble';

interface Props {
  pokemon: SinglePokemonResponse
};

const PokemonCard = ({ pokemon }: Props) => {

  const uri = pokemon.sprites.other!['official-artwork'].front_default;

  const pokeballUri = require('../../assets/images/pokeball.png');

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        ...styles.container,
        backgroundColor: elementsPalette[pokemon.types[0].type.name]
      }}
    >
      <AppText
        text={formatIndexNumber(pokemon.id)}
        customStyles={styles.id}
      />
      <AppText
        text={formatName(pokemon.name)}
        customStyles={styles.name}
      />
      <Image
        source={{ uri }}
        style={styles.avatar}
      />
      <Image
        source={require('../../assets/images/grid-points.png')}
        style={styles.gridPoints}
      />
      <View style={styles.pokeballContainer}>
        <Image
          source={pokeballUri}
          style={styles.pokeball}
        />
      </View>
      <FlatList
        horizontal
        data={pokemon.types}
        renderItem={({ item }) => <PokemonTypeBubble type={item} />}
        contentContainerStyle={styles.listOfTypes}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    height: hp(16),
    marginTop: hp(3),
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
    shadowColor: '#1C1C1C',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 4
  },
  avatar: {
    width: wp(30),
    height: wp(30),
    position: 'absolute',
    top: hp(-3),
    right: wp(2),
    zIndex: 1
  },
  pokeball: {
    height: hp(20),
    width: hp(20),
    top: hp(-2)
  },
  gridPoints: {
    height: hp(4),
    width: hp(12),
    resizeMode: 'stretch',
    position: 'absolute',
    top: hp(1),
    left: wp(16)
  },
  pokeballContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: hp(16),
    width: hp(16),
    borderTopRightRadius: wp(4),
    borderBottomRightRadius: wp(4),
    overflow: 'hidden'
  },
  name: {
    color: 'white',
    fontFamily: fontPresets.weights.bold,
    fontSize: fontPresets.sizes.primarySize,
    marginTop: hp(-1)
  },
  id: {
    color: '#1C1C1C',
    fontFamily: fontPresets.weights.bold,
    fontSize: fontPresets.sizes.tertiarySize
  },
  listOfTypes: {
    marginTop: wp(1.5)
  }

});

export default PokemonCard;
