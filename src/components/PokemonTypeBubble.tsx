import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import elementsPalette from '../data/elementsPalette';
import { formatName } from '../helpers/textFormatters';
import { colorSelector } from '../helpers/themeSelectors';
import { Type } from '../interfaces/pokemonsInterfaces';
import fontPresets from '../theme/fontPresets';
import AppText from './AppText';
import CustomIcon from './CustomIcon';

interface Props {
  type: Type;
  index: number;
};

const PokemonTypeBubble = ({ type, index }: Props) => {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <View style={{
      ...styles.container,
      backgroundColor: (index === 0) ? 'rgba(0, 0, 0, 0.1)' : elementsPalette[type.type.name]
    }}
    >
      <CustomIcon
        name={type.type.name}
        size={fontPresets.sizes.tertiarySize}
        color={colorSelector(currentTheme)}
      />
      <AppText
        text={formatName(type.type.name)}
        customStyles={{
          ...styles.text,
          color: colorSelector(currentTheme)
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: wp(1),
    paddingHorizontal: wp(2),
    borderRadius: wp(2),
    maxHeight: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  text: {
    color: 'white',
    fontSize: fontPresets.sizes.quaternarySize,
    marginTop: hp(-0.5),
    marginLeft: wp(1)
  }
});

export default PokemonTypeBubble;
