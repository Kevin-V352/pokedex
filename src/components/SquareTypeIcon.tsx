import React, { useContext } from 'react';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import elementsPalette from '../data/elementsPalette';
import colorSelector from '../helpers/themeSelectors';
import CustomIcon from './CustomIcon';

interface Props {
  name: string;
  customStyles?: StyleProp<TextStyle>
};

const SquareTypeIcon = ({ name, customStyles }: Props) => {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <CustomIcon
      name={name}
      size={wp(4)}
      style={{
        ...styles.icon,
        color: colorSelector(currentTheme),
        backgroundColor: elementsPalette[name],
        ...customStyles as any
      }}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    borderRadius: wp(2),
    padding: wp(2)
  }
});

export default SquareTypeIcon;
