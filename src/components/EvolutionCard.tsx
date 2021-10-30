import React, { useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import { formatIndexNumber, formatName } from '../helpers/textFormatters';
import { MinimumDataEvolution } from '../interfaces/evolutionInterfaces';
import fontPresets from '../theme/fontPresets';
import AppText from './AppText';
import CustomIcon from './CustomIcon';

interface Props {
  minimumData: MinimumDataEvolution;
};

const EvolutionCard = ({ minimumData: { img, id, name } }: Props) => {
  const { currentTheme: { primaryColor, secondaryColor } } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <CustomIcon
        name="pokeball"
        size={hp(16)}
        color={secondaryColor}
        style={styles.pokeballIcon}
      />
      <Image
        source={{ uri: img }}
        style={styles.img}
      />
      <AppText
        text={formatIndexNumber(id)}
        customStyles={{
          ...styles.id,
          color: secondaryColor
        }}
      />
      <AppText
        text={formatName(name)}
        customStyles={{
          ...styles.name,
          color: primaryColor
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  img: {
    width: hp(16),
    height: hp(16)
  },
  pokeballIcon: {
    position: 'absolute',
    opacity: 0.2
  },
  id: {
    fontSize: fontPresets.sizes.quaternarySize,
    textAlign: 'center',
    marginTop: hp(0.5)
  },
  name: {
    fontFamily: fontPresets.weights.bold,
    textAlign: 'center',
    marginTop: hp(-1)
  }
});

export default EvolutionCard;
