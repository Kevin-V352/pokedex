import React, { useContext } from 'react';
import { View, Image, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import fontPresets from '../theme/fontPresets';
import AppText from './AppText';

interface Props {
  text: string;
  customContainerStyles?: StyleProp<ViewStyle>
};

const WarningMessage = ({ text, customContainerStyles }: Props) => {
  const { currentTheme: { secondaryColor } } = useContext(ThemeContext);

  return (
    <View style={{
      ...styles.undefinedContainer,
      ...customContainerStyles as any
    }}
    >
      <Image
      // eslint-disable-next-line global-require
        source={require('../../assets/images/undefined-icon.png')}
        style={styles.undefinedImage}
      />
      <AppText
        text={text}
        customStyles={{
          ...styles.undefinedText,
          color: secondaryColor
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  undefinedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  undefinedImage: {
    height: hp(20),
    width: hp(20)
  },
  undefinedText: { fontSize: fontPresets.sizes.tertiarySize }
});

export default WarningMessage;
