import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import AppText from '../components/AppText';
import CustomIcon from '../components/CustomIcon';
import ListOfPokemons from '../components/ListOfPokemons';
import SearchBar from '../components/SearchBar';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import usePokemonsPaginated from '../hooks/usePokemonsPaginated';
import useSearchPokemons from '../hooks/useSearchPokemons';
import fontPresets from '../theme/fontPresets';

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { currentTheme: { name, primaryColor, secondaryColor, tertiaryColor } } = useContext(ThemeContext);

  const { pokemonsListPaged, loadingPaginatedList, loadPaginatedListItems } = usePokemonsPaginated();
  const {
    pokemonsSearched,
    loadingSearchItems,
    lengthOfAllPokemons,
    lenghtPokemonsExtracted,
    filterPokemons,
    loadSearchItems
  } = useSearchPokemons();

  const lightThemeEnabled = (name === 'light');
  const searchEnabled = (searchTerm.length > 0);

  useEffect(() => {
    filterPokemons(searchTerm);
  }, [searchTerm]);

  if (loadingPaginatedList || loadingSearchItems) {
    return (
      <View style={{
        backgroundColor: 'gray',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <AppText text="Cargando" />
      </View>
    );
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: tertiaryColor
      }}
    >
      <StatusBar
        animated
        backgroundColor={lightThemeEnabled ? '#E5E5E5' : '#323232'}
        barStyle={lightThemeEnabled ? 'dark-content' : 'light-content'}
      />
      <CustomIcon
        name="pokeball"
        size={hp(30)}
        color={secondaryColor}
        style={styles.pokeballIcon}
      />
      <AppText
        text="Pokédex"
        customStyles={{
          ...styles.appTitle,
          color: primaryColor
        }}
      />
      <AppText
        text="Search for Pokémon by name or using the National Pokédex number."
        customStyles={{
          ...styles.desc,
          color: secondaryColor
        }}
      />
      <SearchBar onDebounce={setSearchTerm} />
      <ListOfPokemons
        data={searchEnabled ? pokemonsSearched : pokemonsListPaged}
        numberOfItems={searchEnabled ? lenghtPokemonsExtracted.current : lengthOfAllPokemons.current}
        onEndReached={searchEnabled ? loadSearchItems : loadPaginatedListItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  pokeballIcon: {
    position: 'absolute',
    opacity: 0.2,
    right: hp(-10),
    top: hp(-10),
    transform: [{ rotate: '145deg' }]
  },
  appTitle: {
    fontSize: fontPresets.sizes.primarySize,
    fontFamily: fontPresets.weights.bold,
    marginTop: wp(10),
    marginBottom: hp(2),
    width: wp(90)
  },
  desc: {
    fontSize: fontPresets.sizes.tertiarySize,
    textAlign: 'justify',
    width: wp(90)
  }
});

export default HomeScreen;
