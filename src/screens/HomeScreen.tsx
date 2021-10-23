import React, { useContext } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import PokemonCard from '../components/PokemonCard';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import usePokemonPaginated from '../hooks/usePokemonPaginated';

const HomeScreen = () => {
  const { currentTheme } = useContext(ThemeContext);

  const { pokemonList, loadPokemons } = usePokemonPaginated();

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: currentTheme.tertiaryColor
      }}
    >
      <Image
        // eslint-disable-next-line global-require
        source={require('../../assets/images/half-pokeball.png')}
        style={styles.topLogo}
      />
      <FlatList
        data={pokemonList}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          alignItems: 'center',
          width: wp(100),
          paddingVertical: 30
        }}
        showsVerticalScrollIndicator={false}
        onEndReached={loadPokemons}
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
    left: wp(5)
  }
});

export default HomeScreen;
