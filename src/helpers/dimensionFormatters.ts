import { StyleProp, ViewStyle } from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const calculateWidth = (text: string, backgroundColor: string): StyleProp<ViewStyle> => {
  const growthScale: number = (2.7 * text.length);

  const width = wp(growthScale);
  const marginLeft = wp(((100 / 3) - (growthScale)) / 2);

  return {
    width,
    marginLeft,
    backgroundColor
  };
};

export default calculateWidth;
