import React, { useCallback, useContext } from 'react';
import { View, StyleSheet, Image, FlatList, StatusBar } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import Loader from '../components/Loader';
import PokemonCard from '../components/PokemonCard';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import usePokemonPaginated from '../hooks/usePokemonPaginated';

const darkImage = require('../../assets/images/pokeball_icon_dark.png');
const lightImage = require('../../assets/images/pokeball_icon_light.png');

const getItemLayout = (data: any, index: number) => (
  { length: hp(19), offset: (hp(19) * index), index }
);

const HomeScreen = () => {
  const { currentTheme: { name, tertiaryColor } } = useContext(ThemeContext);

  const renderItem = useCallback(({ item }) => <PokemonCard pokemon={item} />, []);
  const keyExtractor = useCallback(({ id }) => id.toString(), []);
  const renderFooterLoader = useCallback(() => <Loader customStyles={styles.footerLoader} />, []);

  const { pokemonList, loadPokemons } = usePokemonPaginated();

  const lightThemeEnabled = (name === 'light');

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
      <Image
        source={lightThemeEnabled ? lightImage : darkImage}
        style={styles.topLogo}
      />
      <FlatList
        data={pokemonList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        onEndReached={loadPokemons}
        ListFooterComponent={renderFooterLoader}
        getItemLayout={getItemLayout}
        contentContainerStyle={styles.listContianerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  topLogo: {
    resizeMode: 'stretch',
    height: wp(90),
    width: wp(90),
    position: 'absolute',
    top: wp(-48),
    left: wp(5),
    opacity: 0.2
  },
  listContianerStyle: {
    alignItems: 'center',
    width: wp(100)
  },
  footerLoader: {
    height: hp(22),
    flex: 0
  }
});

export default HomeScreen;
