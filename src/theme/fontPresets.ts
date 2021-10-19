import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const fontPresets = {
  sizes: {
    primarySize: wp(7),
    secondarySize: wp(5),
    tertiarySize: wp(4)
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