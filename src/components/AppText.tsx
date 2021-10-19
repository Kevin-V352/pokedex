import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

import fontPresets from '../theme/fontPresets';

interface Props {
  text: string | number;
  customStyles?: StyleProp<TextStyle>
};

const AppText = ({ text, customStyles }: Props) => (
  <Text 
    style={{
      fontFamily: fontPresets.weights.semiBold,
      fontSize: fontPresets.sizes.secondarySize,
      ...customStyles as any,
    }}
  >
    {text}
  </Text> 
);

export default AppText;
