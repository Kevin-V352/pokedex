import React from 'react';
import { View, StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import calculatePercentage from '../helpers/calculators';
import fontPresets from '../theme/fontPresets';
import AppText from './AppText';

interface Props {
  type: string;
  value: number;
};

const StatBar = ({ type, value }: Props) => (
  <View style={styles.container}>
    <AppText
      text={type}
      customStyles={styles.typeText}
    />
    <AppText
      text={value}
      customStyles={styles.valueText}
    />
    <View style={styles.progessBarContainer}>
      <View style={{
        ...styles.progressBarValue,
        width: calculatePercentage(255, value)
      }}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2)
  },
  typeText: {
    marginTop: hp(-1),
    fontSize: fontPresets.sizes.tertiarySize,
    fontFamily: fontPresets.weights.bold,
    marginRight: 'auto',
    color: 'black'
  },
  valueText: {
    marginTop: hp(-1),
    fontSize: fontPresets.sizes.tertiarySize,
    color: 'rgba(0, 0, 0, 0.5)'
  },
  progessBarContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: wp(60),
    height: hp(0.5),
    marginLeft: wp(4),
    overflow: 'hidden',
    borderRadius: wp(3)
  },
  progressBarValue: {
    backgroundColor: '#78C850',
    height: hp(0.5)
  }
});

export default StatBar;
