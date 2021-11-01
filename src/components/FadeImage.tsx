import React from 'react';
import { Animated, ImageStyle, StyleProp, ViewStyle } from 'react-native';

import FastImage from 'react-native-fast-image';

import useFadeAnimation from '../hooks/useFadeAnimation';

interface Props {
  uri: string;
  customImageStyles: StyleProp<ImageStyle>;
  customContainerStyles?: StyleProp<ViewStyle>;
};

const FadeImage = ({ uri, customImageStyles, customContainerStyles }: Props) => {
  const { opacity, fadeIn } = useFadeAnimation();

  return (
    <Animated.View style={{
      ...customContainerStyles as any,
      opacity
    }}
    >
      <FastImage
        source={{
          uri,
          priority: FastImage.priority.high
        }}
        style={customImageStyles as any}
        onLoad={fadeIn}
      />
    </Animated.View>
  );
};

export default FadeImage;
