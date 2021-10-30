import React, { useContext } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import { DefenseRatePercentage } from '../interfaces/ElementTypesInterface';
import fontPresets from '../theme/fontPresets';
import AppText from './AppText';
import SquareTypeIcon from './SquareTypeIcon';

interface Props {
  type: DefenseRatePercentage;
  customStyles?: StyleProp<ViewStyle>
};

const DefenseMultiplier = ({ customStyles, type }: Props) => {
  const formattedValue: string = (type.value === 0.5) ? '½' : '¼';
  // eslint-disable-next-line no-nested-ternary
  const selectedValue = (type.value === 1)
    ? ' ' : (type.value % 1 === 0)
      ? type.value : formattedValue;

  const { currentTheme: { secondaryColor } } = useContext(ThemeContext);

  return (
    <View style={{
      ...styles.container,
      ...customStyles as any
    }}
    >
      <SquareTypeIcon name={type.name} />
      <AppText
        text={selectedValue}
        customStyles={{
          ...styles.value,
          color: secondaryColor
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1)
  },
  value: { fontSize: fontPresets.sizes.tertiarySize }
});

export default DefenseMultiplier;
