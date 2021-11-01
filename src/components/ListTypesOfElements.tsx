import React, { useContext } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

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
  types: Type[];
  customContainerStyles?: StyleProp<ViewStyle>;
};

const ListTypesOfElements = ({ types, customContainerStyles }: Props) => {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <View style={{
      ...styles.container,
      ...customContainerStyles as any
    }}
    >
      {
        types.map(({ type: { name } }, index) => (
          <View
            key={name}
            style={{
              ...styles.bubbleType,
              backgroundColor: (index === 0) ? 'rgba(0, 0, 0, 0.1)' : elementsPalette[name]
            }}
          >
            <CustomIcon
              name={name}
              size={fontPresets.sizes.tertiarySize}
              color={colorSelector(currentTheme)}
            />
            <AppText
              text={formatName(name)}
              customStyles={{
                ...styles.text,
                color: colorSelector(currentTheme)
              }}
            />
          </View>
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  bubbleType: {
    marginRight: wp(1),
    padding: hp(0.8),
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  text: {
    fontSize: fontPresets.sizes.quaternarySize,
    marginTop: hp(-0.5),
    marginLeft: wp(1)
  }
});

export default ListTypesOfElements;
