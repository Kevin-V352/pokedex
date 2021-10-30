import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import { EvolutionItem } from '../interfaces/evolutionInterfaces';
import fontPresets from '../theme/fontPresets';
import AppText from './AppText';
import EvolutionCard from './EvolutionCard';

interface Props {
  pokemonEvolution: EvolutionItem;
};

const EvolutionComparator = ({ pokemonEvolution: { minLevel, prevPokemon, nextPokemon } }: Props) => {
  const { currentTheme: { primaryColor, secondaryColor } } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <EvolutionCard minimumData={prevPokemon} />
      <View style={styles.levelIndicator}>
        <Icon
          name="arrow-forward"
          size={hp(6)}
          color={secondaryColor}
          style={styles.arrowIcon}
        />
        <AppText
          text={minLevel ? `Level ${minLevel}` : 'Unknown level'}
          customStyles={{
            ...styles.levelText,
            color: primaryColor
          }}
        />
      </View>
      <EvolutionCard minimumData={nextPokemon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    marginBottom: hp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  levelIndicator: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  levelText: { fontSize: fontPresets.sizes.tertiarySize },
  arrowIcon: { opacity: 0.2 }
});

export default EvolutionComparator;
