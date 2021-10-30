import React, { useContext } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AppText from '../components/AppText';
import Loader from '../components/Loader';
import Section from '../components/Section';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import elementsPalette from '../data/elementsPalette';
import useAboutData from '../hooks/useAboutData';
import { PokemonResponse } from '../interfaces/pokemonsInterfaces';
import fontPresets from '../theme/fontPresets';
import globalStyles from '../theme/globalStyles';

interface Props {
  pokemon: PokemonResponse;
};

const AboutScreen = ({ pokemon }: Props) => {
  const typeColor: string = elementsPalette[pokemon.types[0].type.name];

  const { currentTheme: { secondaryColor } } = useContext(ThemeContext);

  const {
    isLoading,
    desc,
    pokedexData,
    training,
    breeding,
    location
  } = useAboutData(pokemon);

  if (isLoading) return <Loader />;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={globalStyles.screenContainer}>
        <AppText
          text="Description"
          customStyles={{
            ...styles.titleSection,
            color: typeColor
          }}
        />
        <AppText
          text={desc}
          customStyles={{
            fontSize: fontPresets.sizes.tertiarySize,
            color: secondaryColor,
            textAlign: 'justify'
          }}
        />
        <Section
          title="Pokédex Data"
          typeColor={typeColor}
          data={pokedexData}
        />
        <Section
          title="Training"
          typeColor={typeColor}
          data={training}
        />
        <Section
          title="Breeding"
          typeColor={typeColor}
          data={breeding}
        />
        <Section
          title="Location"
          typeColor={typeColor}
          data={location}
        />
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

export default AboutScreen;
