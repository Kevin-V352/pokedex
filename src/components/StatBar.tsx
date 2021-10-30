import React, { useContext } from 'react';
import { View, StyleSheet, StyleProp, TextStyle } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import { calculatePercentage } from '../helpers/calculators';
import fontPresets from '../theme/fontPresets';
import AppText from './AppText';

interface StatValues {
  title: string;
  value: number;
  minValue: number;
  maxValue: number
};

interface Props {
  statValues: StatValues;
  typeColor: string;
};

const sharedStylesOfValues: StyleProp<TextStyle> = {
  marginTop: hp(-1),
  fontSize: fontPresets.sizes.tertiarySize,
  width: wp(11),
  textAlign: 'right'
};

const StatBar = ({ typeColor, statValues: { title, value, minValue, maxValue } }: Props) => {
  const { currentTheme: { primaryColor, secondaryColor } } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <AppText
        text={title}
        customStyles={{
          ...styles.titleText,
          color: primaryColor
        }}
      />
      <AppText
        text={value}
        customStyles={{
          ...sharedStylesOfValues,
          color: secondaryColor
        }}
      />
      <View style={styles.progessBarContainer}>
        <View style={{
          ...styles.progressBarValue,
          backgroundColor: typeColor,
          width: calculatePercentage(255, value)
        }}
        />
        <View style={{
          ...styles.progressBarSurplus,
          backgroundColor: secondaryColor
        }}
        />
      </View>
      <AppText
        text={minValue}
        customStyles={{
          ...sharedStylesOfValues,
          color: secondaryColor
        }}
      />
      <AppText
        text={maxValue}
        customStyles={{
          ...sharedStylesOfValues,
          color: secondaryColor
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2)
  },
  titleText: {
    marginTop: hp(-1),
    fontSize: fontPresets.sizes.tertiarySize,
    fontFamily: fontPresets.weights.bold,
    marginRight: 'auto',
    width: wp(19)
  },
  progessBarContainer: {
    width: wp(34),
    height: hp(0.5),
    marginLeft: wp(4),
    overflow: 'hidden',
    borderRadius: wp(3),
    flexDirection: 'row'
  },
  progressBarValue: { height: hp(0.5) },
  progressBarSurplus: {
    flex: 1,
    opacity: 0.2
  }
});

export default StatBar;
