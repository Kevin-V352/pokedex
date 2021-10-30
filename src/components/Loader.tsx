import React, { useContext } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import useInfiniteRotationAnimation from '../hooks/useInfiniteRotationAnimation';
import CustomIcon from './CustomIcon';

const Loader = () => {
  const { currentTheme: { secondaryColor } } = useContext(ThemeContext);

  const { spin } = useInfiniteRotationAnimation();

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ rotate: spin }],
          width: hp(10),
          opacity: 0.2
        }}
      >
        <CustomIcon name="pokeball" size={hp(10)} color={secondaryColor} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Loader;
