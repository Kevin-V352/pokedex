import { StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const globalStyles = StyleSheet.create({
  screenContainer: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(3)
  }
});

export default globalStyles;
