import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const fontPresets = {
  sizes: {
    primarySize: hp(4),
    secondarySize: hp(3),
    tertiarySize: hp(2)
  },
  weights: {
    bold: 'Quicksand-Bold',
    light: 'Quicksand-Light',
    medium: 'Quicksand-Medium',
    regular: 'Quicksand-Regular',
    semiBold: 'Quicksand-SemiBold'
  }
};

export default fontPresets;