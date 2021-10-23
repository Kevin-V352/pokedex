import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, Image, FlatList, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import elementsPalette from '../data/elementsPalette';
import { formatIndexNumber, formatName } from '../helpers/textFormatters';
import { colorSelector } from '../helpers/themeSelectors';
import { SinglePokemonResponse } from '../interfaces/pokemonsInterfaces';
import { RootStackParams } from '../navigators/StackNavigator';
import fontPresets from '../theme/fontPresets';
import AppText from './AppText';
import CustomIcon from './CustomIcon';
import PokemonTypeBubble from './PokemonTypeBubble';

interface Props {
  pokemon: SinglePokemonResponse
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParams, 'HomeScreen'>;

const PokemonCard = ({ pokemon }: Props) => {
  const uri = pokemon.sprites.other!['official-artwork'].front_default;

  const typeColor: string = elementsPalette[pokemon.types[0].type.name];

  const { currentTheme } = useContext(ThemeContext);

  const { navigate } = useNavigation<HomeScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigate('DetailsScreen', pokemon)}
      activeOpacity={0.8}
      style={{
        ...styles.container,
        backgroundColor: typeColor
      }}
    >
      <AppText
        text={formatIndexNumber(pokemon.id)}
        customStyles={{
          ...styles.id,
          color: currentTheme.primaryColor
        }}
      />
      <AppText
        text={formatName(pokemon.name)}
        customStyles={{
          ...styles.name,
          color: colorSelector(currentTheme)
        }}
      />
      <Image
        source={{ uri }}
        style={styles.avatar}
      />
      <CustomIcon
        name="grid-6x3"
        size={hp(5)}
        color={colorSelector(currentTheme)}
        style={styles.gridPoints}
      />
      <View style={styles.pokeballContainer}>
        <CustomIcon
          name="pokeball"
          size={hp(20)}
          color={colorSelector(currentTheme)}
          style={styles.pokeball}
        />
      </View>
      <FlatList
        horizontal
        data={pokemon.types}
        renderItem={({ item, index }) => <PokemonTypeBubble type={item} index={index} />}
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
      height: 5
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
    opacity: 0.3,
    position: 'absolute',
    top: hp(-2),
    zIndex: -1
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
  gridPoints: {
    position: 'absolute',
    top: hp(-1.5),
    left: wp(28),
    opacity: 0.3
  },
  name: {
    fontFamily: fontPresets.weights.bold,
    fontSize: fontPresets.sizes.primarySize,
    marginTop: hp(-1)
  },
  id: {
    fontFamily: fontPresets.weights.bold,
    fontSize: fontPresets.sizes.quaternarySize
  },
  listOfTypes: { marginTop: hp(0.5) }
});

export default React.memo(PokemonCard);
