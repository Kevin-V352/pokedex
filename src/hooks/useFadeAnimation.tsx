import { useRef } from 'react';
import { Animated } from 'react-native';

const useFadeAnimation = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: true,
      duration: 300
    }).start();
  };

  return {
    opacity,
    fadeIn
  };
};

export default useFadeAnimation;
