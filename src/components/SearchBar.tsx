import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import useDebounced from '../hooks/useDebounced';
import fontPresets from '../theme/fontPresets';

interface Props {
  onDebounce: (value: string) => void;
};

const SearchBar = ({ onDebounce }: Props) => {
  const [textValue, setTextValue] = useState<string>('');

  const { currentTheme: { name, secondaryColor } } = useContext(ThemeContext);

  const lightThemeEnabled = (name === 'light');

  const debouncedValue = useDebounced(textValue);

  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue]);

  return (
    <View
      style={{
        ...styles.inputContainer,
        backgroundColor: lightThemeEnabled ? '#E5E5E5' : '#323232'
      }}
    >
      <Icon
        name="search"
        color={secondaryColor}
        size={wp(6)}
      />
      <TextInput
        placeholder="Search..."
        placeholderTextColor={secondaryColor}
        onChangeText={setTextValue}
        value={textValue}
        style={{
          ...styles.input,
          color: secondaryColor
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: wp(90),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(3),
    marginTop: hp(2),
    marginBottom: hp(1),
    height: hp(8)
  },
  input: {
    width: wp(76),
    fontSize: fontPresets.sizes.tertiarySize,
    fontFamily: fontPresets.weights.semiBold,
    marginLeft: wp(2)
  }
});

export default React.memo(SearchBar);
