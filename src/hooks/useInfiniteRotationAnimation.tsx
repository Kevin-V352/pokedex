import { useRef } from 'react';
import { Animated, Easing } from 'react-native';

const useInfiniteRotationAnimation = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  Animated.loop(
    Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true
      }
    )
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return { spin };
};

export default useInfiniteRotationAnimation;
